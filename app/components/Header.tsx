import { Search, Globe } from "lucide-react";

interface HeaderProps {
  hideWalletConnect?: boolean;
}

export default function Header({ hideWalletConnect }: HeaderProps) {
  return (
    <header className="w-full flex items-center justify-between glass px-4 py-3 mt-2 md:mt-4">
      <div className="flex items-center gap-2 w-full max-w-md">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search news, tokens, topics..."
          className="bg-transparent outline-none w-full text-white placeholder:text-gray-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <button className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-sm">
            <Globe size={16} /> EN
          </button>
          {/* Language dropdown (future) */}
        </div>
        {/* Wallet connect button removed */}
      </div>
    </header>
  );
} 