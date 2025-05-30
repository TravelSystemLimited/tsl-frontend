import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import Analytics from "./pages/Analytics";
import History from "./pages/History";
import Employees from "./pages/Employees";
import Bookings from "./pages/Bookings";
import NotFound from "./pages/NotFound";
import { DashboardLayout } from "./DashboardLayout";
import LoginPage from "./pages/Loginpage";

import FlightSelectionPage from "./pages/flightBooking";
import Cabs from "./pages/Cabs";
import BookingOptionsSection, { Hotels } from "./pages/BookingOptionsSection";
import Flights from "./pages/Flights";
import { Flight } from "./pages/FlightListing";
import { Hotel } from "./pages/HotelListing";
import { useState } from "react";
import { Cab } from "./pages/CabBooking";
import Checkout from "./pages/Checkout";


enum BookingStep {
  SEARCH,
  FLIGHTS,
  HOTELS,
  CABS,
  CHECKOUT,
  CONFIRMATION
}



const queryClient = new QueryClient();

const App = () => {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SEARCH);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedCab, setSelectedCab] = useState<Cab | null>(null);
  

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/manager" element={<Index />} />
            <Route path="/employee" element={<FlightSelectionPage />} />
            <Route path="/checkout" element={  <Checkout
    />} />

            <Route path="/cabs" element={<Cabs />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="requests" element={<Requests />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="history" element={<History />} />
              <Route path="employees" element={<Employees />} />
              <Route path="bookings" element={<Bookings />} />
              
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};


export default App;
