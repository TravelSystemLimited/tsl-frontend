import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import React from "react";
import { Button } from "react-day-picker";


export const CarListSection = (): JSX.Element => {
  const carDetails = {
    name: "Indica, Swift",
    rating: "4/5",
    reviews: "156 reviews",
    price: "₹ 23,000",
    specs: [
      { label: "Hatchback" },
      { label: "AC" },
      { label: "4 Seats" },
      { label: "156 kms included" },
    ],
    features: [
      {
        icon: "/entypo-location.svg",
        label: "Extra Kilometer Fare",
        value: "₹11.5/km after 156 kms",
      },
      {
        icon: "/group-3.png",
        iconClass: "w-4 h-4 bg-[url(/group-3.png)] bg-[100%_100%]",
        label: "Fuel Type",
        value: "CNG with refill breaks",
      },
      {
        icon: "/mdi-clock-remove-outline.svg",
        label: "Cancellation",
        value: "Free till 1 hour of departure",
        valueHighlight: true,
      },
    ],
  };

  return (
    <div className="w-full max-w-[633px] my-6">
      <Card className="relative w-full h-[270px] bg-white rounded-[10px] shadow-[0px_4px_29.6px_8px_#0000000a]">
        <CardContent className="p-0">
        <div
  className="absolute w-[207px] h-[207px] bg-no-repeat top-[11px] left-[11px] bg-[#f2f2f2] rounded object-contain"
  style={{ backgroundImage: `url("/cab4.png")` }}
>
</div>


          <div className="absolute top-[26px] left-[237px] font-bold text-black text-xl font-['Inter',Helvetica] tracking-[0] leading-[normal] whitespace-nowrap">
            {carDetails.name}
          </div>

          <Badge className="absolute top-7 left-[367px] bg-[#339f6c] text-white font-normal text-xs px-[5px] py-0.5 rounded-[3px]">
            {carDetails.rating}
          </Badge>

          <div className="absolute top-[31px] left-[402px] font-normal text-[#bababa] text-xs font-['Lato',Helvetica] tracking-[0] leading-[normal] whitespace-nowrap">
            {carDetails.reviews}
          </div>

          <div className="inline-flex items-center gap-[15px] absolute top-[61px] left-[237px]">
            {carDetails.specs.map((spec, index) => (
              <div
                key={index}
                className="font-normal text-neutral-600 text-xs font-['Inter',Helvetica] tracking-[0] leading-[normal]"
              >
                {spec.label}
              </div>
            ))}
          </div>

          <div className="flex flex-col w-[377px] items-start gap-4 absolute top-[97px] left-[234px]">
            {carDetails.features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center ${index === 1 ? "gap-[100px]" : index === 2 ? "gap-[82px] self-stretch w-full" : "gap-[30px]"}`}
              >
                <div className="inline-flex items-end gap-[7px]">
                  {feature.iconClass ? (
                    <div className={feature.iconClass} />
                  ) : (
                    <img
                      className="w-[18px] h-[18px]"
                      alt={feature.label}
                      src={feature.icon}
                    />
                  )}
                  <div className="font-normal text-neutral-600 text-sm font-['Inter',Helvetica] tracking-[0] leading-[normal]">
                    {feature.label}
                  </div>
                </div>

                {feature.valueHighlight ? (
                  <div className="w-[188px] font-normal text-sm font-['Inter',Helvetica] tracking-[0] leading-[normal]">
                    <span className="text-[#339f6c]">Free</span>
                    <span className="text-[#707070]">&nbsp;</span>
                    <span className="text-neutral-600">
                      till 1 hour of departure
                    </span>
                  </div>
                ) : (
                  <div className="font-normal text-neutral-600 text-sm font-['Inter',Helvetica] tracking-[0] leading-[normal]">
                    {feature.value}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="absolute top-[222px] left-[402px] font-medium text-black text-base whitespace-nowrap font-['Inter',Helvetica] tracking-[0] leading-[normal]">
            {carDetails.price}
          </div>

          <Button className="absolute top-[212px] left-[483px] bg-[#8c6d73] text-white font-normal text-base rounded-[5px] w-[124px] h-[40px]">
            Select
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};