import React, { useState } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass max-w-xs w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="flex justify-center mb-4">
          <button
            className={`px-4 py-2 rounded-l-lg font-semibold ${tab === "login" ? "bg-blue-600 text-white" : "bg-white/10 text-blue-300"}`}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 rounded-r-lg font-semibold ${tab === "signup" ? "bg-blue-600 text-white" : "bg-white/10 text-blue-300"}`}
            onClick={() => setTab("signup")}
          >
            Signup
          </button>
        </div>
        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-2 rounded bg-white/10 text-white placeholder:text-gray-400 outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-2 rounded bg-white/10 text-white placeholder:text-gray-400 outline-none"
          />
          <button
            type="submit"
            className="mt-2 py-2 rounded bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-glass"
            disabled
          >
            {tab === "login" ? "Login" : "Signup"}
          </button>
        </form>
      </div>
    </div>
  );
} 