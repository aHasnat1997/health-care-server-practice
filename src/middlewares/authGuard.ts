import { UserRole } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { TTokenPayload, Token } from "../utils/token";
import config from "../config";

/**
 * Guard api route using user role
 * @param accessTo user role array
 * @returns void
 */
export const authGuard = (...accessTo: UserRole[]) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const reqUserRole = req.headers.authorization;
    if (!reqUserRole) throw new Error('No token found...');
    const userTokenRole = Token.verify(reqUserRole, config.TOKEN.ACCESS_TOKEN_SECRET) as TTokenPayload;
    const isRoleMatched = accessTo.find(r => r === userTokenRole.role);
    if (!isRoleMatched) throw new Error('Unauthorized...');
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};