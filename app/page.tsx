"use client";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TrendingBar from "./components/TrendingBar";
import NewsCard from "./components/NewsCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import AuthModal from "./components/AuthModal";
import SettingsModal from "./components/SettingsModal";
import { useEffect, useState } from "react";
import { fetchNews, NewsArticle, NewsCategory } from "@/utils/fetchNews";

export default function HomePage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
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

  const handleShowAuth = () => {
    setShowAuth(true);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navbar 
        onCategoryChange={handleCategoryChange} 
        onShowAuth={handleShowAuth}
        onShowSettings={handleShowSettings}
        currentCategory={currentCategory}
      />
      <div className="flex-1 flex flex-col md:ml-64">
        <div className="flex items-center justify-end px-4 pt-4">
          <button
            onClick={() => setShowAuth(true)}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-glass text-sm"
          >
            Login / Signup
          </button>
        </div>
        <Header hideWalletConnect />
        <TrendingBar />
        <main className="flex-1 p-2 sm:p-4 md:p-8 glass mt-4 mx-0 sm:mx-2 md:mx-8 max-w-3xl w-full mx-auto">
          <AuthModal open={showAuth} onClose={() => setShowAuth(false)} />
          <SettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
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
              onBookmark={() => setShowAuth(true)}
            />
          ))}
        </main>
      </div>
    </div>
  );
} 