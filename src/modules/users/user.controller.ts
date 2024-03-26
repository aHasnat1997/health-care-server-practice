import { Request, Response } from "express"
import { UserService } from "./user.service"
import { HTTPStatusCode } from "../../utils/httpCode";

/**
 * Create a single user as admin
 * @param req Request object
 * @param res Response object
 */
const creatingUserAsAdmin = async (req: Request, res: Response) => {
  try {
    const result = await UserService.creatingUserAsAdmin(req);


    res.status(HTTPStatusCode.Ok).json({
      success: true,
      message: 'Created...👍',
      data: result
    });
  } catch (error) {
    res.status(HTTPStatusCode.BadRequest).json({
      success: false,
      message: 'Error...💩',
      error: error
    })
  }
}

export const UserController = {
  creatingUserAsAdmin
}