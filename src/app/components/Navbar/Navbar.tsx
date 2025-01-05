"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    { path: "/", label: "Home" },
    { path: "/news", label: "News" },
    { path: "/finance", label: "Finance" },
    { path: "/weather", label: "Weather" },
  ];

  return (
    <header className="bg-gray-600 w-full shadow-md">
      <div className="flex items-center justify-between px-6 py-4 h-16">
      
        <div className="text-xl font-bold text-white">
          {routes.find((route) => route.path === pathname)?.label ||
            "Dashboard"}
        </div>
 
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
 
      {isMobileMenuOpen && (
        <nav className="flex flex-col   gap-2 bg-gray-700 px-6 py-4 md:hidden">
          {routes.map(({ path, label }) => (
            <Link
              key={path}
              href={path}
              className={`block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === path
                  ? "bg-blue-500 text-white"
                  : "text-gray-300 hover:bg-gray-600 hover:text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
