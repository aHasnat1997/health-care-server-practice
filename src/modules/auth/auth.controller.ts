import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import { AuthService } from "./auth.service";
import successResponse from "../../utils/successResponse";

// user login
const login = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);
  res.cookie('refresh_token', result.refreshToken, {
    httpOnly: true,
    secure: true
  });
  successResponse(res, {
    message: 'Login done...',
    data: {
      accessToken: result.accessToken
    }
  });
});

// token renew
const assessTokenRenew = handelAsyncReq(async (req: Request, res: Response) => {
  const token = req.cookies.refresh_token;
  const result = await AuthService.renewAssessToken(token);
  res.cookie('refresh_token', result.refreshToken, {
    httpOnly: true,
    secure: true
  });
  successResponse(res, {
    message: 'Login done...',
    data: {
      accessToken: result.accessToken
    }
  });
});

// reset password
const passwordReset = handelAsyncReq(async (req: Request, res: Response) => {
  const token = req.headers.authorization || '';

  const result = await AuthService.resetPassword(token, req.body);

  successResponse(res, {
    message: 'Reset Complete...',
    data: result
  });
});

// forget password
const forgetPassword = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await AuthService.forgetPassword(req.body);

  successResponse(res, {
    message: 'forget password processing...',
    data: result
  });
});

export const AuthController = {
  login,
  assessTokenRenew,
  passwordReset,
  forgetPassword
};