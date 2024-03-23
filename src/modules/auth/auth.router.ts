import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRoutes = Router();

AuthRoutes.post('/login', AuthController.login);

AuthRoutes.get('/token-renew', AuthController.assessTokenRenew)

AuthRoutes.post('/password-reset', AuthController.passwordReset);

export default AuthRoutes;