import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function VehicleTable() {
  const [vehicles, setVehicles] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vehicles")
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener vehículos:", error);
      });
  }, []);

  const handleExit = (plate) => {
    const confirmed = window.confirm("¿Registrar salida del vehículo?");
    if (confirmed) {
      axios
        .post("http://localhost:5000/api/vehicles/exit", { plate })
        .then(() => {
          setVehicles((prev) =>
            prev.map((v) =>
              v.plate === plate
                ? { ...v, exitTime: new Date().toISOString() }
                : v
            )
          );
        })
        .catch((error) => {
          console.error("Error al registrar salida:", error);
        });
    }
  };

  const handleDownloadPDF = () => {
    if (!from || !to) {
      alert("Por favor selecciona ambas fechas");
      return;
    }

    const fromISO = new Date(from).toISOString();
    const toISO = new Date(to).toISOString();

    window.open(
      `http://localhost:5000/api/vehicles?from=${fromISO}&to=${toISO}&format=pdf`,
      "_blank"
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString();
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-700 mb-5 p-4">
          Registro de Vehículos
        </h2>
        <Link to="/entry">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-500 transition-all">
            Registrar entrada
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-4 items-end mb-6">
        <div>
          <label className="block mb-1 text-gray-700">Desde</label>
          <input
            type="datetime-local"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="border px-3 py-1 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700">Hasta</label>
          <input
            type="datetime-local"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="border px-3 py-1 rounded"
          />
        </div>
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Descargar PDF
        </button>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Placa</th>
              <th className="px-4 py-2">Tipo</th>
              <th className="px-4 py-2">Día</th>
              <th className="px-4 py-2">Hora Entrada</th>
              <th className="px-4 py-2">Hora Salida</th>
              <th className="px-4 py-2">Pago</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{vehicle.plate}</td>
                <td className="px-4 py-2 capitalize">{vehicle.type}</td>
                <td className="px-4 py-2">{formatDate(vehicle.entryTime)}</td>
                <td className="px-4 py-2">{formatTime(vehicle.entryTime)}</td>
                <td className="px-4 py-2">{formatTime(vehicle.exitTime)}</td>
                <td className="px-4 py-2">${vehicle.fee}</td>
                <td className="px-4 py-2">
                  {!vehicle.exitTime && (
                    <button
                      onClick={() => handleExit(vehicle.plate)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition-all"
                    >
                      Registrar salida
                    </button>
                  )}
                  {vehicle.exitTime && (
                    <span className="text-green-600 font-semibold">Salió</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VehicleTable;
