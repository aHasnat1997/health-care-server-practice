import { Router } from "express";
import { AdminController } from "./admin.controller";

const AdminRoute = Router();

AdminRoute.get('/all', AdminController.allAdmin);

AdminRoute.get('/:id', AdminController.singleAdminByID);

export default AdminRoute;