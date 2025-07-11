"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import Button from "../Button";
import Link from "next/link";
import { services } from "@/constants/servicesItems";

export default function ServiceAccordion() {
  const [openItem, setOpenItem] = useState<string | null>("bio-hazard");

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="flex flex-col gap-4 px-5 xl:px-0">
      {services?.map((service) => (
        <div
          key={service.id}
          className="rounded-md overflow-hidden border border-sky-200"
        >
          <button
            onClick={() => toggleItem(service.id)}
            className="flex items-center justify-between w-full p-4 text-left text-xl leading-normal bg-backgroundColor text-primaryColor hover:bg-sky-50 transition-colors"
          >
            <span>{service.title}</span>
            <Plus
              className={`h-8 w-8  transition-all duration-500 ease-in-out ${
                openItem === service.id
                  ? "rotate-[225deg] text-secondaryColor"
                  : ""
              }`}
            />
          </button>

          {openItem === service.id && (
            <div className="p-4 bg-backgroundColor">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-primaryColor text-2xl font-normal leading-normal">
                      {service.title}
                    </h3>
                    <p className="text-base font-bold text-textColor border-b border-dotted border-gray-300 pb-2">
                      {service.subtitle}
                    </p>
                    <p className="py-4 text-base text-textColor font-normal leading-normal ">
                      {service.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/other-services/service-details?type=${service.id}`}
                      className="text-secondaryColor text-base hover:underline"
                    >
                      Learn More
                    </Link>
                  </div>
                  <div>
                    <Button variant="primary">
                      <a href={`tel:${service.phone}`}>
                        Call For Quote {service.phone}
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={300}
                    height={200}
                    className="rounded-md object-cover"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
