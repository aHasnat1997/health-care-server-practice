import { Router } from "express";
import { AdminController } from "./admin.controller";

const AdminRoute = Router();

AdminRoute.get('/all', AdminController.allAdmin);

export default AdminRoute;