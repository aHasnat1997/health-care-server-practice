import { Router } from 'express';
import { authGuard } from '../../middlewares/authGuard';
import { PatientController } from './patient.controller';

const PatientRoute = Router();

PatientRoute.get(
  '/all',
  authGuard('ADMIN', 'SUPER_ADMIN'),
  PatientController.findAll
);

PatientRoute.get(
  '/:id',
  authGuard('ADMIN', 'SUPER_ADMIN'),
  PatientController.findById
);

export default PatientRoute;