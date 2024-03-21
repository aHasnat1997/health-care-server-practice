import { Router } from "express";
import UserRoutes from "../modules/users/user.route";
import AdminRoute from "../modules/admin/admin.router";

/**
 * creating router using express router
 */
export const AllRoutes = Router();

/**
 * type of all module routes
 */
type TModulesRouters = {
  path: string,
  router: Router
}

/**
 * all module routes array 
 */
const moduleRoutes: TModulesRouters[] = [
  {
    path: '/user',
    router: UserRoutes
  },
  {
    path: '/admin',
    router: AdminRoute
  }
];


moduleRoutes.forEach(r => AllRoutes.use(r.path, r.router));