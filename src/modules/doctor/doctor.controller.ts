import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import { DoctorService } from "./doctor.service";
import successResponse from "../../utils/successResponse";

const findAll = handelAsyncReq(async (req: Request, res: Response) => {
  const { meta, result } = await DoctorService.allDoctor();
  successResponse(res, {
    message: 'Doctors data retrieved...',
    mete: meta,
    data: result
  })
});

const findById = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await DoctorService.doctorById(req.params.id);
  successResponse(res, {
    message: 'Doctor data retrieved...',
    data: result
  })
});

export const DoctorController = {
  findAll,
  findById
};