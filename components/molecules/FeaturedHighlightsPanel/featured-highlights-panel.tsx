import Link from "next/link";
import React, { useEffect, useState } from "react";

interface FeaturedHighlightsPanelProps {
  highlights: DbHighlight[];
}
const FeaturedHighlightsPanel = ({ highlights }: FeaturedHighlightsPanelProps) => {
  const [host, setHost] = useState("");

  useEffect(() => {
    if (window !== undefined) {
      setHost(window.location.origin as string);
    }
  }, []);

  return (
    <div className="w-full p-5 space-y-4 border rounded-lg bg-light-slate-1">
      <h2 className="pb-2 text-lg border-b">Featured Highlights</h2>
      <div className="flex flex-col gap-4 text-sm">
        {highlights.map(({ id, title }) => (
          <Link className="transition hover:text-light-orange-10" key={id} href={`${host}/feed/${id}`}>
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHighlightsPanel;
