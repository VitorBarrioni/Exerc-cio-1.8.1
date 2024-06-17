import Image from "next/image";
import Link from "next/link";
import logo from "../../Imagens/images.jpg";
import { useState } from "react";

export const Header: React.FC = () => {
  return (
    <header className="navbar fixed w-full z-[100] shadow-xl h-10">
      <div className="navbar-start px-3">
        <h1>Tech News</h1>
      </div>
      <div className="navbar-end">
        <ul className=" hidden md:flex">
          <Link href="/">
            <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
          </Link>

          <Link href="/adicionar">
            <li className="ml-10 text-sm uppercase hover:border-b">
              Adicionar Noticia
            </li>
          </Link>

          <Link href="/contato">
            <li className="ml-10 text-sm uppercase hover:border-b">Contatos</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};
