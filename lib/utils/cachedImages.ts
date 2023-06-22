// Inspired by https://cloudinary.com/documentation/fetch_remote_images#remote_image_fetch_url
// This is temporary and requires a Cloudinary account's cloud name.
// In the future we can develop our own local image transformations.
// https://github.com/open-sauced/insights/issues/468
const cachedImage = (imageUrl: string, cloudName: string | undefined) => {
  return cloudName ? `https://res.cloudinary.com/${cloudName}/image/fetch/${imageUrl}` : imageUrl;
};

export default cachedImage;
