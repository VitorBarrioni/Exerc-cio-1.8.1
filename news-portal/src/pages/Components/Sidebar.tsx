import React, { useState, useEffect } from "react";

interface SidebarProps {
  tags: string[];
  onCategorySelect: (selectedCategories: string[]) => void;
  onSearch: (searchText: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  tags: initialTags,
  onCategorySelect,
  onSearch,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const storedNews = JSON.parse(localStorage.getItem("news") || "[]") as {
      tags: string[];
    }[];

    // Extrai todas as tags únicas das notícias no localStorage
    const allTags = storedNews.reduce(
      (acc: string[], news) => [...acc, ...news.tags],
      []
    );

    // Remove duplicatas e atualiza o estado de tags
    const uniqueTags = Array.from(new Set(allTags));
    setTags(uniqueTags);
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    onSearch("");
  };

  const handleCategoryClick = (category: string) => {
    const newSelectedCategories = [category];
    onCategorySelect(newSelectedCategories);
  };

  return (
    <aside className="w-1/3 p-4">
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Pesquisar</h2>
        <input
          type="text"
          placeholder="Digite um nome"
          className="border border-gray-300 p-2 w-full rounded"
          value={searchText}
          onChange={handleSearchChange}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded w-full mt-2"
          onClick={handleClearSearch}
        >
          Limpar
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Categorias</h2>
        <ul className="list-none p-0">
          {tags.map((tag) => (
            <li key={tag} className="mb-1">
              <button
                className="text-blue-500"
                onClick={() => handleCategoryClick(tag)}
              >
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
