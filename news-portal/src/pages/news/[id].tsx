import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NewsItem } from "../index";
import Image from "next/image";

const NewsDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const storedNews = JSON.parse(
          localStorage.getItem("news") || "[]"
        ) as NewsItem[];
        console.log("Stored News:", storedNews);

        if (!id) {
          console.error("ID da notícia não encontrado na URL.");
          return;
        }

        const foundNews = storedNews.find(
          (item) => item.link === `/news/${id}`
        );
        console.log("Found News:", foundNews);

        if (!foundNews) {
          console.error("Notícia não encontrada com o ID:", id);
          setNewsItem(null);
          return;
        }

        setNewsItem(foundNews);
      } catch (error) {
        console.error("Erro ao buscar notícia:", error);
        setNewsItem(null);
      }
    };

    fetchNewsItem();
  }, [id]);

  if (!newsItem) {
    return <div className="container mx-auto p-4">Notícia não encontrada</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto mt-24">
        <Image
          width="350"
          height="750"
          src=""
          alt={newsItem.title}
          className="w-full h-48 object-cover"
        />
        <h1 className="text-3xl font-bold mb-4">{newsItem.title}</h1>
        <p className="text-gray-600 mb-2">{newsItem.date}</p>
        <p className="text-gray-700 mb-4">{newsItem.description}</p>
      </div>
    </div>
  );
};

export default NewsDetailPage;
