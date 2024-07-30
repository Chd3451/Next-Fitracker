'use client'
// app/planes/page.tsx
import { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TrainingPlansTable from "@/components/Tables/TrainingPlansTable";
import DietPlansTable from "@/components/Tables/DietPlansTable";
import OtherPlansTable from "@/components/Tables/OtherPlansTable";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const TablesPage = () => {
  useEffect(() => {
    const handleGeneratePDF = () => {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Reporte de Planes de Fitness", 10, 10);

      doc.setFontSize(14);
      doc.text(`Fecha de Impresión: ${new Date().toLocaleDateString()}`, 10, 20);

      const trainingPlans = JSON.parse(localStorage.getItem("trainingPlans") || "[]");
      if (trainingPlans.length > 0) {
        doc.addPage();
        doc.text("Planes de Entrenamiento", 10, 10);
        (doc as any).autoTable({
          startY: 20,
          head: [['Nombre', 'Duración', 'Intensidad']],
          body: trainingPlans.map((plan: any) => [plan.name, plan.duration, plan.intensity]),
          theme: 'grid',
        });
      }

      const dietPlans = JSON.parse(localStorage.getItem("dietPlans") || "[]");
      if (dietPlans.length > 0) {
        doc.addPage();
        doc.text("Planes de Dieta", 10, 10);
        (doc as any).autoTable({
          startY: 20,
          head: [['Nombre', 'Duración', 'Calorías']],
          body: dietPlans.map((plan: any) => [plan.name, plan.duration, plan.calories]),
          theme: 'grid',
        });
      }

      const otherPlans = JSON.parse(localStorage.getItem("otherPlans") || "[]");
      if (otherPlans.length > 0) {
        doc.addPage();
        doc.text("Otros Planes", 10, 10);
        (doc as any).autoTable({
          startY: 20,
          head: [['Nombre', 'Descripción', 'Duración']],
          body: otherPlans.map((plan: any) => [plan.name, plan.description, plan.duration]),
          theme: 'grid',
        });
      }

      doc.save("Planes_Fitness.pdf");
    };

    window.addEventListener('generatePDF', handleGeneratePDF);

    return () => {
      window.removeEventListener('generatePDF', handleGeneratePDF);
    };
  }, []);

  const handlePrintReport = () => {
    const event = new CustomEvent('generatePDF');
    window.dispatchEvent(event);
  };

  return (
    <>
      <Breadcrumb pageName="Registro de Planes" />
      <div className="flex justify-end p-4">
        <button
          className="p-2 bg-blue-500 text-white rounded-md"
          onClick={handlePrintReport}
        >
          Guardar Planes
        </button>
      </div>
      <div className="flex flex-col gap-10 p-4">
        <TrainingPlansTable />
        <DietPlansTable />
        <OtherPlansTable />
      </div>
    </>
  );
};

export default TablesPage;
