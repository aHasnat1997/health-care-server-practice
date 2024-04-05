import { Request, Response } from "express"
import { UserService } from "./user.service"
import { HTTPStatusCode } from "../../utils/httpCode";
import handelAsyncReq from "../../utils/handelAsyncReq";
import successResponse from "../../utils/successResponse";

/**
 * Create a single user as admin
 */
const creatingUserAsAdmin = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await UserService.creatingUserAsAdmin(req);
  successResponse(res, {
    message: 'Created...👍',
    data: result
  }, HTTPStatusCode.Created);
})

/**
 * Create a single user as doctor
 */
const creatingUserAsDoctor = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await UserService.creatingUserAsDoctor(req);
  successResponse(res, {
    message: 'Created...👍',
    data: result
  }, HTTPStatusCode.Created);
})

export const UserController = {
  creatingUserAsAdmin,
  creatingUserAsDoctor
}