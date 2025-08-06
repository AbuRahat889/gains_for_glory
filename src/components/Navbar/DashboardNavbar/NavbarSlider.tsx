"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { logout } from "@/redux/slices/authSlice";
import { FiMenu } from "react-icons/fi";
import { navigation } from "@/constants/Navigation";
import { useDispatch } from "react-redux";
import logo from "@/assets/logo.svg";
import Image from "next/image";

// Props
interface SidebarProps {
  isMobile: boolean;
  isDrawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const NavbarSlider = ({
  isMobile,
  isDrawerOpen,
  openDrawer,
  closeDrawer,
}: SidebarProps) => {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    Cookies.remove("token");
    router.push("/auth/login");
  };

  // Sidebar content
  const sidebarContent = (
    <aside className="w-[240px] mt-0 md:mt-32 h-full bg-white flex flex-col justify-between font-inter z-[999]">
      <div className="pt-6">
        <ul className="ml-6">
          {navigation?.map((item) => (
            <li key={item.route}>
              <Link
                href={item.route}
                onClick={() => isMobile && closeDrawer()}
                className={`flex items-center gap-2 p-4 mb-2 text-base hover:bg-primaryColor hover:text-white rounded-sm transition
                  ${
                    path === item.route
                      ? "bg-primaryColor text-white"
                      : "text-[#747474]"
                  }`}
              >
                <span className="text-xl">
                  {path === item.route ? item.whiteIcon : item.iconPath}
                </span>
                <span className="text-sm">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={handleLogOut}
          className="flex items-center justify-center gap-2 text-lg text-[#EF4444] hover:text-white hover:bg-red-600 transition border-2 rounded-lg border-[#EF4444] px-3 py-2 w-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M15.6387 0L11.3513 1.93872H4.42285V3.81324H5.36011V2.87598H10.9837V13.1858H5.36011V12.2486H4.42285V14.1231H11.3541L15.6387 16V0ZM14.7015 14.5662L11.9209 13.3481V2.70978L14.7015 1.45247V14.5662Z"
              fill="currentColor"
            />
            <path
              d="M0.361328 8.03127L5.36005 11.7803V9.43716H9.10909V6.62538H5.36005V4.28223L0.361328 8.03127ZM8.17183 7.56264V8.4999H4.42279V9.90579L1.92343 8.03127L4.42279 6.15675V7.56264H8.17183Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-sm font-medium">Log out</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      {isMobile && (
        <button
          onClick={openDrawer}
          className="absolute top-3 m-4 p-2 text-black rounded-md  z-[99]"
        >
          <FiMenu size={30} />
        </button>
      )}

      {/* Mobile Drawer */}
      {isMobile && isDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-[998]"
            onClick={closeDrawer}
          />
          {/* Drawer */}

          <div className="fixed top-0 left-0 h-full w-[260px] bg-white  z-[999] transition-transform transform translate-x-0">
            <div className="flex justify-between p-2">
              <Image
                src={logo}
                alt="Logo"
                className="object-contain "
                priority
              />
              <button onClick={closeDrawer}>
                <IoClose size={24} />
              </button>
            </div>
            {sidebarContent}
          </div>
        </>
      )}

      {/* Desktop Sidebar */}
      {!isMobile && sidebarContent}
    </>
  );
};

export default NavbarSlider;
