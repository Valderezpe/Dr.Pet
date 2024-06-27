import DatabaseService from "@/infra/DatabaseService";

export default class CreateAppointmentUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(patientId: number, scheduleId: number) {
    const patient = await this.database.getPatientId(patientId);
    if (!patient) {
      throw new Error("Paciente não encontrado!");
    }

    const schedule = await this.database.getSheduleId(scheduleId);

    if (!schedule?.available) {
      throw new Error("Agenda not available for this date");
    }

    await this.database.updateSchedule(schedule.id, { available: false });

    const appointment = await this.database.createAppointment(
      patient.id,
      schedule.doctorId,
      schedule.date
    );

    return appointment;
  }
}
