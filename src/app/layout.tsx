import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finux - Personal Finance Dashboard",
  description: "Track your personal finances with a beautiful dashboard",
  themeColor: "#1c1c1c",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#1c1c1c] text-gray-100`}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 pb-20">{children}</main>
          <Navigation />
        </div>
      </body>
    </html>
  );
}
