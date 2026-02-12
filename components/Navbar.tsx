import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b-4 border-black sticky top-0 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="group flex flex-col items-start">
              <span className="font-serif text-3xl font-black tracking-tighter text-black group-hover:text-red-700 transition-colors">
                SENTINEL
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 -mt-1">
                Global Intelligence
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={`text-sm font-bold uppercase tracking-wider hover:text-red-700 ${isActive('/') ? 'text-black' : 'text-gray-500'}`}>
              Top Stories
            </Link>
            <Link to="/tech" className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-red-700">
              Technology
            </Link>
            <Link to="/markets" className="text-sm font-bold uppercase tracking-wider text-gray-500 hover:text-red-700">
              Markets
            </Link>
            <div className="h-4 w-px bg-gray-300 mx-2"></div>
            <Link to="/login" className={`text-sm font-bold uppercase tracking-wider hover:text-red-700 ${isActive('/login') ? 'text-black' : 'text-gray-500'}`}>
              Account
            </Link>
          </div>
          
          {/* Mobile Menu Icon (Visual Only) */}
          <div className="md:hidden flex items-center">
             <button className="text-gray-500 hover:text-black focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
             </button>
          </div>
        </div>
      </div>
      {/* Sub-header ticker */}
      <div className="bg-gray-100 border-b border-gray-200 py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between text-xs font-sans text-gray-600">
          <span><strong className="text-black">TRENDING:</strong> AI Regulation Bill Passes Senate • Quantum Computing Breakthrough • Cyber Sentinel Report</span>
          <span className="font-mono">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </nav>
  );
};