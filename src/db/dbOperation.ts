import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


const findAll = async <T extends keyof PrismaClient>(
  table: T,
  filters: Record<string, unknown>,
  searchTermKeyArray: string[],
  options: {
    page?: number,
    limit?: number,
    sortBy?: string,
    sortOrder?: 'desc' | 'asc' | string
  }) => {

  const conditions: Prisma.AdminWhereInput[] = [];
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

  // console.dir(conditions, { depth: 'infinity' });

  const result = await prisma[table].findMany({
    take: pageLimit,
    skip: pageNumber,
    orderBy: options.sortBy && options.sortOrder ? {
      [options.sortBy]: options.sortOrder
    } : {
      createdAt: 'desc'
    },
    where: { AND: conditions }
  });
  const totalData = await prisma[table].count({ where: { AND: conditions } })

  return {
    meta: {
      page: options.page ? pageNumber : 1,
      limit: pageLimit,
      total: totalData
    },
    data: result
  };
};

export const DB = {
  findAll
}