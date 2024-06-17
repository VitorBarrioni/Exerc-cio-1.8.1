import React, { useState } from "react";

interface AddNewsFormProps {
  onAddNews: (news: News) => void;
}

interface News {
  title: string;
  description: string;
  tags: string[];
  link: string;
}

const AddNewsForm: React.FC<AddNewsFormProps> = ({ onAddNews }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleTagsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTags(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const formData: News = {
      title,
      description,
      tags: tags.split(",").map((tag) => tag.trim()),
      link: `/news/${Date.now()}`, // Gerando um link baseado no timestamp atual como exemplo
    };

    // Chama a função de callback para adicionar a notícia
    onAddNews(formData);

    // Limpa os campos após adicionar a notícia
    setTitle("");
    setDescription("");
    setTags("");

    // Adicionar notícia ao localStorage com chave dinâmica, se ainda não existir
    const storedNews = JSON.parse(localStorage.getItem("news") || "[]");
    const existingNews = storedNews.find(
      (item: any) =>
        item.title === formData.title &&
        item.description === formData.description
    );

    if (!existingNews) {
      const updatedNews = [...storedNews, formData];
      localStorage.setItem("news", JSON.stringify(updatedNews));
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-medium text-gray-700"
          >
            Conteúdo
          </label>
          <textarea
            id="description"
            rows={5}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <div className="flex items-center">
          <label
            htmlFor="tags"
            className="block text-lg font-medium text-gray-700 flex-grow"
          >
            Tags (separadas por vírgula)
          </label>
          <input
            type="text"
            id="tags"
            className="mt-1 block w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={tags}
            onChange={handleTagsChange}
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Adicionar Notícia
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewsForm;
