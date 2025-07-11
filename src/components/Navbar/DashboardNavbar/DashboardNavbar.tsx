"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarSlider from "./NavbarSlider";

const DashboardNavbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const pathName = usePathname();

  const deviceResponsive = () => {
    const availWidth = window.innerWidth; // Use innerWidth for real viewport width
    if (availWidth <= 768) {
      setIsSidebarOpen(false); // Close sidebar on mobile
    } else {
      setIsSidebarOpen(true); // Open sidebar on larger screens
    }
  };

  // Set up the resize listener to trigger device responsiveness
  useEffect(() => {
    // Call it once on mount to set the correct state based on current screen size
    deviceResponsive();

    // Add event listener for resize events
    window.addEventListener("resize", deviceResponsive);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", deviceResponsive);
    };
  }, []);

  return (
    <div
      className={`${isSidebarOpen ? "w-[276px]" : "w-fit"} ${
        pathName == "/privacy-policy" ? "hidden" : "block"
      }`}
    >
      <div className="flex items-center justify-center">
        <NavbarSlider
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        ></NavbarSlider>
      </div>
    </div>
  );
};

export default DashboardNavbar;
