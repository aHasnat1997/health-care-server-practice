import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import { AuthService } from "./auth.service";
import successResponse from "../../utils/successResponse";

const login = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.cookie('refresh-token', result.refreshToken, {
    httpOnly: true,
    secure: true
  });
  successResponse(res, {
    massage: 'Login done...',
    data: result.accessToken
  });
});

export const AuthController = {
  login
};