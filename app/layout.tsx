"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect } from "react";
import Loader from "@/components/common/Loader";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);

    // Check if the current path is /auth/signin or /auth/signup
    const path = window.location.pathname;
      console.log("Current path:", path); 
    setIsAuthPage(path === '/auth/signin' || path === '/auth/signup');
  }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-black dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              {!isAuthPage && <Sidebar />}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {!isAuthPage && (
                  <Header
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />
                )}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
