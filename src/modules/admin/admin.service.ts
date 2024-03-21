import { DBOperations } from "../../db";
import prisma from "../../db/prisma";

const AdminDB = new DBOperations('admin');

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
  const searchTermKeyArray = ['name', 'email', 'contactNumber'];
  const result = await AdminDB.findAll(filters, searchTermKeyArray, options);
  return result;
};


const getSingleAdminByID = async (id: string) => {
  const result = await AdminDB.getSingle('id', id);
  return result;
}


export const AdminService = {
  getAllAdmin,
  getSingleAdminByID
};