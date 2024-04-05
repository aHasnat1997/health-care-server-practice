import { Router } from "express";
import { UserController } from "./user.controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";
import { uploadImage } from "../../utils/imageUpload";

/**
 * User all endpoints routes
 */
const UserRoutes = Router();

// post route for cerate user
UserRoutes.post(
  '/create-admin',
  authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  uploadImage.upload.single('image'),
  UserController.creatingUserAsAdmin
);

// post route for cerate doctor
UserRoutes.post(
  '/create-doctor',
  authGuard(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  uploadImage.upload.single('image'),
  UserController.creatingUserAsDoctor
);

export default UserRoutes;