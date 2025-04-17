import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EntryForm({ onEntryAdded }) {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5000/api/vehicles/entry", data)
      .then((response) => {
        console.log(response);
        if (onEntryAdded) onEntryAdded();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">
          Registrar Entrada
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-3"
        >
          <label htmlFor="plate" className="text-gray-600">
            Placa del Vehículo
          </label>
          <input
            type="text"
            {...register("plate", { required: true })}
            className="text-black border border-gray-300 rounded p-2"
            placeholder="ABC123"
          />

          <label htmlFor="type" className="text-gray-600">
            Tipo de Vehículo
          </label>
          <select
            {...register("type", { required: true })}
            className="text-black border border-gray-300 rounded p-2"
          >
            <option value="">Seleccionar tipo</option>
            <option value="OFICIAL">Oficial</option>
            <option value="RESIDENTE">Residente</option>
            <option value="NO_RESIDENTE">No Residente</option>
          </select>

          <div className="space-x-4 mt-4 flex items-center justify-center">
            <button
              type="submit"
              className="text-white bg-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-white hover:text-blue-500 transition"
            >
              Registrar
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EntryForm;
