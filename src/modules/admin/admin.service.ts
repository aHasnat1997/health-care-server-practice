import { Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";

/**
 * type for options data
 */
type TOption = {
  page?: number,
  limit?: number,
  sortBy?: string,
  sortOrder?: 'desc' | 'asc' | string
}
/**
 * Finding all admin data from DB
 * @param filters object contents with any fields for filtering and searchTerm for 'name' or 'email' or 'contactNumber' fields  
 * @param options object contents page, limit, sortBy and sortOrder values
 * @returns all admin data
 */
const getAllAdmin = async (filters: Record<string, unknown>, options: TOption) => {
  const conditions: Prisma.AdminWhereInput[] = [];
  const { searchTerm, ...restFilters } = filters;
  const pageLimit = options.limit || 10;
  const pageNumber = options.page ? (options.page - 1) * pageLimit : 0;

  if (searchTerm) {
    conditions.push({
      OR: ['name', 'email', 'contactNumber'].map(key => ({
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

  const result = await prisma.admin.findMany({
    take: pageLimit,
    skip: pageNumber,
    orderBy: options.sortBy && options.sortOrder ? {
      [options.sortBy]: options.sortOrder
    } : {
      createdAt: 'desc'
    },
    where: { AND: conditions }
  });

  return result;
};


export const AdminService = {
  getAllAdmin
};