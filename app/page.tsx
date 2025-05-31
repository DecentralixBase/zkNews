"use client";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TrendingBar from "./components/TrendingBar";
import NewsCard from "./components/NewsCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import { useEffect, useState } from "react";
import { fetchNews, NewsArticle, NewsCategory } from "@/utils/fetchNews";
import { Bookmark, Settings, LogIn } from "lucide-react";

export default function HomePage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCategory, setCurrentCategory] = useState<NewsCategory>('all');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchNews(currentCategory)
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      });
  }, [currentCategory]);

  const handleCategoryChange = (category: NewsCategory) => {
    setCurrentCategory(category);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navbar 
        onCategoryChange={handleCategoryChange}
        currentCategory={currentCategory}
      />
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Top Action Bar */}
        <div className="flex items-center justify-between px-4 py-3 glass mt-2 mx-2 rounded-xl">
          <div className="text-xl font-semibold text-white">zkNews</div>
          <div className="flex items-center gap-3">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              onClick={() => window.location.href = '/bookmarks'}
            >
              <Bookmark size={20} />
              <span className="hidden sm:inline">Bookmarks</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              onClick={() => window.location.href = '/settings'}
            >
              <Settings size={20} />
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold"
              onClick={() => window.location.href = '/login'}
            >
              <LogIn size={20} />
              <span className="hidden sm:inline">Login / Signup</span>
            </button>
          </div>
        </div>
        <Header hideWalletConnect />
        <TrendingBar />
        <main className="flex-1 p-2 sm:p-4 md:p-8 glass mt-4 mx-0 sm:mx-2 md:mx-8 max-w-3xl w-full mx-auto">
          {loading && (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          )}
          {error && <div className="text-center text-red-400 py-10">{error}</div>}
          {!loading && !error && news.length === 0 && (
            <div className="text-center text-lg text-gray-300 py-20">No news found for {currentCategory}.</div>
          )}
          {!loading && !error && news.map((article) => (
            <NewsCard
              key={article.url}
              {...article}
              bookmarked={false}
              onBookmark={() => window.location.href = '/login'}
            />
          ))}
        </main>
      </div>
    </div>
  );
} 