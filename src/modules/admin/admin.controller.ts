import { Request, Response } from "express";
import { HTTPStatusCode } from "../../utils/httpCode";
import { AdminService } from "./admin.service";

const allAdmin = async (req: Request, res: Response) => {
  try {
    console.log(req.query);

    const filters = {};
    const options = {};

    const result = await AdminService.getAllAdmin(filters, options);

    res.status(HTTPStatusCode.Ok).json({
      success: true,
      massage: 'Found...👍',
      meta: result.meta,
      data: result.data
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