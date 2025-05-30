import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";


export const CabsSection = (): JSX.Element => {
  return (
    <div className="w-full py-4">
      <Card className="w-full bg-white rounded-[10px] shadow-[0px_4px_29.6px_8px_#0000000a]">
        <CardContent className="p-0 flex flex-col md:flex-row">
          {/* Car Image Section */}
          <div className="w-full md:w-[207px] h-[207px] p-[11px]"
          
          >
            <div className="w-full h-full bg-[#f2f2f2] rounded flex items-center justify-center object-cover"
              style={{ backgroundImage: `url("/cab1.png")` }}
            >
          
            </div>
          </div>

          {/* Car Details Section */}
          <div className="flex-1 p-4 flex flex-col">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-xl font-['Inter',Helvetica] text-black">
                  Indica, Swift
                </h3>

                <div className="flex items-center gap-[15px] mt-2">
                  <span className="font-normal text-xs text-neutral-600 font-['Inter',Helvetica]">
                    Hatchback
                  </span>
                  <span className="font-normal text-xs text-neutral-600 font-['Inter',Helvetica]">
                    AC
                  </span>
                  <span className="font-normal text-xs text-neutral-600 font-['Inter',Helvetica]">
                    4 Seats
                  </span>
                  <span className="font-normal text-xs text-neutral-600 font-['Inter',Helvetica]">
                    156 kms included
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <Badge className="bg-[#339f6c] text-white rounded-[3px] px-[5px] py-0.5 font-normal text-xs">
                  4/5
                </Badge>
                <span className="text-[#bababa] text-xs font-normal font-['Lato',Helvetica]">
                  156 reviews
                </span>
              </div>
            </div>

            {/* Car Features */}
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-[7px]">
                  <img
                    className="w-[18px] h-[18px]"
                    alt="Location icon"
                    src="/entypo-location.svg"
                  />
                  <span className="font-normal text-sm text-neutral-600 font-['Inter',Helvetica]">
                    Extra Kilometer Fare
                  </span>
                </div>
                <span className="font-normal text-sm text-neutral-600 font-['Inter',Helvetica]">
                  ₹11.5/km after 156 kms
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-[7px]">
                  <div className="bg-[url(/group-6.png)] w-4 h-4 bg-[100%_100%]" />
                  <span className="font-normal text-sm text-neutral-600 font-['Inter',Helvetica]">
                    Fuel Type
                  </span>
                </div>
                <span className="font-normal text-sm text-neutral-600 font-['Inter',Helvetica]">
                  CNG with refill breaks
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-end gap-[7px]">
                  <img
                    className="w-[18px] h-[3px]"
                    alt="Clock icon"
                    src="/mdi-clock-remove-outline.svg"
                  />
                  <span className="font-normal text-sm text-neutral-600 font-['Inter',Helvetica]">
                    Cancellation
                  </span>
                </div>
                <div className="font-normal text-sm font-['Inter',Helvetica]">
                  <span className="text-[#339f6c]">Free</span>
                  <span className="text-[#707070]">&nbsp;</span>
                  <span className="text-neutral-600">
                    till 1 hour of departure
                  </span>
                </div>
              </div>
            </div>

            {/* Price and Select Button */}
            <div className="flex justify-end items-center gap-4 mt-6">
              <span className="font-medium text-base text-black font-['Inter',Helvetica]">
                ₹ 23,000
              </span>
              <Button className="bg-[#8c6d73] text-white rounded-[5px] hover:bg-[#7a5e64]">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};