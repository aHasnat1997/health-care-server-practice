import prisma from "../../utils/prisma";

const getAllAdmin = async () => {
  const search: Record<string, unknown> = {
    contactNumber: '01',
    name: 'J'
  }

  const searchKeyValue: [string, unknown][] = [];
  for (const key in search) {
    searchKeyValue.push([key, search[key]]);
  }

  console.log(searchKeyValue);

  const searchConditions = () => {
    // searchConditions
  }


  const result = await prisma.admin.findMany({
    take: 7,
    skip: 0,
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      contactNumber: {
        contains: '01',
        mode: 'insensitive'
      },
      name: {
        contains: 'B',
        mode: 'insensitive'
      }
    }
  });

  return result;
};


export const AdminService = {
  getAllAdmin
};