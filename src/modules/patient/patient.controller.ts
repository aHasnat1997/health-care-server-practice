import { Request, Response } from "express";
import handelAsyncReq from "../../utils/handelAsyncReq";
import successResponse from "../../utils/successResponse";
import { PatientService } from "./patient.service";

const findAll = handelAsyncReq(async (req: Request, res: Response) => {
  const { meta, result } = await PatientService.allPatient();
  successResponse(res, {
    message: 'Patients data retrieved...',
    mete: meta,
    data: result
  })
});

const findById = handelAsyncReq(async (req: Request, res: Response) => {
  const result = await PatientService.patientById(req.params.id);
  successResponse(res, {
    message: 'Patient data retrieved...',
    data: result
  })
});

export const PatientController = {
  findAll,
  findById
};