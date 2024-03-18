import { Request, Response } from "express";
import { HTTPStatusCode } from "../../utils/httpCode";
import { AdminService } from "./admin.service";

const allAdmin = async (req: Request, res: Response) => {
  try {
    const filters = {};
    const options = {};

    const result = await AdminService.getAllAdmin(filters, options);

    res.status(HTTPStatusCode.Ok).json({
      success: true,
      massage: 'Found...👍',
      data: result
    });
  } catch (error) {
    res.status(HTTPStatusCode.BadRequest).json({
      success: false,
      massage: 'Error...💩',
      error: error
    })
  }
};

export const AdminController = {
  allAdmin
};