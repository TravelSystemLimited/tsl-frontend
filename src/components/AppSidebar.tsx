// AppSidebar.tsx
import { BarChart3, Users, Clock, FileText, Plane, IndianRupee, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { IoPersonAddSharp } from 'react-icons/io5';
import { IoIosAddCircle } from 'react-icons/io';

const navigationItems = [
  {
    title: "Overview",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Pending Requests",
    url: "/dashboard/requests",
    icon: FileText,
  },
  {
    title: "Add Employees & Policies",
    url: "/dashboard/add",
    icon: IoIosAddCircle ,
  },
  {
    title: "Analytics",
    url: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Travel History",
    url: "/dashboard/history",
    icon: Clock,
  },
  {
    title: "Employees",
    url: "/dashboard/employees",
    icon: Users,
  },
  {
    title: "All Bookings",
    url: "/dashboard/bookings",
    icon: Plane,
  },
  {
    title: "Employee Booking",
    url: "/dashboard/employee-booking",
    icon:IoPersonAddSharp ,
  }
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="h-full border-r border-gray-200 mt-24" collapsible="icon">
      {/* <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#8C6D73] rounded-lg">
            <Plane className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#8C6D73]">TSL Travel</h2>
            <p className="text-sm text-gray-600">Manager Dashboard</p>
          </div>
        </div>
      </SidebarHeader> */}
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#8C6D73] font-semibold">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="data-[active=true]:bg-[#8C6D73] data-[active=true]:text-white hover:bg-[#8C6D73]/10"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <IndianRupee className="h-4 w-4" />
          <span>Currency: Indian Rupees</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}