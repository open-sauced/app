const fetchSocialCard = async (endpoint: string) => {
  try {
    const socialCardUrl = `${String(process.env.NEXT_PUBLIC_OPENGRAPH_URL ?? "")}/${endpoint}`;
    const ogReq = await fetch(`${socialCardUrl}/metadata`); //status returned: 204 or 304 or 404
    if (ogReq.status !== 204) {
      fetch(socialCardUrl, {
        method: "HEAD",
      }); // trigger the generation of the social card
    }

    return ogReq.headers.get("x-amz-meta-location");
  } catch (e) {
    // This is to prevent the page from crashing if the social card is not generated for some reasons.
    console.error(e);
    return "";
  }
};

export default fetchSocialCard;
