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


  return {
    name: doctor.name,
    email: user.email,
    contactNumber: doctor.contactNumber,
    role: user.role,
    profilePhoto: doctor.profilePhoto
  };
}

/**
 * create user and patient into DB
 * @param payload user and patient data 
 * @returns created data
 */
const creatingUserAsPatient = async (payload: Request) => {
  const { body, file } = payload;
  const userPayloadData = JSON.parse(body.data);

  const isUserExisted = await prisma.patient.findFirst({
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

  const userData = {
    email: userPayloadData.email,
    password: await bcrypt.hash(userPayloadData.password, Number(config.BCRYPT_SALT_ROUNDS)),
    role: UserRole.PATIENT
  };
  const patientData = {
    name: userPayloadData.name,
    email: userPayloadData.email,
    profilePhoto: userPayloadData.profilePhoto,
    contactNumber: userPayloadData.contactNumber,
    address: userPayloadData.address
  };
  const patientHealthData = {
    patientId: '',
    dateOfBirth: userPayloadData.dateOfBirth,
    gender: userPayloadData.gender,
    bloodGroup: userPayloadData.bloodGroup,
    height: userPayloadData.height,
    weight: userPayloadData.weight,
    maritalStatus: userPayloadData.maritalStatus
  };

  const { healthData, patient } = await prisma.$transaction(async (tx) => {
    await tx.user.create({ data: userData });
    const patient = await tx.patient.create({ data: patientData });
    patientHealthData.patientId = patient?.id;
    const healthData = await tx.patientHealthData.create({ data: patientHealthData });
    return { patient, healthData }
  });

  return {
    name: patient.name,
    email: patient.email,
    profilePhoto: patient.profilePhoto,
    contactNumber: patient.contactNumber,
    address: patient.address,
    dateOfBirth: healthData.dateOfBirth,
    gender: healthData.gender,
    bloodGroup: healthData.bloodGroup,
    maritalStatus: healthData.maritalStatus,
    height: healthData.height,
    weight: healthData.weight
  }
}

/**
 * User service
 */
export const UserService = {
  creatingUserAsAdmin,
  creatingUserAsDoctor,
  creatingUserAsPatient
};