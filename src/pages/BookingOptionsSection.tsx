// Types and Utilities
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MapPinIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MdEdit } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import Header from "@/components/ui/header";
import { MdOutlineFlight } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaHotel } from "react-icons/fa6";
import { FaCarAlt } from "react-icons/fa";




// Hotel Card Components
const BookingOptionsSection = (): JSX.Element => {
  const hotelData = {
    name: "Five Jumeirah Village",
    image: "/hotel3.png",
    address: "District 14, Street 1, Dubai 118561 United Arab Emirates",
    price: "₹ 18,000",
  };

  return (
    <div className="w-full max-w-[631px] my-4">
      <Card className="relative w-full shadow-lg rounded-[10px]">
        <CardContent className="p-0 flex">
          <div className="p-[11px]">
            <img
              className="w-[207px] h-[207px] object-cover"
              alt="Five Jumeirah Village"
              src={hotelData.image}
            />
          </div>

          <div className="flex flex-col flex-1 p-6">
            <h2 className="font-bold text-xl font-['Inter',Helvetica]">
              {hotelData.name}
            </h2>

            <div className="flex flex-col mt-3 gap-3.5">
              <Separator className="w-full" />

              <div className="flex items-start">
                <MapPinIcon className="w-6 h-6 mr-2 flex-shrink-0" />
                <span className="text-[#707070] text-sm font-['Inter',Helvetica] leading-5">
                  {hotelData.address}
                </span>
              </div>

              <Separator className="w-full" />
            </div>

            <div className="flex items-center justify-between mt-auto">
              <div className="font-medium text-base font-['Inter',Helvetica]">
                {hotelData.price}
              </div>

              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px]">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const HeaderSection = (): JSX.Element => {
  return (
    <header className="w-full flex items-center justify-center gap-5 px-5 py-6 bg-white border-b border-[#bababa]">
      <div className="relative w-full max-w-[532px]">
        <div className="relative">
          <div className="absolute -top-2.5 left-4 px-1 bg-white z-10">
            <span className="font-['Lato',Helvetica] text-xs text-[#8e8e8e]">
              Location
            </span>
          </div>
          <Input
            className="h-[58px] px-4 py-[15px] border-[#707070] font-['Lato',Helvetica] text-base"
            defaultValue="Miracle Garden"
          />
        </div>
      </div>

      <Button className="w-[195px] h-[49px] bg-[#8c6d73] hover:bg-[#7d6166] rounded-[84px] font-['Lato',Helvetica] text-base">
        SEARCH
      </Button>
    </header>
  );
};

