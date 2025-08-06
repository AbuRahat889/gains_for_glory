import DashboardNavbar from "@/components/Navbar/DashboardNavbar/DashboardNavbar";
import Navbar from "@/components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen gap-5">
        <ToastContainer />
        <DashboardNavbar />
        <div className="w-full overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
