"use client";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import TrendingBar from "./components/TrendingBar";
import NewsCard from "./components/NewsCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import AuthModal from "./components/AuthModal";
import { useEffect, useState } from "react";
import { fetchNews, NewsArticle } from "@/utils/fetchNews";

export default function HomePage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    fetchNews()
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load news. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end">
      <Navbar />
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
          {loading && (
            <>
              <LoadingSkeleton />
              <LoadingSkeleton />
              <LoadingSkeleton />
            </>
          )}
          {error && <div className="text-center text-red-400 py-10">{error}</div>}
          {!loading && !error && news.length === 0 && (
            <div className="text-center text-lg text-gray-300 py-20">No news found.</div>
          )}
          {!loading && !error && news.map((article) => (
            <NewsCard
              key={article.url}
              {...article}
              bookmarked={false}
              onBookmark={() => {}}
            />
          ))}
        </main>
      </div>
    </div>
  );
} 