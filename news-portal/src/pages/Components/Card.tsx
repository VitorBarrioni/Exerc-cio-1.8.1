import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

interface CardProps {
  news: {
    id: string;
    title: string;
    date: string;
    description: string;
    link: string;
    tags: string[];
  };
}

const Card: React.FC<CardProps> = ({ news }) => {
  const router = useRouter();

  // Limita o título aos primeiros 50 caracteres
  const truncatedTitle =
    news.title.length > 50 ? news.title.substring(0, 50) + "..." : news.title;

  // Limita a descrição aos primeiros 150 caracteres se a descrição existir
  const truncatedDescription =
    news.description && news.description.length > 150
      ? news.description.substring(0, 150) + "..."
      : news.description;

  const handleCardClick = () => {
    const storedNews = JSON.parse(localStorage.getItem("news") || "[]");
    const storedNewsItem = storedNews.find((item: any) => item.id === news.id);

    if (storedNewsItem && storedNewsItem.link) {
      router.push(storedNewsItem.link);
    } else if (news.link) {
      router.push(news.link);
    } else {
      router.push(`/news/${news.id}`);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg shadow-md overflow-hidden m-5">
      {/* Imagem da notícia */}
      <Image
        width="150"
        height="150"
        src=""
        alt={news.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="text-gray-600 text-sm mb-2">{news.date}</div>
        <h2 className="text-xl font-semibold mb-2 text-gray-800">
          {truncatedTitle}
        </h2>
        <p className="text-gray-700 mb-4">{truncatedDescription}</p>
        <button
          className="text-blue-500 font-bold"
          onClick={handleCardClick}
          style={{ cursor: "pointer" }}
        >
          Ver mais
        </button>
      </div>
    </div>
  );
};

export default Card;
