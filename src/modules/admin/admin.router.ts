import { Router } from "express";
import { AdminController } from "./admin.controller";
import { authGuard } from "../../middlewares/authGuard";
import { UserRole } from "@prisma/client";

const AdminRoute = Router();

AdminRoute.get('/all', authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.allAdmin);

AdminRoute.get('/:id', authGuard(UserRole.SUPER_ADMIN, UserRole.ADMIN), AdminController.singleAdminByID);

export default AdminRoute;