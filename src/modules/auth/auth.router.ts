import { Router } from "express";
import { AuthController } from "./auth.controller";

const AuthRoutes = Router();

AuthRoutes.post('/login', AuthController.login);

export default AuthRoutes;