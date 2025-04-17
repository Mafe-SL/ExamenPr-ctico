import vehicleSchema from "../models/Vehicle.js"
import calculateFee from "../utils/calculateFee.js"
import PDFDocument from "pdfkit";


export const getVehicles = async (req, res) => {
    try {
        const { from, to, format } = req.query
        const query = {}

        if (from && to) {
            query.entryTime = {
                $gte: new Date(from),
                $lte: new Date(to)
            }
        }

        const vehicles = await vehicleSchema.find(query).sort({ entryTime: -1 })

        if (format === "pdf") {
            const doc = new PDFDocument({ margin: 30, size: 'A4' })

            res.setHeader("Content-Disposition", "attachment; filename=report.pdf")
            res.setHeader("Content-Type", "application/pdf")

            doc.pipe(res)

            doc.fontSize(20).text("Reporte de Vehículos", { align: "center" })
            doc.moveDown()

            vehicles.forEach((v, i) => {
                doc.fontSize(12).text(
                    `${i + 1}. Placa: ${v.plate} | Tipo: ${v.type} | Entrada: ${new Date(v.entryTime).toLocaleString()} | Salida: ${v.exitTime ? new Date(v.exitTime).toLocaleString() : '---'} | Pago: $${v.fee || 0}`
                )
                doc.moveDown(0.5)
            })

            doc.end()
            return
        }
        res.status(200).json(vehicles)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const getVehicle = async (req, res) => {
    try {
        const vehicle = await vehicleSchema.findById(req.params.id)
        res.status(200).json(vehicle)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const registerEntry = async (req, res) => {
    const { plate, type } = req.body
    try {
        const newVehicle = new vehicleSchema({
            plate,
            type,
            entryTime: new Date()
        })
        const saved = await newVehicle.save()
        res.status(201).json(saved)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const registerExit = async (req, res) => {
    const { plate } = req.body
    try {
        const vehicle = await vehicleSchema.findOne({ plate, exitTime: null })

        if (!vehicle) {
            return res.status(404).json({ message: "Vehículo no encontrado." })
        }

        const exitTime = new Date()
        const fee = calculateFee(vehicle.type, vehicle.entryTime, exitTime)

        vehicle.exitTime = exitTime
        vehicle.fee = fee

        const updated = await vehicle.save()
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
