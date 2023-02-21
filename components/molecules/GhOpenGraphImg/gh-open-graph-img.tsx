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
        <picture>
          <img src={isValid ? url : InvalidImage} alt={isValid ? "github og image" : "invalid url image"} />
        </picture>
      )}
    </>
  );
};

export default GhOpenGraphImg;
