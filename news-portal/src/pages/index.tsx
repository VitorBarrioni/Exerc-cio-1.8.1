import React, { useState, useEffect } from "react";
import Card from "./components/Card";
import Sidebar from "./components/Sidebar";
import Link from "next/link";

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  description: string;
  link: string; // Certifique-se de que link é uma string válida
  tags: string[];
}

const Home = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [selectedtags, setSelectedTags] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem("news") || "[]");
    setNews([...storedNews]); // Apenas as notícias do localStorage, sem as iniciais
  }, []);

  const filterNews = () => {
    let filtered = news;

    if (selectedtags.length > 0) {
      filtered = filtered.filter((item) =>
        item.tags.some((category: string) => selectedtags.includes(category))
      );
    }

    if (searchText.trim() !== "") {
      const searchLower = searchText.toLowerCase();
      filtered = filtered.filter((item) => {
        const title = item.title ? item.title.toLowerCase() : "";
        const description = item.description
          ? item.description.toLowerCase()
          : "";
        const tags =
          item.tags && item.tags.length > 0
            ? item.tags.join(" ").toLowerCase()
            : "";
        return (
          title.includes(searchLower) ||
          description.includes(searchLower) ||
          tags.includes(searchLower)
        );
      });
    }

    return filtered;
  };

  const handleCategorySelect = (selectedtags: string[]) => {
    setSelectedTags(selectedtags);
  };

  const handleSearch = (searchText: string) => {
    setSearchText(searchText);
  };

  const filteredNews = filterNews();

  console.log(filteredNews);

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8 mt-20">
        <h1 className="text-3xl font-bold">Bem vindo ao nosso portal!</h1>
        <p className="text-gray-600">Notícias sobre tecnologia</p>
      </header>
      <main className="flex">
        <section className="w-full">
          <div className="grid grid-cols-2 gap-4">
            {filteredNews.map((item) => (
              <Link key={item.id} href={item.link}>
                <div className="no-underline cursor-pointer">
                  <Card news={item} />
                </div>
              </Link>
            ))}
          </div>
        </section>
        <Sidebar
          tags={tags}
          onCategorySelect={handleCategorySelect}
          onSearch={handleSearch}
        />
      </main>
    </div>
  );
};

export default Home;
