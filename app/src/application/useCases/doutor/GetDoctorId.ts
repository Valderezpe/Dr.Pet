import DatabaseService from "@/infra/DatabaseService";

export default class GetDoctorId {
  constructor(readonly database: DatabaseService) {}

  async execute(id: number) {
    const INCLUDE_SCHEDULE = true;
    const doctor = await this.database.getDoctorId(id, INCLUDE_SCHEDULE);

    if (!doctor) {
      throw new Error("No doctor found");
    }
    return doctor;
  }
}
