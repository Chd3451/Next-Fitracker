import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FitTracker | Fitness",
  description: "FitTracker",
  icons:{
    icon:  '/images/FitTracker.svg',
  }
};

export default function Home() {
  return (
    <>
      <ECommerce />
    </>
  );
}
