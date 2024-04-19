import prisma from "../../db/prisma"

const allDoctor = async () => {
  const result = await prisma.doctor.findMany({
    include: {
      doctorSpecialties: true,
      reviews: true,
    }
  });
  const total = await prisma.doctor.count();
  return {
    meta: { total },
    result
  };
};

const doctorById = async (id: string) => {
  const result = await prisma.doctor.findUniqueOrThrow({
    where: { id },
    include: {
      doctorSpecialties: true,
      reviews: true
    }
  });
  return result;
};

export const DoctorService = {
  allDoctor,
  doctorById
}