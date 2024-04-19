import prisma from "../../db/prisma"

const allPatient = async () => {
  const result = await prisma.patient.findMany({
    include: {
      patientHealthData: true,
      medicalReport: true
    }
  });
  const total = await prisma.patient.count();
  return {
    meta: { total },
    result
  };
};

const patientById = async (id: string) => {
  const result = await prisma.patient.findUniqueOrThrow({
    where: { id },
    include: {
      patientHealthData: true,
      medicalReport: true
    }
  });
  return result;
};

export const PatientService = {
  allPatient,
  patientById
};