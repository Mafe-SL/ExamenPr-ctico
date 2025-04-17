import express from "express";
import { mongoDB } from "./config/db.js";
import cors from "cors";
import { vehicleRouter } from "./routes/Vehicle.js";

const app = express();
const port = 5000;

mongoDB();

app.listen(port);
app.use(cors());
app.use(express.json());
app.use('/api', vehicleRouter);

console.log("Escuchando por el puerto: ", port);