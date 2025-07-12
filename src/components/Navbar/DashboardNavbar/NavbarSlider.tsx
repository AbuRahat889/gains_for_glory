"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Cookies from "js-cookie";
import { logout } from "@/redux/slices/authSlice";
import { FiMenu } from "react-icons/fi";
import { navigation } from "@/constants/Navigation";
import { useDispatch } from "react-redux";

// Sidebar Props
interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const NavbarSlider = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  // Function to open modal with specific content
  // const openModal = (content: string) => {
  //   setModalOpen(true);
  // };
  const handleLogOut = () => {
    dispatch(logout());
    Cookies.remove("token");
    router.push("/auth/login");
  };

  return (
    <div className="h-screen pt-6">
      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="m-4 p-2 text-black rounded-md bg-red-500 shadow-md z-[9999]"
      >
        {isOpen ? <IoClose size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Sidebar Content */}
      <aside
        className={`duration-300 flex flex-col justify-between h-[calc(100%-80px)] font-inter ${
          isOpen ? "w-[200px]" : "w-[70px]"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className={`flex flex-col ${isOpen ? "pt-6" : "pt-6"}`}>
            {/* Navigation */}
            <ul className="ml-6">
              {navigation?.map((item) => (
                <li key={item.route}>
                  <Link
                    href={item.route}
                    className={`flex items-center gap-2 p-4 mb-2 text-base hover:bg-primaryColor hover:text-white transition-colors duration-300 ease-in-out rounded-sm
                    ${
                      path === item.route
                        ? "bg-primaryColor text-white  text-primary "
                        : "text-[#747474]"
                    }`}
                  >
                    {path === item.route ? (
                      <p className="text-xl transition-colors ease-in-out duration-300">
                        {item.whiteIcon}
                      </p>
                    ) : (
                      <p className="text-xl">{item.iconPath}</p>
                    )}

                    {isOpen && <p className="text-sm">{item.label}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer to push logout to bottom */}
          <div className="flex-grow"></div>

          {/* Logout Button */}
          <div className="mt-auto p-4">
            <button
              onClick={handleLogOut}
              className="flex items-center justify-center gap-2 text-lg text-[#EF4444] hover:text-white hover:bg-red-600 transition-colors border-2 rounded-lg border-[#EF4444] px-3 py-2 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 16 16"
                fill="none"
              >
                <g clip-path="url(#clip0_614_4880)">
                  <path
                    d="M15.6387 0L11.3513 1.93872H4.42285V3.81324H5.36011V2.87598H10.9837V13.1858H5.36011V12.2486H4.42285V14.1231H11.3541L15.6387 16V0ZM14.7015 14.5662L11.9209 13.3481V2.70978L14.7015 1.45247V14.5662Z"
                    fill="currentColor"
                    className="hover:text-white"
                  />
                  <path
                    d="M0.361328 8.03127L5.36005 11.7803V9.43716H9.10909V6.62538H5.36005V4.28223L0.361328 8.03127ZM8.17183 7.56264V8.4999H4.42279V9.90579L1.92343 8.03127L4.42279 6.15675V7.56264H8.17183Z"
                    fill="currentColor"
                    className="hover:text-white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_614_4880">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              {isOpen && <span className="text-sm font-medium">Log out</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Modal */}
    </div>
  );
};

export default NavbarSlider;
