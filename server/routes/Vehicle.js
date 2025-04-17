import { Router } from "express";
import { getVehicles, registerEntry, registerExit } from "../controllers/vehicleController.js";

export const vehicleRouter = Router();

vehicleRouter.post('/vehicles/entry', registerEntry);
vehicleRouter.post('/vehicles/exit', registerExit);
vehicleRouter.get('/vehicles', getVehicles);