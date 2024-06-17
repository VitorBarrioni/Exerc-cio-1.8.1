import { Html, Head, Main, NextScript } from "next/document";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Header />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
