import ReduxProvider from "@/redux/provider/ReduxProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "gains_for_glory",
  description: "Extensive Workout Libraries",
};

// Bellota

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${poppins.variable} antialiased`}>
        <ReduxProvider>
          <div className="">{children}</div>
        </ReduxProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
