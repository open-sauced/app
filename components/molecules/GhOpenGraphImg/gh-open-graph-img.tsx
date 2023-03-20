import { generateGhOgImage } from "lib/utils/github";
import InvalidImage from "img/404-image.svg";

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
