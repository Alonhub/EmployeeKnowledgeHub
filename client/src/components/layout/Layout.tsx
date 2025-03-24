import { ReactNode, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useSidebar } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { open, toggleSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 pt-20 sm:pt-22 md:pt-24"> {/* Adjusted padding for different screen sizes */}
          <div className="mx-auto max-w-full lg:max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}