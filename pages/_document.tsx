import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="!font-semibold selection:bg-light-orange-8 selection:text-light-slate-12">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
