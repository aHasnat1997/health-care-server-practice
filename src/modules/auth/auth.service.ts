import { UserStatus } from "@prisma/client";
import { DBOperations } from "../../db";
import bcrypt from 'bcrypt';

const DB = new DBOperations('user');

const login = async (payload: {
  email: string,
  password: string
}) => {
  const isUserExist = await DB.findOne({
    payload: {
      where: {
        email: payload.email,
        status: UserStatus.ACTIVE
      }
    }
  });
  console.log(isUserExist);

  const passwordMatch = await bcrypt.compare(payload.password, isUserExist.data.password);
  if (!passwordMatch) throw new Error('incorrect password...');

  return {
    token: 'your token...'
  }
}

export const AuthService = {
  login
};