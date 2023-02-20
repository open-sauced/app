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
    // eslint-disable-next-line @next/next/no-img-element
    <>{url && <img src={isValid ? url : InvalidImage} alt={isValid ? "github og image" : "invalid url image"} />}</>
  );
};

export default GhOpenGraphImg;
