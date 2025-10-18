"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 py-6 transition-all duration-300`}>
      <div className={`max-w-6xl mx-auto transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border rounded-2xl px-6 py-3' 
          : 'px-6 py-3 rounded-2xl'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-semibold tracking-tight text-gray-900">Cerkle</div>
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                <span className="text-sm font-medium">Solutions</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">Enterprise</span>
              <div className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                <span className="text-sm font-medium">Developer</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <div className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">
                <span className="text-sm font-medium">Resources</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-gray-600 hover:text-gray-900 cursor-pointer transition-colors">Pricing</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="text-sm cursor-pointer font-medium text-gray-600 hover:text-gray-900 transition-colors px-3 py-2">
              Sign in
            </button>
            <button className="bg-[#065F46] text-white cursor-pointer text-sm font-medium px-4 py-2 rounded-full hover:bg-[#065F46]/80 transition-colors">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
