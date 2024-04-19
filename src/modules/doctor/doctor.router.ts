import { Router } from 'express';
import { DoctorController } from './doctor.controller';

const DoctorRoute = Router();

DoctorRoute.get(
  '/all',
  DoctorController.findAll
);

DoctorRoute.get(
  '/:id',
  DoctorController.findById
);

export default DoctorRoute;