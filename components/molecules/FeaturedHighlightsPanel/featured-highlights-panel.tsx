import Link from "next/link";
import React from "react";

interface FeaturedHighlightsPanelProps {
  highlightIds: { id: number; title: string }[];
}
const FeaturedHighlightsPanel = ({ highlightIds }: FeaturedHighlightsPanelProps) => {
  return (
    <div className="border max-w-[299px] rounded-lg p-5 space-y-4">
      <h2 className="pb-2 text-lg border-b">Featured Highlights</h2>
      <div className="flex flex-col gap-4 text-sm">
        {highlightIds.map(({ id, title }) => (
          <Link
            className="transition hover:text-light-orange-10"
            key={id}
            href={`https://insights.opensauced.pizza/feed/${id}`}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedHighlightsPanel;
