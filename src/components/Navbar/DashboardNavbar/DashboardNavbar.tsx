"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import NavbarSlider from "./NavbarSlider";

const DashboardNavbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathName = usePathname();

  // Check if the device is mobile
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Hide sidebar on specific route
  if (pathName === "/privacy-policy") return null;

  return (
    <div>
      <NavbarSlider
        isMobile={isMobile}
        isDrawerOpen={isDrawerOpen}
        openDrawer={() => setIsDrawerOpen(true)}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};

export default DashboardNavbar;
