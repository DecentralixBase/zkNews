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

export async function fetchNews(): Promise<NewsArticle[]> {
  const res = await axios.get("/api/news");
  return res.data.articles;
} 