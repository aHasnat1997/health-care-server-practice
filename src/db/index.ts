import { Prisma, PrismaClient } from "@prisma/client";

type TTableName = 'user' | 'admin';

// function getTable(tableName: TTableName) {
//   const prisma = new PrismaClient();
//   switch (tableName) {
//     case 'user':
//       return prisma.user;
//     case 'admin':
//       return prisma.admin
//     default:
//       throw new Error(`Invalid table name: ${tableName}`);
//   }
// };

/**
 * This class can perform all the DB Operations using prisma.
 * @constructor table name
 */
export class DBOperations {
  private prisma: PrismaClient;
  public tableName: TTableName;

  constructor(tableName: TTableName) {
    this.prisma = new PrismaClient();
    this.tableName = tableName;
  }

  async findAll(
    filters: Record<string, unknown>,
    searchTermKeyArray: string[],
    options: {
      page?: number,
      limit?: number,
      sortBy?: string,
      sortOrder?: 'desc' | 'asc' | string
    }) {
    const conditions = [];
    const { searchTerm, ...restFilters } = filters;
    const pageLimit = Number(options.limit) || 10;
    const pageNumber = Number(options.page) ? (Number(options.page) - 1) * pageLimit : 0;

    if (searchTerm) {
      conditions.push({
        OR: searchTermKeyArray.map(key => ({
          [key]: {
            contains: searchTerm,
            mode: 'insensitive'
          }
        }))
      });
    }
    if (Object.keys(restFilters).length > 0) {
      conditions.push({
        AND: Object.keys(filters).map(key => ({
          [key]: {
            contains: filters[key],
            mode: 'insensitive'
          }
        }))
      });
    }

    const result = await this.prisma[this.tableName].findMany({
      take: pageLimit,
      skip: pageNumber,
      orderBy: options.sortBy && options.sortOrder ? {
        [options.sortBy]: options.sortOrder
      } : {
        createdAt: 'desc'
      },
      where: { AND: conditions }
    });
    const totalData = await this.prisma[this.tableName].count({ where: { AND: conditions } })

    return {
      meta: {
        page: options.page ? pageNumber : 1,
        limit: pageLimit,
        total: totalData
      },
      data: result
    };
  }

  async findOne({ payload: { where = {}, ...rest } = {} }) {
    const result = await this.prisma[this.tableName].findUniqueOrThrow({ where, ...rest || {} });
    return {
      data: result
    };
  }
};