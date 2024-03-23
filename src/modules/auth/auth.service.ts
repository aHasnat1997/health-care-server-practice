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
};

const renewAssessToken = async (token: string) => {
  const isTokenOk: any = Token.verify(token, config.TOKEN.REFRESH_TOKEN_SECRET);
  if (!isTokenOk) throw new Error('Unauthorize...');

  const user = await DB.findOne({
    payload: {
      where: {
        email: isTokenOk.email as string,
        status: UserStatus.ACTIVE,
      }
    }
  });
  if (!user) throw new Error('Unauthorize...');

  const tokenPayload = {
    email: user.data.email,
    role: user.data.role
  };

  const accessToken = Token.sign(tokenPayload, config.TOKEN.ACCESS_TOKEN_SECRET, config.TOKEN.ACCESS_TOKEN_EXPIRES_TIME);
  const refreshToken = Token.sign(tokenPayload, config.TOKEN.REFRESH_TOKEN_SECRET, config.TOKEN.REFRESH_TOKEN_EXPIRES_TIME);
  return { accessToken, refreshToken }
}

const resetPassword = async (token: string, payload: { oldPassword: string, newPassword: string }) => {
  const isTokenOk: any = Token.verify(token, config.TOKEN.ACCESS_TOKEN_SECRET);
  if (!isTokenOk) throw new Error('Unauthorize...');

  const user = await DB.findOne({
    payload: {
      where: {
        email: isTokenOk.email as string,
        status: UserStatus.ACTIVE,
      }
    }
  });
  if (!user) throw new Error('Unauthorize...');

  const isOldPasswordMatch = await bcrypt.compare(payload.oldPassword, user.data.password);
  if (!isOldPasswordMatch) throw new Error('Unauthorize...');

  const newHashPassword = await bcrypt.hash(payload.newPassword, Number(config.BCRYPT_SALT_ROUNDS));

  const newData = await DB.updateOne({
    payload: {
      where: {
        email: user.data.email,
        status: UserStatus.ACTIVE
      },
      data: {
        password: newHashPassword
      }
    }
  });

  return null;
};

export const AuthService = {
  login,
  renewAssessToken,
  resetPassword
};
