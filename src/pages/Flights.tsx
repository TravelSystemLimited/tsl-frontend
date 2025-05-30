import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React, { useState } from "react";
import { ArrowLeftRightIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/ui/header";
import { FaCarAlt, FaHotel } from "react-icons/fa";
import { MdOutlineFlight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdFlightTakeoff } from "react-icons/md";
import { MdOutlineFlightLand } from "react-icons/md";

// Utility function


// Header Section Component
const HeaderSection = (): JSX.Element => {
  const notificationCount = 2;
  const userData = {
    initials: "SJ",
  };

  return (
    <header className="w-full h-[83px] bg-neutral-200 flex items-center justify-between px-[58px]">
      <img
        className="w-[153px] h-[34px] object-cover"
        alt="Travelsysytem logo"
        src="/travelsysytem-logo-1024x226-1.png"
      />
      <div className="flex items-center gap-8">
        <div className="relative w-8 h-[38px]">
          <div className="absolute w-6 h-6 top-3.5 left-0">
            <img
              className="absolute w-[18px] h-[22px] top-px left-[3px]"
              alt="Notification bell"
              src="/group.png"
            />
          </div>
          {notificationCount > 0 && (
            <Badge className="absolute w-5 h-5 top-0 left-3 bg-[#ff6b6b] rounded-[10px] flex items-center justify-center p-0">
              <span className="text-[10px] font-normal text-white">
                {notificationCount}
              </span>
            </Badge>
          )}
        </div>
        <Avatar className="w-[37px] h-[37px] bg-[#8c6d73]">
          <AvatarFallback className="text-sm font-medium text-white">
            {userData.initials}
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

// Flight Details Section Component
const FlightDetailsSection = (): JSX.Element => {
  const flightDetails = {
    from: "Bengaluru, India",
    to: "Dubai, United Arab Emi..",
    depart: "Thu, Aug 14, 2025",
    return: "Wed, Aug 20, 2025",
    class: "Economy",
  };

  return (
    <div className="flex w-full items-center justify-center gap-5 px-6 py-6 bg-white border-b border-[#bababa]">
      <div className="relative w-[197px]">
        <div className="relative">
          <div className="absolute -top-2 left-3 px-1 bg-white z-10">
            <span className="text-xs text-[#8e8e8e] font-normal">FROM</span>
          </div>
          <Input
            className="h-[57px] px-4 py-3 border-[#707070] font-normal"
            defaultValue={flightDetails.from}
          />
        </div>
      </div>

      <ArrowLeftRightIcon className="w-6 h-6" />

      <div className="relative w-[197px]">
        <div className="relative">
          <div className="absolute -top-2 left-3 px-1 bg-white z-10">
            <span className="text-xs text-[#8e8e8e] font-normal">TO</span>
          </div>
          <Input
            className="h-[57px] px-4 py-3 border-[#707070] font-normal"
            defaultValue={flightDetails.to}
          />
        </div>
      </div>

      <div className="relative w-[197px]">
        <div className="relative">
          <div className="absolute -top-2 left-3 px-1 bg-white z-10">
            <span className="text-xs text-[#8e8e8e] font-normal">DEPART</span>
          </div>
          <Input
            className="h-[57px] px-4 py-3 border-[#707070] font-normal"
            defaultValue={flightDetails.depart}
          />
        </div>
      </div>

      <div className="relative w-[197px]">
        <div className="relative">
          <div className="absolute -top-2 left-3 px-1 bg-white z-10">
            <span className="text-xs text-[#8e8e8e] font-normal">RETURN</span>
          </div>
          <Input
            className="h-[57px] px-4 py-3 border-[#707070] font-normal"
            defaultValue={flightDetails.return}
          />
        </div>
      </div>

      <div className="relative w-[197px]">
        <div className="relative">
          <div className="absolute -top-2 left-3 px-1 bg-white z-10">
            <span className="text-xs text-[#8e8e8e] font-normal">CLASS</span>
          </div>
          <Input
            className="h-[57px] px-4 py-3 border-[#707070] font-normal"
            defaultValue={flightDetails.class}
          />
        </div>
      </div>

      <Button className="w-[195px] h-[49px] bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[84px] font-normal">
        SEARCH
      </Button>
    </div>
  );
};

// Flight Card Section Component - Keep this exactly as is
const FlightCardSection = (): JSX.Element => {
  const flightData = {
    airline: "Air Arabia",
    airlineLogoSrc: "/air.png",
    flightType: "Direct Flight",
    cabinClass: "Economy",
    departure: {
      time: "15 : 25",
      date: "14 Aug",
      city: "Bengaluru",
      code: "BLR",
    },
    arrival: {
      time: "21 : 15",
      date: "14 Aug",
      city: "Dubai",
      code: "DXB",
    },
    price: "₹ 26,440",
  };
const router=useNavigate();
  return (
    <div className="w-full max-w-[629px]">
      <Card className="w-full shadow-[0px_4px_30.2px_-8px_#0000000a] rounded-[10px]">
        <CardContent className="p-0">
          <div className="p-[13px] relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-[30px] h-[30px]"
                  alt="Airline logo"
                  src={flightData.airlineLogoSrc}
                />
                <span className="font-normal text-base font-sans text-black">
                  {flightData.airline}
                </span>
              </div>

              <div className="flex gap-2">
                <Badge className="bg-[#bababa] hover:bg-[#bababa] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                  {flightData.flightType}
                </Badge>
                <Badge className="bg-[#4bc695] hover:bg-[#4bc695] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                  {flightData.cabinClass}
                </Badge>
              </div>
            </div>

            <img
              className="w-full h-px object-cover"
              alt="Divider"
              src="/vector-5.svg"
            />

            <div className="flex items-center justify-between py-6 px-8">
              <div className="flex flex-col">
                <div className="font-['Lato',Helvetica] font-normal text-2xl text-black">
                  {flightData.departure.time}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-xs text-[#707070]">
                  {flightData.departure.date}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-sm text-[#707070]">
                  {flightData.departure.city}
                </div>
              </div>

              <div className="flex flex-col items-center mx-8">
  {/* Icons and Flight Path */}
  <div className="relative flex items-center justify-between w-[220px] h-4">
    <MdFlightTakeoff className="text-[#3b3b3b]" />
    <div className="flex-1 h-[1px] bg-gray-400 mx-1" />
    <MdOutlineFlightLand className="text-[#3b3b3b]" />
  </div>

  {/* Airport Codes */}
  <div className="flex justify-between w-full mt-2 text-[10px] text-[#707070] font-['Inter',Helvetica]">
    <span>{flightData.departure.code}</span>
    <span>{flightData.arrival.code}</span>
  </div>
</div>


              <div className="flex flex-col">
                <div className="font-['Lato',Helvetica] font-normal text-2xl text-black">
                  {flightData.arrival.time}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-xs text-[#707070]">
                  {flightData.arrival.date}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-sm text-[#707070]">
                  {flightData.arrival.city}
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 mt-2 pr-6 pb-4">
              <span className="font-['Inter',Helvetica] font-medium text-lg">
                {flightData.price}
              </span>
              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px] px-6" onClick={()=>router("/hotels")}>
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Updated Flight List Section Component - Aligned with FlightCardSection
const FlightListSection = (): JSX.Element => {
  return (
    <div className="w-full max-w-[629px]">
      <Card className="w-full rounded-[10px] shadow-[0px_4px_30.2px_-8px_#0000000a]">
        <CardContent className="p-0">
          <div className="p-[13px] relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img
                  className="w-[30px] h-[30px]"
                  alt="Airline logo"
                  src="/ai-1.svg"
                />
                <span className="font-normal text-base font-sans text-black">
                  Air Arabia
                </span>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-[#bababa] hover:bg-[#bababa] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                  Direct Flight
                </Badge>
                <Badge className="bg-[#4bc695] hover:bg-[#4bc695] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                  Economy
                </Badge>
              </div>
            </div>

            

            <div className="flex items-center justify-between py-6 px-8">
              <div className="flex flex-col">
                <div className="font-['Lato',Helvetica] font-normal text-2xl text-black">
                  04 : 28
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-xs text-[#707070]">
                  14 Aug
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-sm text-[#707070]">
                  Bengaluru
                </div>
              </div>

              <div className="flex flex-col items-center mx-8">
                <div className="relative w-[220px] h-4">
                  <img
                    className="w-3 h-3 absolute top-0.5 left-0"
                    alt="Departure plane"
                    src="/clarity-plane-solid.svg"
                  />
                  <img
                    className="w-[178px] h-0.5 absolute top-[7px] left-5 object-cover"
                    alt="Flight path"
                    src="/vector-4.svg"
                  />
                  <img
                    className="w-4 h-4 absolute top-0 right-0"
                    alt="Arrival plane"
                    src="/clarity-plane-solid-3.svg"
                  />
                </div>
                <div className="flex justify-between w-full mt-2">
                  <span className="font-['Inter',Helvetica] font-normal text-[#707070] text-[10px]">
                    BLR
                  </span>
                  <span className="font-['Inter',Helvetica] font-normal text-[#707070] text-[10px]">
                    DXB
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="font-['Lato',Helvetica] font-normal text-2xl text-black">
                  10 : 15
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-xs text-[#707070]">
                  14 Aug
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-sm text-[#707070]">
                  Dubai
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-4 mt-2 pr-6 pb-4">
              <span className="font-['Inter',Helvetica] font-medium text-lg">
                ₹ 26,440
              </span>
              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px] px-6">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Search Filters Section Component
const SearchFiltersSection = (): JSX.Element => {
   const travelOptions = [
    {
      icon: <MdOutlineFlight />,
      alt: "Flight icon",
      active: true,
    },
    {
      icon:<FaHotel />,
      alt: "Hotel icon",
      active: true,
    },
    {
      icon: <FaCarAlt />,
      alt: "Cab icon",
      active: false,
    },
  ];
  return (
    <div className="w-full">
      <Card className="w-full bg-white rounded-[10px] shadow-[0px_4px_30.2px_-8px_#0000000a]">
        <CardContent className="p-0 relative">
          <div className="flex items-center justify-between p-5 pb-3">
            <div className="flex items-center gap-3">
              <img
                className="w-[30px] h-[30px]"
                alt="Air Arabia Logo"
                src="/ai-1.svg"
              />
              <span className="font-normal text-base font-['Inter',Helvetica]">
                Air Arabia
              </span>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-[#bababa] hover:bg-[#bababa] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                Direct Flight
              </Badge>
              <Badge className="bg-[#4bc695] hover:bg-[#4bc695] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                Economy
              </Badge>
            </div>
          </div>

          <img
            className="w-[536px] h-px mx-auto"
            alt="Divider"
            src="/vector-5.svg"
          />

          <div className="flex items-center justify-between p-5 pt-6">
            <div className="flex flex-col">
              <div className="text-2xl font-normal font-['Lato',Helvetica]">
                15 : 25
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#707070] font-normal font-['Lato',Helvetica]">
                  14 Aug
                </span>
              </div>
              <div className="text-sm text-[#707070] font-normal font-['Lato',Helvetica]">
                Bengaluru
              </div>
            </div>

            <div className="flex flex-col items-center mx-8">
              <div className="relative w-[220px] h-4">
                <img
                  className="w-[178px] h-0.5 absolute top-[7px] left-5"
                  alt="Flight Path"
                  src="/vector-4.svg"
                />
                <img
                  className="absolute w-3 h-3 top-0.5 left-0"
                  alt="Departure Plane"
                  src="/clarity-plane-solid.svg"
                />
                <img
                  className="absolute w-4 h-4 top-0 right-0"
                  alt="Arrival Plane"
                  src="/clarity-plane-solid-3.svg"
                />
              </div>
              <div className="flex justify-between w-full mt-2">
                <span className="text-[10px] text-[#707070] font-normal font-['Inter',Helvetica]">
                  BLR
                </span>
                <span className="text-[10px] text-[#707070] font-normal font-['Inter',Helvetica]">
                  DXB
                </span>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="text-2xl font-normal font-['Lato',Helvetica]">
                21 : 15
              </div>
              <div className="flex items-center justify-end">
                <span className="text-xs text-[#707070] font-normal font-['Lato',Helvetica]">
                  14 Aug
                </span>
              </div>
              <div className="text-sm text-[#707070] font-normal font-['Lato',Helvetica]">
                Dubai
              </div>
            </div>
          </div>

          <div className="flex justify-end p-5 pt-0">
            <Button className="bg-[#8c6d73] hover:bg-[#8c6d73]/90 text-white rounded-[5px] px-6 py-2.5">
              Select
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Flight Selection Section Component
const FlightSelectionSection = (): JSX.Element => {
  const flightData = {
    airline: "Air Arabia",
    airlineLogoSrc: "/air.png",
    flightType: "Direct Flight",
    cabinClass: "Economy",
    departure: {
      time: "08 : 28",
      date: "14 Aug",
      city: "Bengaluru",
      code: "BLR",
    },
    arrival: {
      time: "06 : 15",
      date: "15 Aug",
      city: "Dubai",
      code: "DXB",
    },
    price: "₹ 26,249",
    topPrice: "₹ 24,440",
  };

  return (
    <section className="relative w-full max-w-[633px] mt-[179px]">
      <div className="text-black font-medium text-base absolute right-0 top-0">
        {flightData.topPrice}
      </div>

      <Card className="w-full mt-[72px] p-0 shadow-[0px_4px_30.2px_-8px_#0000000a] rounded-[10px]">
        <CardContent className="p-0">
          <div className="relative p-[42px] pt-[13px] pb-[35px]">
            <div className="flex items-center justify-between mb-[15px]">
              <div className="flex items-center">
                <img
                  className="w-[30px] h-[30px]"
                  alt="Airline logo"
                  src={flightData.airlineLogoSrc}
                />
                <span className="ml-[15px] font-normal text-base font-['Inter',Helvetica]">
                  {flightData.airline}
                </span>
              </div>

              <div className="flex gap-3">
                <Badge className="bg-[#bababa] hover:bg-[#bababa] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                  {flightData.flightType}
                </Badge>
                <Badge className="bg-[#4bc695] hover:bg-[#4bc695] text-white rounded-[10px] px-[22px] py-0.5 font-normal text-base">
                  {flightData.cabinClass}
                </Badge>
              </div>
            </div>

            <img
              className="w-full max-w-[536px] h-px mb-[38px]"
              alt="Divider"
              src="/vector-5.svg"
            />

            <div className="flex items-center gap-[45px] mb-[38px]">
              <div className="relative">
                <div className="font-['Lato',Helvetica] font-normal text-2xl text-black">
                  {flightData.departure.time}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-xs text-[#707070] absolute top-3 left-0">
                  {flightData.departure.date}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-sm text-[#707070] mt-[7px]">
                  {flightData.departure.city}
                </div>
              </div>

              <div className="relative w-[224px]">
                <div className="w-full h-4 relative">
                  <img
                    className="w-[178px] h-0.5 absolute top-[7px] left-5 object-cover"
                    alt="Flight path"
                    src="/vector-4.svg"
                  />
                  <img
                    className="w-3 h-3 absolute top-0.5 left-0"
                    alt="Departure plane"
                    src="/clarity-plane-solid.svg"
                  />
                  <img
                    className="w-4 h-4 absolute top-0 right-0"
                    alt="Arrival plane"
                    src="/clarity-plane-solid-3.svg"
                  />
                </div>
                <div className="flex justify-between mt-[14px]">
                  <div className="font-['Inter',Helvetica] font-normal text-[#707070] text-[10px]">
                    {flightData.departure.code}
                  </div>
                  <div className="font-['Inter',Helvetica] font-normal text-[#707070] text-[10px]">
                    {flightData.arrival.code}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="font-['Lato',Helvetica] font-normal text-2xl text-black">
                  {flightData.arrival.time}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-xs text-[#707070] absolute top-[11px] right-0">
                  {flightData.arrival.date}
                </div>
                <div className="font-['Lato',Helvetica] font-normal text-sm text-[#707070] mt-[10px]">
                  {flightData.arrival.city}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-5">
              <div className="font-['Inter',Helvetica] font-medium text-base text-black">
                {flightData.price}
              </div>
              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px] px-[22px] py-2.5 font-normal">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

// Main Flights Component
const Flights = (): JSX.Element => {
   const travelOptions = [
    {
      icon: <MdOutlineFlight />,
      alt: "Flight icon",
      active:false,
    },
    {
      icon:<FaHotel />,
      alt: "Hotel icon",
      active: false,
    },
    {
      icon: <FaCarAlt />,
      alt: "Cab icon",
      active: false,
    },
  ];
  return (
    <div className="bg-[#f6f6f6] flex flex-row justify-center w-full">
      <div className="bg-[#f6f6f6] w-full max-w-[1440px] relative">
        <Header username="Employee" />
        <div className="relative py-5 flex justify-center">
            <div className="flex items-center gap-[147px]">
             {travelOptions.map((option, index) => (
        <div key={index} className={`w-[40px] h-[40px] flex items-center justify-center rounded-md ${option.active ? "bg-[#7C5D5D] text-white" : "bg-gray-200 text-gray-500"}`}>
          <span className="text-[18px]" title={option.alt}>
            {option.icon}
          </span>
        </div>
      ))}
            </div>

           
          </div>
        <FlightDetailsSection />

        <div className="mt-7 mx-16 mb-4">
          <p className="font-medium text-xl text-[#606060] font-['Lato',Helvetica] tracking-[0]">
            Flights from Bengaluru to Dubai
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 px-16">
          <div className="flex flex-col space-y-6 w-full md:w-[629px]">
            <div className="relative">
              <FlightCardSection />
            
            </div>

            <div className="relative">
              <SearchFiltersSection />
             
            </div>
          </div>

          <div className="w-full md:w-[633px]">
              <FlightCardSection />
            {/* <FlightSelectionSection /> */}
          </div>
        </div>
{/* 
        <div className="w-full mt-4">
          <div className="w-full h-[139px] bg-white border-b border-[#d5d5d5]">
            <div className="relative w-[432px] h-[46px] mx-auto pt-[21px]">
              <img
                className="w-[158px] h-px absolute top-[22px] left-[46px] object-cover"
                alt="Vector"
                src="/vector-6.svg"
              />
              <img
                className="w-[164px] h-px absolute top-[22px] left-[225px] object-cover"
                alt="Vector"
                src="/vector-5.svg"
              />
              <div className="flex items-center justify-between">
                <div className="flex w-[46px] h-[46px] items-center justify-center bg-[#8c6d73] rounded">
                  <img
                    className="w-6 h-6"
                    alt="Mdi flight"
                    src="/mdi-flight.svg"
                  />
                </div>
                <div className="flex w-[46px] h-[46px] items-center justify-center bg-[#d9d9d9] rounded-[5px] ml-[147px]">
                  <div className="w-[18px] h-[18px]" />
                </div>
                <div className="w-[46px] h-[46px] bg-[#f2f2f2] rounded ml-[147px]" />
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="w-[479px] h-[52px] bg-[#f0f0f0]" />
            <div className="absolute top-[14px] left-[182px] flex items-center">
              <img
                className="w-6 h-6 mr-3"
                alt="Material symbols"
                src="/material-symbols-light-flight.svg"
              />
              <span className="font-['Lato',Helvetica] text-neutral-600 font-normal text-base">
                Select Flight
              </span>
            </div>
            <img
              className="absolute w-7 h-7 top-[-56px] left-[707px]"
              alt="Hotel star"
              src="/hotel-star.png"
            />
            <img
              className="absolute w-[34px] h-[34px] top-[-59px] left-[897px]"
              alt="London cab"
              src="/london-cab.png"
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};


export default Flights;