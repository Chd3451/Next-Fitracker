import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "FitTracker | Fitness",
  description: "FitTracker",
  // other metadata
};
type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return <div>{props.children}</div>;
};
export default layout;
