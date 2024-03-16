import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import config from "../../config";

const prisma = new PrismaClient();

/**
 * type for admin user payload
 */
type TUserAsAdmin = {
  name: string,
  email: string,
  password: string,
  contactNumber: string
}

/**
 * create user and admin into DB
 * @param payload user and admin data 
 * @returns Promise
 * 
 * @example payload = {
 *   name: string,
 *   email: string,
 *   password: string,
 *   contactNumber: string
 * }
 */
const creatingUserAsAdmin = async (payload: TUserAsAdmin) => {
  const userData = {
    email: payload.email,
    password: await bcrypt.hash(payload.password, Number(config.BCRYPT_SALT_ROUNDS)),
    role: UserRole.ADMIN
  };
  const adminData = {
    name: payload.name,
    email: payload.email,
    contactNumber: payload.contactNumber
  };

  const [user, admin] = await prisma.$transaction([
    prisma.user.create({ data: userData }),
    prisma.admin.create({ data: adminData })
  ])

  console.log({ user, admin });

  return {
    name: admin.name,
    email: user.email,
    contactNumber: admin.contactNumber,
    role: user.role,
  };
}

/**
 * User service
 */
export const UserService = {
  creatingUserAsAdmin
};