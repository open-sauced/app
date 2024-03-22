import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import React from "react";

interface AnnouncementCardProps {
  title: string;
  description: string;
  bannerSrc: string;
  url: string;
}
const AnnouncementCard = ({ title, description, bannerSrc, url }: AnnouncementCardProps) => {
  const announcementId = `announcement-${Date.now()}`;

  return (
    <aside
      aria-labelledby={announcementId}
      className="overflow-hidden border max-w-xs w-full rounded-lg bg-light-slate-1"
    >
      <div className="w-full">
        <AspectRatio.Root ratio={1.85 / 1}>
          <picture>
            <img src={bannerSrc} className="object-cover w-full h-full" alt={`${title} banner image`} />
          </picture>
        </AspectRatio.Root>
      </div>
      <div className="flex flex-col gap-3 p-6">
        <h1 className="text-lg" id={announcementId}>
          {title}
        </h1>
        <p className="text-sm font-normal text-light-slate-11 pb-2">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex justify-center py-1.5 border rounded-lg border-light-orange-7 text-light-orange-10 hover:border-light-orange-9 hover:border-2 hover:text-light-orange-10"
        >
          Learn more
        </a>
      </div>
    </aside>
  );
};

export default AnnouncementCard;
