// Inspired by https://cloudinary.com/documentation/fetch_remote_images#remote_image_fetch_url
// This is temporary and requires a Cloudinary account's cloud name.
// In the future we can developer our own local image transformations.
// https://github.com/open-sauced/insights/issues/468
const roundedImage = (imageUrl: string, cloudName: string | undefined) => {
  return cloudName
    ? `https://res.cloudinary.com/${cloudName}/image/fetch/c_fill,g_face,h_300,w_300,bo_20px_solid_white,r_max/f_auto,e_shadow/${imageUrl}`
    : imageUrl;
};

export default roundedImage;
