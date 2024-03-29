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
    const result = await UserService.creatingUserAsAdmin(req.body);

    res.status(HTTPStatusCode.Ok).json({
      success: true,
      massage: 'Created...👍',
      data: result
    });
  } catch (error) {
    res.status(HTTPStatusCode.BadRequest).json({
      success: false,
      massage: 'Error...💩',
      error: error
    })
  }
}

export const UserController = {
  creatingUserAsAdmin
}