import { PrismaClient } from "@prisma/client";

export default class DatabaseService {
  getPatientPhone(phone: string, INCLUDE_APPOINTMENT: boolean) {
    throw new Error("Method not implemented.");
  }
  constructor(readonly connection: PrismaClient) {}
  listDoctor() {
    return this.connection.doctor.findMany({
      include: {
        schedule: true,
      },
    });
  }

  getDoctorId(id: number, includeSchedule: boolean = false) {
    return this.connection.doctor.findUnique({
      where: { id },
      include: {
        schedule: includeSchedule,
      },
    });
  }

  // getPatientPhone(phone: string, includeAppointment: boolean = false) {
  //   return this.connection.patient.findUnique({
  //     where: { phone },
  //     include: {
  //       appointment: includeAppointment,
  //     },
  //   });
  // }

  createUser(phone: string, passwords: string) {
    return this.connection.user.create({
      data: {
        phone,
        passwords,
      },
    });
  }

  createPatient(name: string, phone: string, userId: number) {
    return this.connection.patient.create({
      data: {
        name,
        phone,
        userId,
      },
    });
  }

  getPatientId(id: number) {
    return this.connection.patient.findUnique({
      where: { id },
    });
  }

  getSheduleId(id: number) {
    return this.connection.schedule.findUnique({
      where: { id },
    });
  }

  updateSchedule(id: number, data: { available: boolean }) {
    return this.connection.schedule.update({
      where: { id },
      data,
    });
  }

  createAppointment(patientId: number, doctorId: number, date: Date) {
    return this.connection.appointment.create({
      data: {
        patientId,
        doctorId,
        date,
      },
    });
  }
}

export const database = new DatabaseService(new PrismaClient());
