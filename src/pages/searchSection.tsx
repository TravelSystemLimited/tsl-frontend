import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "lucide-react";
import React from "react";


export const SearchSection = (): JSX.Element => {
  // Vehicle data for easy maintenance and potential future mapping
  const vehicleData = {
    name: "Indica, Swift",
    image: "/cab2.png",
    rating: "4/5",
    reviews: 156,
    price: "₹ 23,000",
    specs: ["Hatchback", "AC", "4 Seats", "156 kms included"],
    details: [
      {
        icon: "/entypo-location.svg",
        label: "Extra Kilometer Fare",
        value: "₹11.5/km after 156 kms",
      },
      {
        icon: "/group-4.png",
        iconClass: "bg-[url(/group-4.png)] w-4 h-4 bg-[100%_100%]",
        label: "Fuel Type",
        value: "CNG with refill breaks",
      },
      {
        icon: "/mdi-clock-remove-outline.svg",
        label: "Cancellation",
        value: "Free till 1 hour of departure",
        valueClass: "text-transparent",
        valueSpans: [
          { text: "Free", class: "text-[#339f6c]" },
          { text: " ", class: "text-[#707070]" },
          { text: "till 1 hour of departure", class: "text-neutral-600" },
        ],
      },
    ],
  };

  return (
    <div className="w-full max-w-[633px] my-4">
      <Card className="relative w-full bg-white rounded-[10px] shadow-[0px_4px_29.6px_8px_#0000000a]">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            {/* Vehicle Image */}
            <div className="w-full md:w-[207px] h-[207px] m-[11px] bg-[#f2f2f2] rounded flex items-center justify-center">
              <img
                className="w-[90px] h-[90px]"
                alt="Suv"
                src={vehicleData.image}
              />
            </div>

            {/* Vehicle Details */}
            <div className="flex flex-col flex-1 p-4">
              <div className="flex items-center justify-between">
                <div className="font-bold text-xl font-['Inter',Helvetica]">
                  {vehicleData.name}
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[#339f6c] text-white text-xs font-normal rounded-[3px] px-[5px] py-0.5">
                    {vehicleData.rating}
                  </Badge>
                  <span className="text-xs text-[#bababa] font-['Lato',Helvetica]">
                    {vehicleData.reviews} reviews
                  </span>
                </div>
              </div>

              {/* Vehicle Specifications */}
              <div className="flex flex-wrap items-center gap-[15px] mt-2">
                {vehicleData.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="text-xs text-neutral-600 font-normal font-['Inter',Helvetica]"
                  >
                    {spec}
                  </div>
                ))}
              </div>

              {/* Vehicle Additional Details */}
              <div className="flex flex-col gap-4 mt-6">
                {vehicleData.details.map((detail, index) => (
                  <div key={index} className="flex items-center gap-[30px]">
                    <div className="flex items-center gap-[7px] min-w-[140px]">
                      {detail.iconClass ? (
                        <div className={detail.iconClass} />
                      ) : (
                        <img
                          className={
                            index === 2
                              ? "w-[18px] h-[3px]"
                              : "w-[18px] h-[18px]"
                          }
                          alt={detail.label}
                          src={detail.icon}
                        />
                      )}
                      <div className="text-sm text-neutral-600 font-normal font-['Inter',Helvetica]">
                        {detail.label}
                      </div>
                    </div>

                    {detail.valueSpans ? (
                      <div
                        className={`text-sm ${detail.valueClass} font-normal font-['Inter',Helvetica]`}
                      >
                        {detail.valueSpans.map((span, i) => (
                          <span key={i} className={span.class}>
                            {span.text}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm text-neutral-600 font-normal font-['Inter',Helvetica]">
                        {detail.value}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Price and Select Button */}
              <div className="flex items-center justify-end gap-4 mt-4">
                <div className="font-medium text-black text-base font-['Inter',Helvetica]">
                  {vehicleData.price}
                </div>
                <button className="bg-[#8c6d73] text-white rounded-[5px] hover:bg-[#7d6166]">
                  Select
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};