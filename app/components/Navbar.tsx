"use client";
import { Home, Layers, Bookmark, Settings, ChevronDown, Zap, Menu, X } from "lucide-react";
import React, { useState } from "react";

const categories = [
  { name: "DeFi", icon: <Zap size={18} /> },
  { name: "NFTs", icon: <Layers size={18} /> },
  { name: "Tokens", icon: <Layers size={18} /> },
  { name: "Airdrops", icon: <Layers size={18} /> },
  { name: "Regulations", icon: <Layers size={18} /> },
];

export default function Navbar() {
  const [showCategories, setShowCategories] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = (
    <ul className="space-y-2">
      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
        <Home size={20} /> Home
      </li>
      <li>
        <div
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer select-none"
          onClick={() => setShowCategories((v) => !v)}
        >
          <Layers size={20} />
          Categories
          <ChevronDown size={16} className={`ml-auto transition-transform ${showCategories ? "rotate-180" : ""}`} />
        </div>
        {showCategories && (
          <ul className="ml-7 mt-1 space-y-1">
            {categories.map((cat) => (
              <li key={cat.name} className="flex items-center gap-2 p-1 rounded hover:bg-white/10 cursor-pointer text-sm">
                {cat.icon} {cat.name}
              </li>
            ))}
          </ul>
        )}
      </li>
      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
        <Bookmark size={20} /> Bookmarked
      </li>
      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer">
        <Settings size={20} /> Settings
      </li>
    </ul>
  );

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 glass w-full fixed top-0 left-0 z-30">
        <div className="text-xl font-poppins font-bold tracking-wide text-white">zkNews</div>
        <button onClick={() => setDrawerOpen(true)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
          <Menu size={24} />
        </button>
      </div>
      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm flex">
          <nav className="w-64 bg-glass h-full p-6 flex flex-col border-r border-white/10 animate-slide-in-left">
            <div className="flex items-center justify-between mb-10">
              <div className="text-2xl font-poppins font-bold tracking-wide text-white">zkNews</div>
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
                <X size={24} />
              </button>
            </div>
            {navLinks}
            <div className="mt-auto text-xs text-gray-400 pt-10">© 2024 zkNews</div>
          </nav>
          <div className="flex-1" onClick={() => setDrawerOpen(false)} />
        </div>
      )}
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 z-20 glass p-6 border-r border-white/10">
        <div className="text-2xl font-poppins font-bold mb-10 tracking-wide text-white">
          zkNews
        </div>
        {navLinks}
        <div className="mt-auto text-xs text-gray-400 pt-10">© 2024 zkNews</div>
      </nav>
      {/* Spacer for mobile topbar */}
      <div className="md:hidden h-14" />
    </>
  );
} 