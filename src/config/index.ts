import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS as string,
  TOKEN: {
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as string,
    ACCESS_TOKEN_EXPIRES_TIME: process.env.ACCESS_TOKEN_EXPIRES_TIME as string,
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET as string,
    REFRESH_TOKEN_EXPIRES_TIME: process.env.REFRESH_TOKEN_EXPIRES_TIME as string,
    FORGOT_TOKEN_SECRET: process.env.FORGOT_TOKEN_SECRET as string,
    FORGOT_TOKEN_EXPIRES_TIME: process.env.FORGOT_TOKEN_EXPIRES_TIME as string
  },
  SMTP: {
    HOST: process.env.SMTP_HOST as string,
    PORT: process.env.SMTP_PORT,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
  }
}
