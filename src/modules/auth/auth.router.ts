import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRoutes = Router();

AuthRoutes.get('/token-renew', AuthController.assessTokenRenew);

AuthRoutes.post('/login', AuthController.login);

AuthRoutes.post('/password-reset', AuthController.passwordReset);

AuthRoutes.post('/forget-password', AuthController.forgetPassword);

AuthRoutes.post('/set-password', AuthController.newPasswordSet);

export default AuthRoutes;