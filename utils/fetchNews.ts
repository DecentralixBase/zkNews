import axios from "axios";

export interface NewsArticle {
  thumbnail: string;
  source: string;
  headline: string;
  summary: string;
  url: string;
  tags: string[];
  publishedAt: string;
}

export type NewsCategory = 'all' | 'defi' | 'nft' | 'tokens' | 'airdrops' | 'regulations';

export async function fetchNews(category: NewsCategory = 'all'): Promise<NewsArticle[]> {
  const res = await axios.get(`/api/news?category=${category}`);
  return res.data.articles;
} 