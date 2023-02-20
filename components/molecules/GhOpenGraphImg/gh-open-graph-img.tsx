import { generateGhOgImage } from "lib/utils/github";
import Image from "next/image";
import InvalidImage from "img/404 Image.svg";
import { useEffect, useState } from "react";

interface GhOpenGraphImgProps {
  githubLink: string;
}

const GhOpenGraphImg = ({ githubLink }: GhOpenGraphImgProps): JSX.Element => {
  const { isValid, url } = generateGhOgImage(githubLink);

  return (
    <>
      {url && (
        <div className="relative w-full h-[185px] md:h-[170px] lg:h-[320px]">
          <Image src={isValid ? url : InvalidImage} fill alt={isValid ? "github og image" : "invalid url image"} />
        </div>
      )}
    </>
  );
};

export default GhOpenGraphImg;
