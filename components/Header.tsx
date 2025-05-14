'use client'
import Link from "next/link";
import { useState } from "react";
import AboutModal from "./AboutModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 3w-full h-16 bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 py-2 ">
        <div className="flex items-center justify-between "> 
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-white">
                Amazon Scraper
              </span>
            </Link>
          </div>

          <span
            onClick={() => setIsOpen(true)}
            className="px-3 py-2 rounded-md text-lg font-medium text-white hover:bg-blue-700 cursor-pointer"
          >
            About
          </span>
        </div>
      </div>
      <AboutModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
    </header>
  );
};

export default Header;
