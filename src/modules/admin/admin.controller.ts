import { Request, Response } from "express";
import { HTTPStatusCode } from "../../utils/httpCode";
import { AdminService } from "./admin.service";
import { pick } from "../../utils/pickObjFromArray";
import successResponse from "../../utils/successResponse";
import handelAsyncReq from "../../utils/handelAsyncReq";

/**
 * getting all admin data
 */
const allAdmin = handelAsyncReq(async (req: Request, res: Response) => {
  const filters = pick(req.query, ['name', 'email', 'searchTerm', 'contactNumber']);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await AdminService.getAllAdmin(filters, options);
  successResponse(res, {
    success: true,
    massage: 'Found...👍',
    mete: result.meta,
    data: result.data
  }, HTTPStatusCode.Ok);
});

const singleAdminByID = handelAsyncReq(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.getSingleAdminByID(id);
  successResponse(res, {
    massage: 'Found...👍',
    data: result
  }, HTTPStatusCode.Ok);
})

export const AdminController = {
  allAdmin,
  singleAdminByID
};