import { UserRole, UserStatus } from "@prisma/client";
import { DBOperations } from "../../db";
import bcrypt from 'bcrypt';
import { Token } from "../../utils/token";
import config from "../../config";
import { sandMail } from "../../utils/sendMail";
import prisma from "../../db/prisma";

const DB = new DBOperations('user');

/**
 * user login route.
 * @param payload email and password
 * @returns accessToken and refreshToken
 */
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
  if (!isUserExist) throw new Error('No user found...');

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

/**
 * Renew user token.
 * @param token user refresh token
 * @returns accessToken and refreshToken
 */
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

/**
 * Reset user password.
 * @param token user assess token
 * @param payload old password and new password
 */
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

  await DB.updateOne({
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

/**
 * User forget password
 */
const forgetPassword = async (email: string) => {
  const isUserExist = await DB.findOne({
    payload: {
      where: {
        email,
        status: UserStatus.ACTIVE
      }
    }
  });
  if (!isUserExist) throw new Error('Unauthorize...');

  const tokenPayload = {
    email: isUserExist.data.email,
    role: isUserExist.data.role
  };
  const token = Token.sign(tokenPayload, config.TOKEN.FORGOT_TOKEN_SECRET, config.TOKEN.FORGOT_TOKEN_EXPIRES_TIME);
  const resetLink = `http://localhost:3000?id=${isUserExist.data.id}&token=${token}`;

  await sandMail({
    to: isUserExist.data.email,
    subject: 'Reset Password',
    html: `
    <body>
      <div style="width: 100%; display: flex;justify-content: center;">
        <div style="padding: .5rem 2rem;width: 80%;border: 1px solid gray">
          <h1>Reset Password</h1>
          <p>
          Hello Dear,
          Here is a mail for reset your password. Just click this button for next step.
          </p>
          <a href='${resetLink}'><button>Click Here...</button></a>
        </div>
      </div>
    </body>
    `
  });
  return null;
};

const setNewPassword = async (token: string, payload: { password: string }) => {
  const isTokenOk: any = Token.verify(token, config.TOKEN.FORGOT_TOKEN_SECRET);
  if (!isTokenOk) throw new Error('Unauthorize...');
  const isTokenBlacklisted: any = Token.isTokenBlacklisted(token);
  if (!isTokenBlacklisted) throw new Error('Unauthorize...');
  Token.blacklist(token);

  const user = await DB.findOne({
    payload: {
      where: {
        email: isTokenOk.email as string,
        status: UserStatus.ACTIVE,
      }
    }
  });
  if (!user) throw new Error('Unauthorize...');

  const newHashPassword = await bcrypt.hash(payload.password, Number(config.BCRYPT_SALT_ROUNDS));

  await DB.updateOne({
    payload: {
      where: {
        email: user.data.email
      },
      data: {
        password: newHashPassword
      }
    }
  });

  return null;
}

const myInfo = async (role: UserRole, email: string) => {
  let result;

  switch (role) {
    case UserRole.ADMIN || UserRole.SUPER_ADMIN:
      result = await prisma.admin.findUniqueOrThrow({
        where: { email },
      });
      break;

    case UserRole.DOCTOR:
      result = await prisma.doctor.findUniqueOrThrow({
        where: { email },
        include: {
          appointments: true,
          doctorSchedules: true,
          doctorSpecialties: true,
          reviews: true
        }
      });
      break;

    case UserRole.PATIENT:
      result = await prisma.patient.findUniqueOrThrow({
        where: { email },
        include: {
          patientHealthData: true,
          medicalReport: true,
          appointments: true,
          prescriptions: true
        }
      })
      break;

    default:
      break;
  }

  return result;
}

export const AuthService = {
  login,
  renewAssessToken,
  resetPassword,
  forgetPassword,
  setNewPassword,
  myInfo
};
