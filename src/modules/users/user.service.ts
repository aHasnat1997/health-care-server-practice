import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import config from "../../config";
import { Request } from "express";
import { TImageUpload, uploadImage } from "../../utils/imageUpload";
import fs from 'fs';

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
const creatingUserAsAdmin = async (payload: Request) => {
  const { body, file } = payload;
  const userPayloadData = JSON.parse(body.data);

  const isUserExisted = await prisma.admin.findFirst({
    where: {
      email: userPayloadData.email
    }
  })
  if (file && isUserExisted) {
    fs.unlinkSync(file.path);
    throw new Error('user already existed...')
  }
  if (file && !isUserExisted) {
    const uploadedRes = await uploadImage.uploadToCloudinary(file?.path) as TImageUpload;
    userPayloadData.profilePhoto = uploadedRes?.secure_url;
  };
  console.log(userPayloadData);

  const userData = {
    email: userPayloadData.email,
    password: await bcrypt.hash(userPayloadData.password, Number(config.BCRYPT_SALT_ROUNDS)),
    role: UserRole.ADMIN
  };
  const adminData = {
    name: userPayloadData.name,
    email: userPayloadData.email,
    profilePhoto: userPayloadData.profilePhoto,
    contactNumber: userPayloadData.contactNumber
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
    profilePhoto: admin.profilePhoto
  };
}

/**
 * User service
 */
export const UserService = {
  creatingUserAsAdmin
};