import serviceImage from "@/assets/otherService.png";
import { StaticImageData } from "next/image";

// Define the ServiceItem type
interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string | StaticImageData ;
  phone: string;
}


export const services: ServiceItem[] = [
  {
    id: "theft-recovery",
    title: "Theft Recovery",
    subtitle: "Professional Restoration Services",
    description:
      "Our theft recovery service helps restore vehicles that have been damaged during theft. We provide comprehensive cleaning and repair to return your vehicle to its pre-theft condition.",
    image: serviceImage,
    phone: "(206) 271-7903",
  },
  {
    id: "bio-hazard",
    title: "Bio-Hazard",
    subtitle: "Advanced Containment & Safety Process",
    description:
      "A biohazard-contaminated vehicle isn't just dirty - it's a serious health risk. Exposure to blood, bodily fluids, bacteria,molds, rodent infestations, or hazardous waste can lead to dangerous infections and longterm contamination if not properly addressed.",
    image: serviceImage,
    phone: "(206) 271-7903",
  },
  {
    id: "stage-one",
    title: "Paint Correction",
    subtitle: "Professional Paint Restoration",
    description:
      "Our paint correction service removes swirls, scratches, and imperfections from your vehicle's paint, restoring its original shine and luster.",
    image: serviceImage,
    phone: "(206) 271-7903",
  },
  {
    id: "ceramic-coating",
    title: "Ceramic Coating",
    subtitle: "Long-lasting Protection",
    description:
      "Our ceramic coating provides a durable, protective layer that shields your vehicle's paint from environmental damage and makes cleaning easier.",
    image: serviceImage,
    phone: "(206) 271-7903",
  },
];
