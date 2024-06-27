import PatientController from "@/application/controller/PatientController";
import CreateAppointmentUseCase from "@/application/useCases/patient/CreateAppointment";
import CreatePatientUseCase from "@/application/useCases/patient/CreatePatient";
import { database } from "@/infra/DatabaseService";
import { Request, Response } from "express";

export default class PatientControllerImpl implements PatientController {
  async createPatient(req: Request, res: Response) {
    const { name, phone, password } = req.body;
    const useCase = new CreatePatientUseCase(database);
    const patient = await useCase.execute(name, phone, password);

    res.status(201).json(patient);
  }

  async createAppointment(req: Request, res: Response) {
    const { scheduleId } = req.body;
    const { patientId } = req.params;
    const useCase = new CreateAppointmentUseCase(database);
    const appointment = await useCase.execute(
      Number(patientId),
      Number(scheduleId)
    );

    res.status(201).json(appointment);
  }
}
