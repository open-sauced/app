import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="flex h-24 w-full bg-white items-center justify-center border-t">
      <a
        className="flex items-center justify-center gap-2"
        href="https://opensauced.gitsense.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
            Powered by<div className="font-bold">🍕 & ☕ ️</div>
      </a>
    </footer>
  );
};

export default Footer;