const HotelCardSection = (): JSX.Element => {
  const hotelData = {
    name: "OSTELLO MILANO",
    image: "/hotel2.png",
    location: "Al Barsha South Dubai Science Park, Dubai United Arab Emirates",
    price: "₹ 29,700",
  };

  return (
    <div className="w-full max-w-[630px]">
      <Card className="w-full overflow-hidden shadow-[0px_4px_29.6px_8px_#0000000a] rounded-[10px]">
        <CardContent className="p-0 flex">
          <div className="relative">
            <img
              className="w-[207px] h-[207px] object-cover m-[11px]"
              alt="Hotel"
              src={hotelData.image}
            />
          </div>

          <div className="flex flex-col flex-1 p-6">
            <h3 className="font-bold text-xl font-['Inter',Helvetica] text-black">
              {hotelData.name}
            </h3>

            <div className="flex flex-col mt-3 gap-3.5">
              <Separator className="w-full" />

              <div className="flex items-start">
                <MapPinIcon className="w-6 h-6 min-w-6 text-gray-500" />
                <p className="ml-2 text-sm text-[#707070] font-['Inter',Helvetica] leading-5">
                  {hotelData.location}
                </p>
              </div>

              <Separator className="w-full" />
            </div>

            <div className="flex justify-between items-center mt-auto">
              <p className="font-medium text-base font-['Inter',Helvetica] text-black">
                {hotelData.price}
              </p>

              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px]">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const HotelListSection = (): JSX.Element => {
  return (
    <header className="w-full h-[83px] bg-neutral-200 flex items-center justify-between px-14">
      <div>
        <img
          className="w-[153px] h-[34px] object-cover"
          alt="Travelsysytem logo"
          src="/travelsysytem-logo-1024x226-1.png"
        />
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-8 h-[38px]">
          <div className="absolute w-6 h-6 top-3.5 left-0">
            <img
              className="w-[18px] h-[22px] absolute top-px left-[3px]"
              alt="Notifications"
              src="/group.png"
            />
          </div>
          <Badge className="absolute w-5 h-5 top-0 left-3 bg-[#ff6b6b] text-white p-0 flex items-center justify-center rounded-[10px]">
            <span className="text-[10px]">2</span>
          </Badge>
        </div>

        <Avatar className="w-[37px] h-[37px] bg-[#8c6d73]">
          <AvatarFallback className="text-sm text-white font-medium">
            SJ
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

const HotelSearchSection = (): JSX.Element => {
  const hotelData = {
    name: "Radisson Hotel Dubai Damac Hills",
    image: "/hotel4.png",
    address: "Hessa Street,dubailand Dubailand, Dubai United Arab Emirates",
    price: "₹ 23,000",
  };

  return (
    <div className="w-full max-w-[631px] mx-auto">
      <Card className="relative w-full bg-white rounded-[10px] shadow-[0px_4px_29.6px_8px_#0000000a] overflow-hidden">
        <CardContent className="p-0 flex">
          <div className="relative">
            <img
              className="w-[207px] h-[207px] object-cover m-[11px]"
              alt="Hotel"
              src={hotelData.image}
            />
          </div>

          <div className="flex flex-col flex-1 p-6">
            <h3 className="font-bold text-xl font-['Inter',Helvetica] text-black mb-4">
              {hotelData.name}
            </h3>

            <Separator className="w-full mb-3.5" />

            <div className="flex items-start mb-3.5">
              <MapPinIcon className="w-6 h-6 min-w-6 text-gray-500 mr-2" />
              <p className="text-sm text-[#707070] font-['Inter',Helvetica] leading-5">
                {hotelData.address}
              </p>
            </div>

            <Separator className="w-full mb-3.5" />

            <div className="flex items-center justify-between mt-auto">
              <p className="font-medium text-base font-['Inter',Helvetica] text-black">
                {hotelData.price}
              </p>

              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px] px-5">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NavigationSection = (): JSX.Element => {
  return (
    <div className="w-full max-w-[631px] my-4">
      <Card className="flex overflow-hidden rounded-[10px] shadow-[0px_4px_29.6px_8px_#0000000a]">
        <CardContent className="p-0 flex w-full">
          <div className="relative">
            <img
              className="w-[207px] h-[207px] object-cover"
              alt="Hotel"
              src="/hotel1.png"
            />
          </div>

          <div className="flex flex-col flex-1 p-4">
            <h3 className="font-bold text-xl font-['Inter',Helvetica] text-black mb-3">
              CENTRAL PARK B&amp;B
            </h3>

            <Separator className="mb-3" />

            <div className="flex items-start mb-3">
              <MapPinIcon className="w-6 h-6 mr-2 flex-shrink-0" />
              <p className="text-sm text-[#707070] font-['Inter',Helvetica] leading-5">
                Street 1 Jumeirah Village, Dubai 215373 United Arab Emirates
              </p>
            </div>

            <Separator className="mb-3" />

            <div className="flex justify-between items-center mt-auto">
              <span className="font-medium text-base font-['Inter',Helvetica] text-black">
                ₹ 23,000
              </span>
              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px]">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Main Hotels Component
export const Hotels = (): JSX.Element => {
  const travelOptions = [
    {
      icon: <MdOutlineFlight />,
      alt: "Flight icon",
      active: true,
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

  const travelDetails = [
    {
      icon: <MdOutlineFlight/>,
      alt: "Flight icon",
      text: "Air Arabia 2069Airbus A321",
      editIcon: <MdEdit />,
    },
    {
      icon: <FaHotel />,
      alt: "Hotel icon",
      text: "Select Hotel",
    },
  ];

  return (
    <>
     <Header username="Employee"/>
    <div className="bg-[#f6f6f6] flex flex-row justify-center w-full">
     
      <div className="bg-[#f6f6f6] w-full max-w-[1440px] relative">
        <div className="w-full bg-white border-b border-[#d5d5d5]">
        <div className="relative py-5 flex justify-center">
  <div className="flex items-center gap-[147px]">
    {travelOptions.map((option, index) => (
      <React.Fragment key={index}>
        <div className={`w-[40px] h-[40px] flex items-center justify-center rounded-md ${option.active ? "bg-[#7C5D5D] text-white" : "bg-gray-200 text-gray-500"}`}>
          <span className="text-[18px]" title={option.alt}>
            {option.icon}
          </span>
        </div>
        
        {/* Add dots between options (but not after the last one) */}
        {index < travelOptions.length - 1 && (
          <div className="flex items-center gap-2 absolute" style={{left: `${520 + (index * 179)}px`, top: '41px'}}>
            {[...Array(10)].map((_, dotIndex) => (
              <div
                key={dotIndex}
                className="w-1 h-1 bg-gray-400 rounded-full"
              />
            ))}
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
</div>

          <div className="flex">
            {travelDetails.map((detail, index) => (
              <div
                key={index}
                className="flex items-center h-[52px] bg-[#f0f0f0] px-4 gap-3"
                style={{
                  width: index === 0 ? "479px" : "479px",
                  marginLeft: index === 1 ? "9px" : "0",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 relative">
                    <span className="w-12 flex items-center mt-1 ">
                    {detail.icon}
                    </span>
                  </div>
                  <span className="font-['Lato',Helvetica] text-neutral-600 text-base">
                    {detail.text}
                  </span>
                </div>
               
              </div>
            ))}
          </div>
        </div>

    
        <HeaderSection />


        <div className="flex justify-between items-center mt-4 px-16">
          <div></div>
          <div className="flex items-center gap-4">
            <span className="font-['Inter',Helvetica] font-normal text-black text-sm">
              Skip
            </span>
            <Button className="bg-[#8c6d73] text-white rounded-[5px] flex items-center gap-1.5">
             <FaCarAlt />
              <span className="font-['Inter',Helvetica] text-base">Cabs</span>
             <IoIosArrowForward />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 px-16 mt-8">
          <div>
            <NavigationSection />
          </div>
          <div>
            <HotelCardSection />
          </div>
          <div>
            <BookingOptionsSection />
          </div>
          <div>
            <HotelSearchSection />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default BookingOptionsSection;
