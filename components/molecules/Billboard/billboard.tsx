import * as AspectRatio from "@radix-ui/react-aspect-ratio";
import React from "react";

interface BillBoardProps {
  title: string;
  description: string;
  bannerSrc: string;
  repoLink: string;
}
const BillBoard = ({ title, description, bannerSrc, repoLink }: BillBoardProps) => {
  return (
    <div className="overflow-hidden rounded-lg max-w-[248px] border ">
      <div className="w-full p-0.5 ">
        <AspectRatio.Root ratio={1.85 / 1}>
          <picture>
            <img src={bannerSrc} className="object-cover w-full h-full rounded-t-md" alt={`${title} banner image`} />
          </picture>
        </AspectRatio.Root>
      </div>
      <div className="flex flex-col gap-3 p-5">
        <h1>{title}</h1>
        <p className="font-light">{description}</p>
        <a
          href={repoLink}
          target="_blank"
          rel="noreferrer"
          className="flex justify-center py-1.5 border rounded-lg border-light-orange-7 text-light-orange-10 "
        >
          Learn more
        </a>
      </div>
    </div>
  );
};

export default BillBoard;
