"use client";
import { Home, Layers, Bookmark, Settings, ChevronDown, Zap, Menu, X, Coins, Gift, Scale } from "lucide-react";
import React, { useState } from "react";
import { type NewsCategory } from "@/utils/fetchNews";

interface NavbarProps {
  onCategoryChange: (category: NewsCategory) => void;
  onShowAuth: () => void;
  onShowSettings: () => void;
  currentCategory: NewsCategory;
}

const categories = [
  { name: "all" as const, label: "All News", icon: <Layers size={18} /> },
  { name: "defi" as const, label: "DeFi", icon: <Zap size={18} /> },
  { name: "nft" as const, label: "NFTs", icon: <Layers size={18} /> },
  { name: "tokens" as const, label: "Tokens", icon: <Coins size={18} /> },
  { name: "airdrops" as const, label: "Airdrops", icon: <Gift size={18} /> },
  { name: "regulations" as const, label: "Regulations", icon: <Scale size={18} /> },
];

export default function Navbar({ onCategoryChange, onShowAuth, onShowSettings, currentCategory }: NavbarProps) {
  const [showCategories, setShowCategories] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleCategoryClick = (category: NewsCategory) => {
    onCategoryChange(category);
    setDrawerOpen(false);
  };

  const handleBookmarkClick = () => {
    onShowAuth();
    setDrawerOpen(false);
  };

  const handleSettingsClick = () => {
    onShowSettings();
    setDrawerOpen(false);
  };

  const navLinks = (
    <ul className="space-y-2">
      <li 
        className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer ${currentCategory === 'all' ? 'bg-white/20' : ''}`}
        onClick={() => handleCategoryClick('all')}
      >
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
            {categories.slice(1).map((cat) => (
              <li 
                key={cat.name} 
                className={`flex items-center gap-2 p-1 rounded hover:bg-white/10 cursor-pointer text-sm ${currentCategory === cat.name ? 'bg-white/20' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                {cat.icon} {cat.label}
              </li>
            ))}
          </ul>
        )}
      </li>
      <li 
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
        onClick={handleBookmarkClick}
      >
        <Bookmark size={20} /> Bookmarked
      </li>
      <li 
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 cursor-pointer"
        onClick={handleSettingsClick}
      >
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