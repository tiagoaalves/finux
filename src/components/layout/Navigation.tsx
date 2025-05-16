"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListFilter, BarChart3, Settings } from "lucide-react";

const Navigation = () => {
  const pathname = usePathname();
  const navItems = [
    { name: "Home", href: "/dashboard", icon: Home },
    { name: "Transactions", href: "/transactions", icon: ListFilter },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-700 bg-gray-900">
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative flex flex-col items-center justify-center w-full h-full"
              >
                <div
                  className={`flex flex-col items-center ${
                    isActive
                      ? "text-indigo-500"
                      : "text-gray-500 hover:text-gray-300 transition-colors"
                  }`}
                >
                  <div className="relative">
                    <IconComponent size={22} strokeWidth={1.75} />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full" />
                    )}
                  </div>
                  <span className="text-xs mt-1 font-medium">{item.name}</span>
                </div>
                {isActive && (
                  <div className="absolute -top-3 w-12 h-1 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
