"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, ListIcon, BarChartIcon, SettingsIcon } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Transactions", href: "/transactions", icon: ListIcon },
    { name: "Analytics", href: "/analytics", icon: BarChartIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl dark:bg-gray-900">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full ${
                isActive
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <IconComponent
                size={24}
                className={isActive ? "animate-pulse" : ""}
              />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
