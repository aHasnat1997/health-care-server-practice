import jwt, { JwtPayload } from "jsonwebtoken";

/**
 * Sign a unique token to user
 * @param payload JwtPayload
 * @param secret secret string
 * @param expiresIn expires time
 * @returns token
 */
const sign = (payload: JwtPayload, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, secret, { expiresIn })
  return token
};

/**
 * Verify user token
 * @param payload token string
 * @param secret token sign secret
 * @returns Boolean
 */
const verify = (payload: string, secret: string) => {
  const verify = jwt.verify(payload, secret)
  return verify;
}

/**
 * Decode JwtPayload from token
 * @param payload token string
 * @returns JwtPayload
 */
const decode = (payload: string) => {
  const decode = jwt.decode(payload);
  return decode;
}

export const Token = { sign, verify, decode };