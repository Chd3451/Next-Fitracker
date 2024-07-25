import { AreaChart, Card, Title } from "@tremor/react";

const chartdata = [
  {
    date: "Jul 24",
    SemiAnalysis: 1000,
    "Paquetes Vendidos": 145,
  },
  {
    date: "Ago22",
    SemiAnalysis: 1500,
    "Paquetes Vendidos": 290,
  },
  {
    date: "Sep 22",
    SemiAnalysis: 1600,
    "Paquetes Vendidos": 335,
  },
  {
    date: "Oct 22",
    SemiAnalysis: 1750,
    "Paquetes Vendidos": 405,
  },
  {
    date: "Nov 22",
    SemiAnalysis: 1800,
    "Paquetes Vendidos": 580,
  },
  {
    date: "Dic 22",
    SemiAnalysis: 1500,
    "Paquetes Vendidos": 900,
  },
];

const valueFormatter = function (number: number) {
  return "$ " + new Intl.NumberFormat("us").format(number).toString();
};

const ChartOne = () => (
  <Card>
    <Title>Newsletter revenue over time (USD)</Title>
    <AreaChart
      className="mt-4 h-72"
      data={chartdata}
      index="date"
      categories={["SemiAnalysis", "The Pragmatic Engineer"]}
      colors={["indigo", "cyan"]}
      valueFormatter={valueFormatter}
    />
  </Card>
);

export default ChartOne;
