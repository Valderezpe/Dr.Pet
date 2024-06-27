import DoctorController from "@/application/controller/DoctorController";
import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";
import PatientController from "./controller/PatientController";

export default class Router {
  app: express.Express;

  constructor(
    readonly doctorController: DoctorController,
    readonly patientController: PatientController
  ) {
    this.app = express();
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());

    this.setRoutes();
  }

  private setRoutes() {
    // my router
    this.app.get("/", (req, res) => {
      res.send("Olá Valderez");
    });
    this.app.get("/doctors", this.doctorController.listDoctor);
    this.app.post("/patient", this.patientController.createPatient);
    this.app.post(
      "/patient/:patientId/appointment",
      this.patientController.createAppointment
    );
  }
  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }
}
