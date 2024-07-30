import { FaRunning, FaUserPlus, FaCalculator } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LineChartIcon,
  MenuIcon,
  ShoppingBag,
  AreaChart,
  Calendar,
  User2Icon,
  LockIcon,
  BarChart2,
  Component,
  Settings,
  Table2Icon,
  FormInputIcon,
  HomeIcon,
  LampIcon,
  SignalHigh,
  AlertCircle,
  SwissFranc,
  MousePointerClick,
} from "lucide-react";
import { useSidebar } from "./use-sidebar";
import { cn } from "@/app/libs/utlis";
import MenuItem from "./MenuItem";
import LinkItem from "./LinkItem";
import ExpandMenu from "./ExpandMenu";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const pathname = usePathname();
  const { isSidebarOpen, toggleSidebar } = useSidebar((state) => state);

  return (
    <aside
      className={cn(
        `absolute left-0 top-0 z-9999 flex h-screen w-20 flex-col overflow-y-hidden bg-black duration-300 ease-linear  dark:bg-boxdark lg:static lg:translate-x-0 `,
        {
          "w-70": isSidebarOpen,
        },
      )}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="relative flex w-full items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link className="flex items-center" href="/">
        <FaRunning  className="h-8 w-8 text-primary" /> {/* Usa el ícono */}
          {isSidebarOpen && (
            <h1 className=" ml-2 text-xl font-semibold text-white">
              FitTracker
            </h1>
          )}
        </Link>
        {isSidebarOpen && (
          <MenuIcon onClick={toggleSidebar} className="h-6 w-6" />
        )}
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="px-4 py-4  lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <ul
              className={cn("mb-6 flex flex-col  gap-1.5", {
                "items-center justify-center": !isSidebarOpen,
              })}
            >
              {/* <!-- Menu Item Dashboard --> */}
              <li>
                
                  <LinkItem
                    icon={<HomeIcon />}
                    title="Pagina Principal"
                    href="/"
                  />
              </li>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <LinkItem
                  title="Calendario"
                  href="/calendar"
                  icon={<Calendar className="h-6 w-6" />}
                ></LinkItem>
              </li>

              

              <li>
                <LinkItem
                  title="Planes"
                  href="/tables"
                  icon={<ShoppingBag className="h-6 w-6" />}
                ></LinkItem>
              </li> 

              
              <li>
                <LinkItem
                  title="Cliente"
                  href="/cliente"
                  icon={<User2Icon className="h-6 w-6" />}
                ></LinkItem>
              </li>


              <li>
                <LinkItem
                  title="Registro"
                  href="/registro"
                  icon={<FaUserPlus className="h-6 w-6" />}
                ></LinkItem>
              </li>
              <li>
                <LinkItem
                  title="Calculadora de BMR"
                  href="/calculadora"
                  icon={<FaCalculator className="h-6 w-6" />}
                ></LinkItem>
              </li>
              {/* 
              <li>
                <ExpandMenu name="Auth" icon={<LampIcon className="h-6 w-6" />}>
                  <LinkItem
                    title="Sign In"
                    href="/auth/signin"
                    icon={<LockIcon className="h-5 w-5" />}
                  ></LinkItem>
                  <LinkItem
                    title="Sign up"
                    href="/auth/signup"
                    icon={<SignalHigh className="h-5 w-5" />}
                  ></LinkItem>
                </ExpandMenu>
              </li>
              
              */}
              

              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
