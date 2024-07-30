import { useState } from "react";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Title,
  Button,
} from "@tremor/react";

interface TrainingPlan {
  name: string;
  duration: string;
  intensity: string;
}

const TrainingPlansTable = () => {
  const [plans, setPlans] = useState<TrainingPlan[]>([]);
  const [newPlan, setNewPlan] = useState<TrainingPlan>({
    name: "",
    duration: "",
    intensity: "",
  });

  const handleAddPlan = () => {
    setPlans([...plans, newPlan]);
    setNewPlan({ name: "", duration: "", intensity: "" });
  };

  const handleRemovePlan = (index: number) => {
    const updatedPlans = plans.filter((_, i) => i !== index);
    setPlans(updatedPlans);
  };

  const handleClearPlans = () => {
    setPlans([]);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Title>Planes de Entrenamiento</Title>
      <div className="mb-4 flex flex-col gap-4">
        <input
          type="text"
          placeholder="Nombre del Plan"
          value={newPlan.name}
          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
          className="rounded-md border border-stroke p-2"
        />
        <input
          type="text"
          placeholder="Duración"
          value={newPlan.duration}
          onChange={(e) => setNewPlan({ ...newPlan, duration: e.target.value })}
          className="rounded-md border border-stroke p-2"
        />
        <input
          type="text"
          placeholder="Intensidad"
          value={newPlan.intensity}
          onChange={(e) => setNewPlan({ ...newPlan, intensity: e.target.value })}
          className="rounded-md border border-stroke p-2"
        />
        <Button onClick={handleAddPlan} className="self-end bg-primary text-white">
          Agregar Plan
        </Button>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre del Plan</TableHeaderCell>
            <TableHeaderCell>Duración</TableHeaderCell>
            <TableHeaderCell>Intensidad</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((plan, index) => (
            <TableRow key={index}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.duration}</TableCell>
              <TableCell>{plan.intensity}</TableCell>
              <TableCell>
                <Button onClick={() => handleRemovePlan(index)} className="bg-red-500 text-white">
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handleClearPlans} className="mt-4 bg-secondary text-white">
        Limpiar Planes
      </Button>
    </div>
  );
};

export default TrainingPlansTable;
