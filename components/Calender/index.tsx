"use client";
import { useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage"; // Ajusta la ruta según tu estructura de carpetas

// Define el tipo para los eventos
type Event = {
  title: string;
  description: string;
  date: string;
  time: string;
};

const Calendar = () => {
  // Usa el tipo `Event[]` en el hook `useLocalStorage`
  const [events, setEvents] = useLocalStorage<Event[]>("calendar-events", []);
  const [form, setForm] = useState({ title: "", description: "", date: "", time: "" });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prevForm => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.date || !form.title) return; // Validar que la fecha y el título estén presentes

    setEvents(prevEvents => [
      ...prevEvents,
      { title: form.title, description: form.description, date: form.date, time: form.time }
    ]);

    // Limpiar formulario después de enviar
    setForm({ title: "", description: "", date: "", time: "" });
  };

  const getDayClass = (day: number) => {
    const event = events.find(event => new Date(event.date).getDate() === day);
    return event ? "bg-blue-100" : "";
  };

  const generateCalendarDays = () => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Número de días en el mes actual
    const startDay = new Date(year, month, 1).getDay(); // Primer día del mes
    const days = [...Array(startDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
    
    // Calcular las celdas necesarias para completar la cuadrícula (máximo 35 celdas)
    const totalCells = 35;
    const additionalDays = totalCells - days.length;
    const daysOfNextMonth = additionalDays > 0 ? Array.from({ length: additionalDays }, (_, i) => i + 1) : [];

    return [...days, ...daysOfNextMonth];
  };

  return (
    <>
      <div className="mb-4">
        <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleFormChange}
            placeholder="Título"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={handleFormChange}
            placeholder="Descripción"
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleFormChange}
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleFormChange}
            className="p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Agregar Evento</button>
        </form>
      </div>

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <table className="w-full">
          <thead>
            <tr className="grid grid-cols-7 rounded-t-sm bg-primary text-white">
              {["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"].map((day, i) => (
                <th key={i} className="flex h-15 items-center justify-center p-1 text-xs font-semibold sm:text-base xl:p-5">
                  <span>{day}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(generateCalendarDays().length / 7) }).map((_, rowIndex) => (
              <tr key={rowIndex} className="grid grid-cols-7">
                {Array.from({ length: 7 }).map((_, colIndex) => {
                  const dayIndex = rowIndex * 7 + colIndex;
                  const currentDay = generateCalendarDays()[dayIndex];
                  return (
                    <td
                      key={colIndex}
                      className={`ease relative h-20 cursor-pointer border border-stroke p-2 transition duration-500 hover:bg-gray dark:border-strokedark dark:hover:bg-meta-4 md:h-25 md:p-6 xl:h-31 ${getDayClass(currentDay)}`}
                    >
                      <span className="font-medium text-black dark:text-white">{currentDay || ""}</span>
                      {events.filter(event => new Date(event.date).getDate() === currentDay).map((event, idx) => (
                        <div key={idx} className="absolute left-2 z-99 mb-1 flex w-[200%] flex-col rounded-sm border-l-[3px] border-primary bg-gray px-3 py-1 text-left dark:bg-meta-4">
                          <span className="event-name text-sm font-semibold text-black dark:text-white">{event.title}</span>
                          <span className="time text-sm font-medium text-black dark:text-white">{event.date} {event.time}</span>
                          <p className="text-sm text-black dark:text-white">{event.description}</p>
                        </div>
                      ))}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Calendar;
