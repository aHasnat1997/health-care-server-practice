import { Router } from "express";
import { AuthController } from "./auth.controller";
import { authGuard } from "../../middlewares/authGuard";

const AuthRoutes = Router();

AuthRoutes.get('/token-renew', AuthController.assessTokenRenew);

AuthRoutes.post('/login', AuthController.login);

AuthRoutes.post('/password-reset', AuthController.passwordReset);

AuthRoutes.post('/forget-password', AuthController.forgetPassword);

AuthRoutes.post('/set-password', AuthController.newPasswordSet);

AuthRoutes.get(
  '/me',
  authGuard('ADMIN', 'SUPER_ADMIN', 'DOCTOR', 'PATIENT'),
  AuthController.myData
);

export default AuthRoutes;