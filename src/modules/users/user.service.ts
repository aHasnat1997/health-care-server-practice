import { UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';
import config from "../../config";
import { Request } from "express";
import { TImageUpload, uploadImage } from "../../utils/imageUpload";
import fs from 'fs';
import prisma from "../../db/prisma";


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
 * create user and doctor into DB
 * @param payload user and doctor data 
 * @returns created data
 */
const creatingUserAsDoctor = async (payload: Request) => {
  const { body, file } = payload;
  const userPayloadData = JSON.parse(body.data);

  const isUserExisted = await prisma.doctor.findFirst({
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
    role: UserRole.DOCTOR
  };
  const doctorData = {
    name: userPayloadData.name,
    email: userPayloadData.email,
    profilePhoto: userPayloadData.profilePhoto,
    contactNumber: userPayloadData.contactNumber,
    address: userPayloadData.address,
    registrationNumber: userPayloadData.registrationNumber,
    experience: userPayloadData.experience,
    gender: userPayloadData.gender,
    appointmentFee: userPayloadData.appointmentFee,
    qualification: userPayloadData.qualification,
    currentWorkingPlace: userPayloadData.currentWorkingPlace,
    designation: userPayloadData.designation,
  };

  const [user, doctor] = await prisma.$transaction([
    prisma.user.create({ data: userData }),
    prisma.doctor.create({ data: doctorData })
  ]);

  console.log({ user, doctor });

  return {
    name: doctor.name,
    email: user.email,
    contactNumber: doctor.contactNumber,
    role: user.role,
    profilePhoto: doctor.profilePhoto
  };
}

/**
 * User service
 */
export const UserService = {
  creatingUserAsAdmin,
  creatingUserAsDoctor
};