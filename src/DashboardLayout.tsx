import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "./components/ui/header";
import { AppSidebar } from "./components/AppSidebar";

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <div className="flex flex-col">
        {/* Fixed Header at the top */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header username="Manager Name" />
        </div>
        
        {/* Main content area with sidebar and page content */}
        <div className="flex flex-1 overflow-hidden pt-16"> {/* Add pt-16 to account for header height */}
          {/* Sidebar */}
          <div className="h-full">
            <AppSidebar />
          </div>
          
          {/* Page content */}
          <main className="flex-1 overflow-auto p-[10px] md:p-6 bg-gray-50">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}