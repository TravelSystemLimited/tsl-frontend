import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./DashboardLayout";
import LoginPage from "./pages/Loginpage";
import Flights from "./pages/Flights";
import Checkout from "./pages/Checkout";
import FlightBooking from "./pages/FlightsBooking";
import HotelBooking from "./pages/HotelBooking";
import CabBooking from "./pages/CabBooking";
import Employees from "./pages/Employees";

import { ThemeProvider } from "./context/ThemeContext";

import PolicyForm from "./components/PolicyForm";
import EmployeeForm from "./components/EmployeeForm";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <Routes>
              {/* Auth / landing  */}
              <Route path="/tsl" element={<LoginPage />} />
              <Route path="/s2c" element={<LoginPage />} />
              <Route path="/" element={<LoginPage />} />

              {/* Stand-alone booking flows */}
              <Route path="/manager" element={<Index />} />
              <Route path="/employee" element={<FlightBooking />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cabs" element={<CabBooking />} />
              <Route path="/hotels" element={<HotelBooking />} />
              <Route path="/flights" element={<Flights />} />

              {/* Dashboard & nested pages */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="requests" element={<Requests />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="history" element={<History />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="add-policy" element={<PolicyForm />} />
                <Route path="add-employee" element={<EmployeeForm />} />
                <Route path="employees" element={<Employees />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
