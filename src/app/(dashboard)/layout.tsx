import DashboardNavbar from "@/components/Navbar/DashboardNavbar/DashboardNavbar";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <div className="flex max-h-screen">
        <ToastContainer />
        <DashboardNavbar />
        <div className="w-full overflow-y-auto">{children}</div>
      </div>
    </main>
  );
}
