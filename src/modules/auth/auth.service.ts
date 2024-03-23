import { UserStatus } from "@prisma/client";
import { DBOperations } from "../../db";
import bcrypt from 'bcrypt';
import { Token } from "../../utils/token";
import config from "../../config";

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

  const tokenPayload = {
    email: isUserExist.data.email,
    role: isUserExist.data.role
  };
  const accessToken = Token.sign(tokenPayload, config.TOKEN.ACCESS_TOKEN_SECRET, config.TOKEN.ACCESS_TOKEN_EXPIRES_TIME);
  const refreshToken = Token.sign(tokenPayload, config.TOKEN.REFRESH_TOKEN_SECRET, config.TOKEN.REFRESH_TOKEN_EXPIRES_TIME);

  return { accessToken, refreshToken }
}

export const AuthService = {
  login
};