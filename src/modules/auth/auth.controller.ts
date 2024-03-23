import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import { AuthService } from "./auth.service";
import successResponse from "../../utils/successResponse";

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

const passwordReset = handelAsyncReq(async (req: Request, res: Response) => {
  const token = req.headers.authorization || '';

  const result = await AuthService.resetPassword(token, req.body);

  successResponse(res, {
    message: 'Reset Complete...',
    data: result
  });
})

export const AuthController = {
  login,
  assessTokenRenew,
  passwordReset
};