import Image from "next/image";
import Link from "next/link";
import menuImage from "@/assets/menu.png";

export default function MegaMenu() {
  return (
    <div className="relative w-full bg-white shadow-sm border-t border-gray-100">
      {/* Decorative Elements */}
      <div className="absolute left-5 top-20">
        <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
      </div>
      <div className="absolute left-36 top-28">
        <div className="w-3 h-3 bg-cyan-500 rounded-full opacity-70"></div>
      </div>
      <div className="absolute left-24 bottom-12">
        <div className="w-5 h-5 bg-cyan-500 rounded-full"></div>
      </div>
      <div className="absolute right-24 top-16">
        <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
      </div>
      <div className="absolute right-[30%] top-48">
        <div className="w-8 h-8 bg-cyan-500 rounded-full"></div>
      </div>
      <div className="absolute right-[31%] top-48">
        <div className="w-8 h-8 bg-cyan-500 rounded-full"></div>
      </div>
      <div className="absolute right-48 bottom-16">
        <div className="w-5 h-5 bg-cyan-500 rounded-full"></div>
      </div>
      <div className="absolute right-16 bottom-28">
        <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
      </div>

      {/* Mega Menu Content */}
      <div className="max-w-full lg:max-w-6xl mx-auto px-4 py-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Auto Detailing Section */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <Image
                src={menuImage}
                alt="Car detailing"
                width={200}
                height={150}
                className="rounded-md object-cover w-full h-full"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-cyan-500 font-medium mb-4">Auto Detailing</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services"
                    className="text-gray-700 hover:text-cyan-600"
                  >
                    Car/SUV/Trucks
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-700 hover:text-cyan-600"
                  >
                    Boat & Yaris
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-gray-700 hover:text-cyan-600"
                  >
                    Motorcycle
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Other Services Section */}
          <div className="space-y-4">
            <Link
              href={"/other-services"}
              className="text-cyan-500 font-medium "
            >
              Other Services
            </Link>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/other-services/service-details?type=theft-recovery"
                  className="text-gray-700 hover:text-cyan-600"
                >
                  Theft Recovery
                </Link>
              </li>
              <li>
                <Link
                  href="/other-services/service-details?type=bio-hazard"
                  className="text-gray-700 hover:text-cyan-600"
                >
                  Bio Hazard
                </Link>
              </li>
              <li>
                <Link
                  href="/other-services/service-details?type=stage-one"
                  className="text-gray-700 hover:text-cyan-600"
                >
                  Paint Correction
                </Link>
              </li>
              <li>
                <Link
                  href="/other-services/service-details?type=ceramic-coating"
                  className="text-gray-700 hover:text-cyan-600"
                >
                  Ceramic Coating
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
