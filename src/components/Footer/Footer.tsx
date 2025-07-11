import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-[#f8f7f5] py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Logo Section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-24 h-24">
              <Image
                src={logo}
                alt="Glitzy Auto Spa Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Services Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[#1A9CB0] font-medium  text-xl mb-4">
              Services
            </h3>
            <div className="flex gap-3">
              <ul className="space-y-2  md:text-left">
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services">Interior & Exterior</Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services">Interior</Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services">Exterior</Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services">Boat & Yacht</Link>
                </li>
              </ul>

              <ul className="space-y-2  md:text-left">
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services">Motorcycle</Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/other-services/service-details?type=bio-hazard">
                    Bio-Hazard Removal
                  </Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/other-services/service-details?type=theft-recovery">
                    Theft Recovery
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Company Section */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[#1A9CB0] font-medium text-lg mb-4">Company</h3>
            <div className="flex gap-3">
              <ul className="space-y-2 md:text-left">
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services">Contact Us</Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/gift-card">Gift Cards</Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/blogs">Blogs</Link>
                </li>
              </ul>
              <ul className="space-y-2 md:text-left">
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services">About Us</Link>
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/services"></Link>
                  Careers
                </li>
                <li className="text-textColor hover:text-primaryColor  text-base">
                  <Link href="/resource-centers">Resource Center</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <h1 className="text-textColor hover:text-primaryColor hover:underline text-end  text-base">
          <Link href="/privacy-policy">Privacy & Terms of Use</Link>
        </h1>
      </div>
    </footer>
  );
}
