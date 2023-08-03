export const getNotificationURL = (type: string, id: string) => {
  switch (type) {
    case "highlight_reaction":
      return `/feed/${id}`;
    case "follow":
      return `/user/${id}`;
    default:
      return "/";
  }
};
