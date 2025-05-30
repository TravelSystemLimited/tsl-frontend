import { Card, CardContent } from "@/components/ui/card";
import { Badge, ClockIcon, MapPinIcon } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";


export const CancellationInfoSection = (): JSX.Element => {
  const carDetails = {
    name: "Indica, Swift",
    rating: "4/5",
    reviews: "156 reviews",
    price: "₹ 23,000",
    type: "Hatchback",
    features: ["AC", "4 Seats", "156 kms included"],
    extraInfo: [
      {
        icon: <MapPinIcon size={18} />,
        label: "Extra Kilometer Fare",
        value: "₹11.5/km after 156 kms",
      },
      {
        icon: <div className="bg-[url(/group-5.png)] w-4 h-4 bg-[100%_100%]" />,
        label: "Fuel Type",
        value: "CNG with refill breaks",
      },
      {
        icon: <ClockIcon size={18} />,
        label: "Cancellation",
        value: (
          <span>
            <span className="text-[#339f6c]">Free</span> till 1 hour of
            departure
          </span>
        ),
      },
    ],
  };

  return (
    <div className="w-full max-w-[633px] my-4">
      <Card className="w-full shadow-[0px_4px_29.6px_8px_#0000000a] rounded-[10px]">
        <CardContent className="p-0 flex">
          <div className="w-[207px] h-[207px] m-[11px] bg-[#f2f2f2] rounded flex items-center justify-center">
            <img className="w-[90px] h-[90px]" alt="Suv" src="/cab3.png" />
          </div>

          <div className="flex flex-col flex-1 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xl font-['Inter',Helvetica]">
                {carDetails.name}
              </h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-[#339f6c] text-white rounded-[3px] px-[5px] py-0.5 text-xs font-normal">
                  {carDetails.rating}
                </Badge>
                <span className="text-[#bababa] text-xs font-normal font-['Lato',Helvetica]">
                  {carDetails.reviews}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-[15px] mt-3">
              {[carDetails.type, ...carDetails.features].map((item, index) => (
                <span
                  key={index}
                  className="text-neutral-600 text-xs font-normal font-['Inter',Helvetica]"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {carDetails.extraInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-[30px]">
                  <div className="flex items-center gap-[7px]">
                    {info.icon}
                    <span className="text-neutral-600 text-sm font-normal font-['Inter',Helvetica]">
                      {info.label}
                    </span>
                  </div>
                  <div className="text-neutral-600 text-sm font-normal font-['Inter',Helvetica]">
                    {info.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-4 mt-auto">
              <span className="font-medium text-black text-base font-['Inter',Helvetica]">
                {carDetails.price}
              </span>
              <Button className="bg-[#8c6d73] hover:bg-[#7d6166] text-white rounded-[5px] px-4 py-2">
                Select
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};