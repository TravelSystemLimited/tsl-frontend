import { ArrowRightIcon, CheckIcon, PencilIcon } from "lucide-react";
import React from "react";






import { BookingDetailsSection } from "./BookinDetailSection";
import { CabsSection } from "./cabsection";
import { CancellationInfoSection } from "./cancellationinfo";
import { CarListSection } from "./carListSection";
import { SearchSection } from "./searchSection";
import Header from "@/components/ui/header";
import { Card, CardContent } from "@/components/ui/card";

 const Cabs = () => {
  // Travel details data
  const travelDetails = [
    {
      icon: "/material-symbols-light-flight.svg",
      text: "Air Arabia 2069Airbus A321",
      editIcon: "/mdi-pencil.svg",
    },
    {
      icon: "/group-2.png",
      text: "Five Jumeirah Village",
      editIcon: "/mdi-pencil.svg",
    },
    {
      icon: "/mdi-cab.svg",
      text: "Cabs",
      editIcon: null,
    },
  ];

  return (
    <div className="bg-[#f6f6f6] flex flex-row justify-center w-full">
      <div className="bg-[#f6f6f6] w-full max-w-[1440px] relative">
        {/* Header Section */}
        <Header username="Employee" />

        {/* Navigation Tabs */}
        <div className="w-full border-b border-[#d5d5d5] bg-white">
          <div className="relative w-[432px] h-[46px] mx-auto py-5">
            <img
              className="w-[158px] left-[46px] absolute h-px top-[22px] object-cover"
              alt="Vector"
              src="/vector-6.svg"
            />
            <img
              className="w-[164px] left-[225px] absolute h-px top-[22px] object-cover"
              alt="Vector"
              src="/vector-7.svg"
            />
            <div className="inline-flex items-center gap-[147px] absolute top-0 left-0">
              <div className="flex w-[46px] h-[46px] items-center justify-center bg-[#8c6d73] rounded">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Flight icon"
                  src="/material-symbols-light-flight.svg"
                />
              </div>
              <div className="flex w-[46px] h-[46px] items-center justify-center bg-[#8c6d73] rounded-[5px]">
                <div className="relative w-[18px] h-[18px]">
                  <img
                    className="absolute w-3.5 h-4 top-0.5 left-0.5"
                    alt="Hotel icon"
                    src="/group-1.png"
                  />
                </div>
              </div>
              <div className="flex w-[46px] h-[46px] items-center justify-center bg-[#f2f2f2] rounded">
                <img
                  className="w-[18px] h-[18px]"
                  alt="Cab icon"
                  src="/mdi-cab.svg"
                />
              </div>
            </div>
          </div>

          {/* Travel Details */}
          <div className="flex w-full">
            {travelDetails.map((detail, index) => (
              <div
                key={index}
                className={`flex-1 bg-[#f0f0f0] h-[52px] flex items-center ${index < travelDetails.length - 1 ? "mr-2" : ""}`}
              >
                <div className="flex items-center px-6">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <img
                      className={
                        index === 1 ? "w-[15px] h-[21px]" : "w-[18px] h-[18px]"
                      }
                      alt={`${detail.text} icon`}
                      src={detail.icon}
                    />
                  </div>
                  <span className="ml-3 font-normal text-neutral-600 text-base">
                    {detail.text}
                  </span>
                  {detail.editIcon && (
                    <PencilIcon className="ml-auto w-6 h-6 text-gray-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Details Section */}
        <BookingDetailsSection />

        {/* Main Content */}
        <div className="px-16 pt-8">
          {/* Title and Actions */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-[#606060] text-xl">
              Cabs from Dubai Airport to Miracle Garden
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-black cursor-pointer">Skip</span>
              <button className="bg-[#8c6d73] hover:bg-[#7c5d63] text-white flex items-center gap-1.5">
                Book
                <ArrowRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cancellation Notice */}
          <Card className="mb-6 bg-[#e5ece9] border-none rounded-[5px]">
            <CardContent className="p-4 flex items-center">
              <CheckIcon className="w-5 h-5 mr-4 text-[#606060]" />
              <span className="text-[#606060] text-base">
                Free Cancellation before 30 May 2025, 09:00 AM IST
              </span>
            </CardContent>
          </Card>

          {/* Main Sections Grid */}
          <div className="grid grid-cols-2 gap-4">
            <CarListSection />
            <CancellationInfoSection />
            <SearchSection />
            <CabsSection />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cabs;