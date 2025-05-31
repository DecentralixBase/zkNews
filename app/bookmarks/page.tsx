"use client";
import { ArrowLeft } from "lucide-react";
import NewsCard from "../components/NewsCard";
import { NewsArticle } from "@/utils/fetchNews";

export default function BookmarksPage() {
  // This would normally be fetched from an API
  const bookmarkedNews: NewsArticle[] = [];

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
          <h1 className="text-2xl font-semibold">Bookmarked News</h1>
        </div>

        <div className="glass p-6 rounded-xl">
          {bookmarkedNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-400 mb-4">No bookmarked news yet</p>
              <a 
                href="/" 
                className="inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
              >
                Browse News
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {bookmarkedNews.map((article) => (
                <NewsCard
                  key={article.url}
                  {...article}
                  bookmarked={true}
                  onBookmark={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 