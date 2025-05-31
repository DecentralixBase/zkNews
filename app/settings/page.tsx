"use client";
import { useState } from "react";
import { ArrowLeft, Moon, Sun, Bell, Globe } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <div className="max-w-3xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-8">
          <a 
            href="/"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft size={20} />
          </a>
          <h1 className="text-2xl font-semibold">Settings</h1>
        </div>

        <div className="glass p-6 rounded-xl space-y-8">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon size={24} /> : <Sun size={24} />}
              <div>
                <h3 className="font-medium text-lg">Dark Mode</h3>
                <p className="text-sm text-gray-400">Adjust the appearance of zkNews</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-14 h-7 rounded-full relative ${darkMode ? 'bg-blue-600' : 'bg-gray-400'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${darkMode ? 'left-8' : 'left-1'}`} />
            </button>
          </div>

          {/* Notifications Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell size={24} />
              <div>
                <h3 className="font-medium text-lg">Notifications</h3>
                <p className="text-sm text-gray-400">Get notified about important updates</p>
              </div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-14 h-7 rounded-full relative ${notifications ? 'bg-blue-600' : 'bg-gray-400'}`}
            >
              <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform ${notifications ? 'left-8' : 'left-1'}`} />
            </button>
          </div>

          {/* Language Selection */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe size={24} />
              <div>
                <h3 className="font-medium text-lg">Language</h3>
                <p className="text-sm text-gray-400">Choose your preferred language</p>
              </div>
            </div>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-white/10 rounded px-4 py-2 outline-none text-lg"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>

        <div className="glass mt-6 p-6 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">About zkNews</h2>
          <div className="space-y-2 text-gray-400">
            <p>Version 1.0.0</p>
            <p>© 2024 zkNews. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 