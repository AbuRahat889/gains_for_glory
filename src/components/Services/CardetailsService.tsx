import React from "react";
import Image, { StaticImageData } from "next/image";

import coup from "@/assets/service/coupe.png";
import ltruck from "@/assets/service/large_truck.png";
import yacht from "@/assets/service/yacht.png";
import sedan from "@/assets/service/Sedan.png";
import motorcycle from "@/assets/service/motorcycle.png";
import Link from "next/link";
import placeholder from "@/assets/placeholder.webp";
interface VehicleTypeProps {
  name: string;
  image: string | StaticImageData;
}

function VehicleType({ name, image }: VehicleTypeProps) {
  return (
    <div className="flex flex-col items-center">
      <Link href={`/work-on?vehicle=${name}`}>
        <div className="w-24 h-24 md:w-40 md:h-40 rounded-full border-[5px] border-cyan-500 flex items-center justify-center p-2 hover:border-cyan-600 transition-colors">
          <div className="relative w-full h-full">
            <Image
              src={image || placeholder}
              alt={name}
              fill
              className="object-contain p-2"
            />
          </div>
        </div>
      </Link>
      <span className="text-textColor text-xl mt-7 text-center">{name}</span>
    </div>
  );
}

export default function CardetailsService() {
  return (
    <div className="bg-backgroundColor py-8">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-center text-primaryColor text-2xl font-light mb-10">
          What should we detail?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {/* Vehicle types - first row */}
          <VehicleType name="Coupe" image={coup} />
          <VehicleType name="Sedan" image={sedan} />
          <VehicleType name="Small SUV/Truck" image={ltruck} />
          <VehicleType name="Large SUV/Truck" image={ltruck} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {/* Vehicle types - second row */}
          <div className="md:col-start-2">
            <VehicleType name="Motorcycle" image={motorcycle} />
          </div>
          <div>
            <VehicleType name="Boat/Yacht" image={yacht} />
          </div>
        </div>
      </div>
    </div>
  );
}
