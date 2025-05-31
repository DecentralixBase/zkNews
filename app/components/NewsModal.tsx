import React from "react";
import { X } from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";

interface NewsModalProps {
  open: boolean;
  onClose: () => void;
  article: {
    thumbnail: string;
    source: string;
    headline: string;
    summary: string;
    url: string;
    tags: string[];
    publishedAt: string | Date;
  };
}

export default function NewsModal({ open, onClose, article }: NewsModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass max-w-lg w-full p-6 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 hover:bg-white/20"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <img
          src={article.thumbnail}
          alt={article.headline}
          className="w-full h-48 object-cover rounded-lg mb-4 border border-white/10"
        />
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
            {article.source}
          </span>
          <span className="text-xs text-gray-400">• {timeAgo(article.publishedAt)}</span>
        </div>
        <h2 className="font-poppins font-bold text-2xl mb-2 text-white">
          {article.headline}
        </h2>
        <p className="text-gray-200 mb-4 text-base">{article.summary}</p>
        <div className="flex gap-2 flex-wrap mb-4">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded-full font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-glass"
        >
          Read Full Article ↗
        </a>
      </div>
    </div>
  );
} 