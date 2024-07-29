import Calendar from "@/components/Calender";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitTracker | Fitness",
  description: "FitTracker",
  // other metadata
};

const CalendarPage = () => {
  return (
    <>
      <Calendar />
    </>
  );
};

export default CalendarPage;
