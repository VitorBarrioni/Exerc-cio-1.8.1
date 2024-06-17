// pages/add-news.tsx

import React from "react";
import AddNewsForm from "../components/AddNewsForm";

const AddNews = () => {
  const handleAddNews = (news: any) => {
    // Recupera as notícias existentes do Local Storage ou inicializa um array vazio
    const existingNews = JSON.parse(localStorage.getItem("news") || "[]");

    // Adiciona a nova notícia ao array existente
    const updatedNews = [...existingNews, news];

    // Salva o array atualizado de notícias no Local Storage
    localStorage.setItem("news", JSON.stringify(updatedNews));

    // Redireciona para a página desejada após adicionar a notícia (opcional)
    // Exemplo: redirecionar de volta para a página inicial
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8 mt-20">
        <h1 className="text-3xl font-bold">Adicionar Notícia</h1>
      </header>
      <main>
        <AddNewsForm onAddNews={handleAddNews} />
      </main>
    </div>
  );
};

export default AddNews;
