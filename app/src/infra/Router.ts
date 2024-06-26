import DoctorController from "@/application/controller/DoctorController";
import cors from "cors";
import express from "express";
import "express-async-errors";
import helmet from "helmet";

export default class Router {
  app: express.Express;

  constructor(readonly doctorController: DoctorController) {
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
  }
  public start(port: number) {
    this.app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  }
}
