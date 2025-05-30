import { Input } from "@/components/ui/input";
import { ArrowLeftRightIcon } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";


export const BookingDetailsSection = (): JSX.Element => {
  // Data for the form fields
  const formData = {
    from: "Dubai, United Arab Emi..",
    to: "Five Jumeirah Village",
    pickupDate: "Wed, Aug 21, 2025",
    pickupTime: "12 : 06 AM",
  };

  return (
    <section className="flex items-center justify-center gap-5 px-[22px] py-[25px] bg-white border-b border-[#bababa] w-full">
      <div className="relative">
        <div className="relative">
          <Input
            className="w-[197px] h-[57px] px-[15px] py-[15px] border-[#707070] font-normal text-black text-base"
            defaultValue={formData.from}
          />
          <div className="absolute w-[52px] h-[15px] top-0 left-[13px] bg-white" />
          <div className="absolute top-0 left-[23px] font-normal text-[#8e8e8e] text-xs whitespace-nowrap">
            FROM
          </div>
        </div>
      </div>

      <ArrowLeftRightIcon className="w-6 h-6" />

      <div className="relative">
        <div className="relative">
          <Input
            className="w-[197px] h-[57px] px-[15px] py-[15px] border-[#707070] font-normal text-black text-base"
            defaultValue={formData.to}
          />
          <div className="absolute w-[33px] h-[15px] top-0 left-[13px] bg-white" />
          <div className="absolute top-0 left-[21px] font-normal text-[#8e8e8e] text-xs whitespace-nowrap">
            TO
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <Input
            className="w-[197px] h-[57px] px-[15px] py-[15px] border-[#707070] font-normal text-black text-base"
            defaultValue={formData.pickupDate}
          />
          <div className="absolute w-[92px] h-[15px] top-0 left-[13px] bg-white" />
          <div className="absolute top-0 left-[22px] font-normal text-[#8e8e8e] text-xs whitespace-nowrap">
            PICK-UP DATE
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <Input
            className="w-[197px] h-[57px] px-[15px] py-[15px] border-[#707070] font-normal text-black text-base"
            defaultValue={formData.pickupTime}
          />
          <div className="absolute w-[97px] h-[15px] top-0 left-[13px] bg-white" />
          <div className="absolute top-0 left-[25px] font-normal text-[#8e8e8e] text-xs whitespace-nowrap">
            PICK-UP TIME
          </div>
        </div>
      </div>

      <Button className="w-[195px] h-[49px] bg-[#8c6d73] hover:bg-[#7d6166] rounded-[84px] text-white font-normal text-base">
        SEARCH
      </Button>
    </section>
  );
};