import { Request, Response } from "express";
import { HTTPStatusCode } from "../../utils/httpCode";
import { AdminService } from "./admin.service";
import { pick } from "../../utils/pickObjFromArray";

const allAdmin = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber']);
    const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);

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