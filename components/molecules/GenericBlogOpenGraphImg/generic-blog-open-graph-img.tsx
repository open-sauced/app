import { useEffect, useState } from "react";
import InvalidImage from "img/icons/fallback-image-disabled-square.svg";

interface GenericBlogOpenGraphImgProps {
  blogLink: string;
  className?: string;
}

const GenericBlogOpenGraphImg = ({ blogLink, className }: GenericBlogOpenGraphImgProps): JSX.Element => {
  const [socialImage, setSocialImage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const fetchBlogOGImage = async () => {
      const response = await fetch(`/api/fetchOGData/?url=${blogLink}`);
      const data = await response.json();
      return data;
    };

    fetchBlogOGImage().then(({ response }) => {
      if (response) {
        setSocialImage(response?.image?.url || response?.image?.url[response?.image?.url.length - 1]);
        setIsValid(true);
      } else {
        setSocialImage("");
        setIsValid(false);
      }
    });
  }, [blogLink]);

  return (
    <>
      {socialImage && (
        <picture className={className}>
          <img
            src={isValid ? socialImage : InvalidImage}
            alt={isValid ? "blog og image" : "invalid url image"}
            className={"border border-slate-100 rounded-lg"}
          />
        </picture>
      )}
    </>
  );
};

export default GenericBlogOpenGraphImg;
