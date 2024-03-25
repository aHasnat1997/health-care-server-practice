import { Router } from "express";
import { UserController } from "./user.controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

/**
 * User all endpoints routes
 */
const UserRoutes = Router();

// post route for cerate user
UserRoutes.post('/create-admin', authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN), UserController.creatingUserAsAdmin);

export default UserRoutes;