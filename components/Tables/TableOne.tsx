import { Table, TableHead, TableHeaderCell, TableBody, TableRow, TableCell, Title } from "@tremor/react";
import Image from "next/image";

const brandData = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Google Adds",
    visitors: 0,
    revenues: "Free Trial",
    sales: 0,
    conversion: 0,
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Twitter",
    visitors: 2.0,
    revenues: "15 Day Free",
    sales: 0,
    conversion: 1,
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Github",
    visitors: 2,
    revenues: "Free Trial",
    sales: 0,
    conversion: 5,
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Facebook",
    visitors: 3,
    revenues: "2,000",
    sales: 1,
    conversion: 4.2,
  },
];

const TableOne = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Title>Mejores Canales</Title>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Recursos</TableHeaderCell>
            <TableHeaderCell>Visitas</TableHeaderCell>
            <TableHeaderCell>Renovaciones</TableHeaderCell>
            <TableHeaderCell>Ventas</TableHeaderCell>
            <TableHeaderCell>Conversión</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {brandData.map((brand, key) => (
            <TableRow
              className={`grid grid-cols-3 sm:grid-cols-5 ${
                key === brandData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={key}
            >
              <TableCell className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0">
                  <Image src={brand.logo} alt="Brand" width={48} height={48} />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {brand.name}
                </p>
              </TableCell>

              <TableCell className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{brand.visitors}K</p>
              </TableCell>

              <TableCell className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">${brand.revenues}</p>
              </TableCell>

              <TableCell className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{brand.sales}</p>
              </TableCell>

              <TableCell className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{brand.conversion}%</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableOne;
