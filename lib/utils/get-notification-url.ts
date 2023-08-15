/**
 * Returns the URL for a notification based on its type and ID or username.
 * @param type - The type of the notification.
 * @param id - The ID or username associated with the notification.
 * @returns The URL for the notification.
 */
export const getNotificationURL = (type: string, id: string | number) => {
  switch (type) {
    case "highlight_reaction":
    case "highlight_created":
      return `/feed/${id}`;
    case "follow":
      return `/user/${id}`;
    default:
      return "/";
  }
};
