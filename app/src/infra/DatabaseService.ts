import { PrismaClient } from "@prisma/client";

export default class DatabaseService {
  constructor(readonly connection: PrismaClient) {}
  listDoctor() {
    return this.connection.doctor.findMany();
  }

  getDoctorId(id: number, includeSchedule: boolean) {
    return this.connection.doctor.findUnique({
      where: { id },
      include: {
        schedule: includeSchedule,
      },
    });
  }

  getPatientPhone(phone: string, includeAppointment: boolean) {
    return this.connection.patient.findUnique({
      where: { phone },
      include: {
        appointment: includeAppointment,
      },
    });
  }
}

export const database = new DatabaseService(new PrismaClient());
