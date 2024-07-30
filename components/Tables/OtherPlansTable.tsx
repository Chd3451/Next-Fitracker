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

interface OtherPlan {
  name: string;
  description: string;
  category: string;
}

const OthersPlansTable = () => {
  const [plans, setPlans] = useState<OtherPlan[]>([]);
  const [newPlan, setNewPlan] = useState<OtherPlan>({
    name: "",
    description: "",
    category: "",
  });

  const handleAddPlan = () => {
    setPlans([...plans, newPlan]);
    setNewPlan({ name: "", description: "", category: "" });
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
      <Title>Otros Planes</Title>
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
          placeholder="Descripción"
          value={newPlan.description}
          onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
          className="rounded-md border border-stroke p-2"
        />
        <input
          type="text"
          placeholder="Categoría"
          value={newPlan.category}
          onChange={(e) => setNewPlan({ ...newPlan, category: e.target.value })}
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
            <TableHeaderCell>Descripción</TableHeaderCell>
            <TableHeaderCell>Categoría</TableHeaderCell>
            <TableHeaderCell>Acciones</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {plans.map((plan, index) => (
            <TableRow key={index}>
              <TableCell>{plan.name}</TableCell>
              <TableCell>{plan.description}</TableCell>
              <TableCell>{plan.category}</TableCell>
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

export default OthersPlansTable;
