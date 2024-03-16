import { Request, Response } from "express"
import { UserService } from "./user.service"
import { HTTPStatusCode } from "../../utils/httpCode";

/**
 * Create a single user as admin
 * @param req Request object
 * @param res Response object
 */
const creatingUserAsAdmin = async (req: Request, res: Response) => {
  const result = await UserService.creatingUserAsAdmin(req.body);
  res.status(HTTPStatusCode.Ok).json({
    status: 'success',
    data: result
  });
}

export const UserController = {
  creatingUserAsAdmin
}