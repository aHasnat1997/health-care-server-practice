import { Request, Response } from "express"
import { UserService } from "./user.service"
import { HTTPStatusCode } from "../../utils/httpCode";

const creatingUser = async (req: Request, res: Response) => {
  const result = UserService.creatingUser(req.body);
  res.status(HTTPStatusCode.Ok).json({
    status: 'success',
    data: result
  })
}

export const UserController = {
  creatingUser
}