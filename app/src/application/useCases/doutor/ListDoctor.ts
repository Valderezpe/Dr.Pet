import DatabaseService from "@/infra/DatabaseService";

export default class ListDoctor {
  constructor(readonly database: DatabaseService) {}
  async execute() {
    const doctors = await this.database.listDoctor();

    if (!doctors) {
      throw new Error("No Doctors found");
    }
    return doctors;
  }
}
