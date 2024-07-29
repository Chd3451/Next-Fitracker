// src/types/jspdf-autotable.d.ts
import { jsPDF } from 'jspdf';

declare module 'jspdf-autotable' {
  export interface AutoTableColumn {
    // Definir las opciones para las columnas
    header?: string;
    dataKey?: string;
    // Agrega otras opciones según sea necesario
  }

  export interface AutoTableOptions {
    startY?: number;
    margin?: { left?: number; right?: number; top?: number; bottom?: number };
    head?: Array<string[]>;
    body?: Array<any[]>;
    theme?: string;
    styles?: { fontSize?: number };
    headStyles?: { fillColor?: number[]; textColor?: number[] };
    bodyStyles?: { fillColor?: number[] };
    // Agrega otras opciones según sea necesario
  }

  // Extiende jsPDF para incluir el método autoTable
  declare module 'jspdf' {
    interface jsPDF {
      autoTable(options: AutoTableOptions): void;
    }
  }
}
