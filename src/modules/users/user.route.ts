import { Router } from "express";
import { UserController } from "./user.controller";

/**
 * User all endpoints routes
 */
const UserRoutes = Router();

// post route for cerate user
UserRoutes.post('/create-admin', UserController.creatingUserAsAdmin);

export default UserRoutes;