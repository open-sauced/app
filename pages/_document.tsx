import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html style={{ "--top-nav-height": "3rem" }}>
      <Head />
      <body className="selection:bg-light-orange-8 selection:text-light-slate-12">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
