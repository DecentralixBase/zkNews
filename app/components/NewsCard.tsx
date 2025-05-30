import { Bookmark, BookMarked, Image as ImageIcon } from "lucide-react";
import { timeAgo } from "@/utils/timeAgo";
import Image from "next/image";
import { useState } from "react";

interface NewsCardProps {
  thumbnail: string;
  source: string;
  headline: string;
  summary: string;
  tags: string[];
  publishedAt: string | Date;
  bookmarked: boolean;
  onBookmark: () => void;
}

export default function NewsCard({
  thumbnail,
  source,
  headline,
  summary,
  tags,
  publishedAt,
  bookmarked,
  onBookmark,
}: NewsCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="glass flex flex-col md:flex-row gap-4 p-3 sm:p-4 rounded-xl mb-4 hover:shadow-lg transition-shadow w-full">
      <div className="relative w-full md:w-24 h-40 md:h-24 rounded-lg border border-white/10 mb-2 md:mb-0 overflow-hidden">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center bg-white/5">
            <ImageIcon size={24} className="text-gray-400" />
          </div>
        ) : (
          <Image
            src={thumbnail}
            alt={headline}
            fill
            className="object-cover"
            onError={handleImageError}
            sizes="(max-width: 768px) 100vw, 96px"
          />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-blue-400 font-semibold uppercase tracking-wide">
              {source}
            </span>
            <span className="text-xs text-gray-400">• {timeAgo(publishedAt)}</span>
          </div>
          <h3 className="font-poppins font-semibold text-base sm:text-lg text-white mb-1 line-clamp-2">
            {headline}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-2 mb-2">{summary}</p>
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-900/40 text-blue-300 text-xs px-2 py-0.5 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={onBookmark}
          className="ml-auto mt-2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {bookmarked ? <BookMarked size={18} /> : <Bookmark size={18} />}
        </button>
      </div>
    </div>
  );
} 