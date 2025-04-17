import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskTable from "./components/VehicleTable.jsx";
import EntryForm from "./components/EntryForm.jsx";

function App() {
  return (
    <div className="h-screen font-bold p-5 al text-center font-poppins">
      <h1 className="text-5xl">Estacionamiento</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskTable />} />
          <Route path="/entry" element={<EntryForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
