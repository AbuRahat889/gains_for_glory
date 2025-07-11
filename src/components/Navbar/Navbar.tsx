"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../Button";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import logo from "@/assets/logo.svg";
import TopNavbar from "./TopNavbar";
import MegaMenu from "./MegaMenu";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setVisible(false); // Hide navbar when scrolling down
      } else {
        setVisible(true); // Show navbar when scrolling up
      }

      setScrolled(currentScrollY > 50); // Apply background and shadow effect
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleLogOut = () => {
    dispatch(logout());
    Cookies.remove("token");
    localStorage.clear();
    router.push("/");
  };
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ease-in-out transform ${
        scrolled ? "bg-white shadow-md py-2" : "bg-[#F7F5F2] shadow-sm"
      } ${
        visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div
        className={` ${
          scrolled ? "hidden" : ""
        } w-full transition-all duration-500 ease-in-out`}
      >
        <TopNavbar />
      </div>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-5 lg:px-0">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative w-12 h-12">
            <Image
              src={logo}
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/services"
            className="text-[#99A1AF] text-xl hover:text-[#13A0C6]"
          >
            Auto Detailing
          </Link>

          <div className="relative group">
            {/* Spa Memberships Link */}
            <Link
              href="/other-services"
              className="text-[#99A1AF] text-xl hover:text-[#13A0C6] cursor-pointer"
            >
              Other Services
            </Link>

            {/* MegaMenu shows on hover */}
            <div className="absolute top-6 hidden group-hover:block w-[1024px] z-50 transition-all duration-300 ease-in-out">
              <MegaMenu />
            </div>
          </div>

          <Link
            href="/gift-card"
            className="text-[#99A1AF] text-xl hover:text-[#13A0C6]"
          >
            Gift Cards
          </Link>
          <Link
            href="/blogs"
            className="text-[#99A1AF] text-xl hover:text-[#13A0C6]"
          >
            Blogs
          </Link>

          {user && user?.role === "SUPERADMIN" && (
            <Link
              href="/dashboard"
              className="text-[#99A1AF] text-xl hover:text-[#13A0C6]"
            >
              Dashboard
            </Link>
          )}
        </div>

        {/* Right Side Icons */}
        <div className="flex  items-center space-x-4">
          {/* <Link href="/">
            <HiOutlineShoppingBag className="size-7 text-[#13A0C6]" />
          </Link> */}
          <Button
            link={"/services"}
            variant="primary"
            className="hidden lg:block"
          >
            {" "}
            Reserve Now
          </Button>

          {user && user ? (
            <Button
              onClick={handleLogOut}
              variant="ghost"
              className="hidden lg:block"
            >
              {" "}
              Log out
            </Button>
          ) : (
            <Button
              link={"/sign-in"}
              variant="ghost"
              className="hidden lg:block"
            >
              {" "}
              Login
            </Button>
          )}

          {/* <Link href="/">
            <IoSearchOutline className="size-7 text-[#13A0C6]" />
          </Link> */}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-600 hover:text-gray-900"
            onClick={toggleMenu}
          >
            <HiOutlineBars3CenterLeft className="size-7 text-[#13A0C6]  rotate-180" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="block lg:hidden mt-4 pb-4">
          <div className="flex flex-col space-y-4 px-4">
            <Link
              href="/services"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Auto Detailing
            </Link>
            <div className="relative group">
              {/* Spa Memberships Link */}
              <Link
                href="/other-services"
                className="text-[#99A1AF] text-xl hover:text-[#13A0C6] cursor-pointer"
              >
                Other Services
              </Link>
            </div>
            <Link
              href="/gift-card"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Gift Cards
            </Link>
            <Link
              href="/blogs"
              className="text-gray-600 hover:text-gray-900 py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Blogs
            </Link>
            <Button
              link={"/services"}
              variant="primary"
              className="block lg:hidden"
            >
              {" "}
              Reserve Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
