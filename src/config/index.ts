import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS
}
