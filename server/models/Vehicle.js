import mongoose, { Schema } from "mongoose";

const vehicle = new Schema({
    plate: { type: String, required: true },
    type: { type: String, enum: ['OFICIAL', 'RESIDENTE', 'NO_RESIDENTE'], required: true },
    entryTime: { type: Date, required: true },
    exitTime: { type: Date },
    fee: { type: Number, default: 0 }
})

const vehicleSchema = mongoose.model("Vehicle", vehicle);

export default vehicleSchema;