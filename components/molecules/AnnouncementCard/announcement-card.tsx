import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import React from "react";

interface AnnouncementCardProps {
  title: string;
  description: string;
  bannerSrc: string;
  url: string;
}
const AnnouncementCard = ({ title, description, bannerSrc, url }: AnnouncementCardProps) => {
  return (
    <div className="overflow-hidden border bg-light-slate-1 rounded-xl">
      <div className="w-full p-0.5 ">
        <AspectRatio.Root ratio={1.85 / 1}>
          <picture>
            <img src={bannerSrc} className="object-cover w-full h-full rounded-t-xl" alt={`${title} banner image`} />
          </picture>
        </AspectRatio.Root>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h1>{title}</h1>
        <p className="font-light">{description}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="flex justify-center py-1.5 border rounded-lg border-light-orange-7 text-light-orange-10 hover:border-light-orange-9 hover:border-2 hover:text-light-orange-10"
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default AnnouncementCard;
