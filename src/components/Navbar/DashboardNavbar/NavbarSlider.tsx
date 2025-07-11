"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IoClose, IoLogOut } from "react-icons/io5";
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
    router.push("/sign-in");
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
                      <p className="text-xl transition-colors ease-in-out duration-300">{item.whiteIcon}</p>
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
              className="flex items-center justify-center gap-2 text-[#EF4444] hover:text-red-400 transition-colors border rounded-lg border-[#EF4444] px-6 py-2 hover:bg-[#EF444433] w-full"
            >
              <IoLogOut size={18} />
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
