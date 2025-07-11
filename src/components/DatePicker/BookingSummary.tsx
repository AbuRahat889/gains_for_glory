"use client";

import Image from "next/image";
import { Clock, CreditCard, Calendar } from "lucide-react";
import car from "@/assets/car.png";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BookingSummary({
  selectedTime,
  selectedDate,
}: {
  selectedTime: string | null;
  selectedDate: Date | null;
}) {
  const pathname = usePathname();



  const service = JSON.parse(localStorage.getItem("service") || "null");
  const category = JSON.parse(localStorage.getItem("category") || "null");
  const serviceAmount = JSON.parse(
    localStorage.getItem("serviceAmount") || "0"
  );

  return (
    <div className="px-5 lg:px-0">
      <div className=" bg-white rounded-lg shadow-md w-full lg:w-[350px] ">
        <div className="p-6">
          <h2 className="text-2xl font-medium mb-8">Booking Summary</h2>

          <div className="mb-6">
            <div className="">
              <Image
                src={car}
                alt="White BMW Coupe"
                height={500}
                width={500}
                className="w-60"
              />
            </div>

            <div className="">
              <p className=" text-xl text-gray-700">{service}</p>
              <p className="text-gray-500 text-base">{category}</p>
            </div>
          </div>
        </div>

        <div className="flex">
          <div className=" px-6 py-4 flex items-center">
            <Clock className="w-6 h-6 text-gray-800 mr-4" />
            <span className="text-gray-700">2 hours</span>
          </div>

          <div className=" px-6 py-4 flex items-center">
            <CreditCard className="w-6 h-6 text-gray-800 mr-4" />
            <span className="text-gray-700">${serviceAmount}</span>
          </div>
        </div>
      </div>

      <>
          <div className="border-t border-gray-200 py-4 w-full">
            <div className="flex items-center mb-4">
              <Calendar className="w-6 h-6 text-gray-800 mr-4" />
              <span className="text-gray-700 flex items-center justify-center gap-5">
                <div>
                  {selectedDate &&
                    new Date(selectedDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </div>
                <div>{selectedTime}</div>
              </span>
            </div>

            <div className="bg-[#d05353] text-white text-center py-2 px-4 rounded-md">
              Estimated Arrival time {selectedTime}
            </div>
          </div>

          {pathname !== "/booking" && (
            <div className=" border-t-2 border-gray-200">
              <button className="w-full bg-[#0099cc] text-white py-3 rounded-md font-medium hover:bg-[#007ea8] transition-colors">
                <Link href={"/booking"}>Continue</Link>
              </button>
            </div>
          )}
        </>
    </div>
  );
}
