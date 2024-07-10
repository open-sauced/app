import { useEffect, useState } from "react";
import InvalidImage from "img/icons/fallback-image-disabled-square.svg";
import { isValidUrlSlug } from "lib/utils/url-validators";
interface DevToSocialImgProps {
  blogLink: string;
  className?: string;
}

const DevToSocialImg = ({ blogLink, className }: DevToSocialImgProps): JSX.Element => {
  const trimmedUrl = blogLink.trim();
  const devToUrl = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
  const { pathname } = devToUrl;
  const [, username, slug] = pathname.split("/");

  if (!isValidUrlSlug(username) || !isValidUrlSlug(slug)) {
    throw new Error("Invalid input");
  }

  const [socialImage, setSocialImage] = useState("");
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const fetchBlogSocialImage = async () => {
      const response = await fetch(`https://dev.to/api/articles/${username}/${slug}`);
      const data = await response.json();
      return data;
    };

    fetchBlogSocialImage().then((data) => {
      if (data.social_image) {
        setSocialImage(data.social_image);
        setIsValid(true);
      } else {
        setSocialImage("");
        setIsValid(false);
      }
    });
  }, [slug, username]);

  return (
    <>
      {socialImage && (
        <picture className={className}>
          <img src={isValid ? socialImage : InvalidImage} alt={isValid ? "dev.to social image" : "invalid url image"} />
        </picture>
      )}
    </>
  );
};

export default DevToSocialImg;
