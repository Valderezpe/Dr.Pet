import DatabaseService from "@/infra/DatabaseService";
import { hashPassword } from "@/infra/helpers/SecurityHelper";

export default class CreatePatientUseCase {
  constructor(readonly database: DatabaseService) {}

  async execute(name: string, phone: string, password: string) {
    // verificar se paciente já existe com este numero telefone
    // const patient = await this.database.getPatientPhone(phone);

    // if (patient) {
    //   throw new Error("Patient already exists with this phone number");
    // }

    // gera um hash seguro para a senha  ser armazanada no banco dados
    const hashedPassword = hashPassword(password);

    // adiciona um novo usuário com  este telefone
    const user = await this.database.createUser(phone, hashedPassword);

    // adicionar o paciente com o nome, telefonee id de usuario criando
    const newPatient = await this.database.createPatient(phone, name, user.id);

    // retornao paciente criado.
    return newPatient;
  }
}
