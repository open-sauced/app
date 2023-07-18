import { generateGhOgImage } from "lib/utils/github";
import InvalidImage from "img/icons/fallback-image-disabled-square.svg";
interface GhOpenGraphImgProps {
  githubLink: string;
  className?: string;
}

const GhOpenGraphImg = ({ githubLink, className }: GhOpenGraphImgProps): JSX.Element => {
  const { isValid, url } = generateGhOgImage(githubLink);

  return (
    <>
      {url && (
        <picture className={className}>
          <img src={isValid ? url : InvalidImage} alt={isValid ? "github og image" : "invalid url image"} />
        </picture>
      )}
    </>
  );
};

export default GhOpenGraphImg;
