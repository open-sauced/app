/**
 * Returns the URL for a notification based on its type and ID or username.
 * @param type - The type of the notification.
 * @param idOrUsername - The ID or username associated with the notification.
 * @returns The URL for the notification.
 */
export const getNotificationURL = (type: string, idOrUsername: string) => {
  switch (type) {
    case "highlight_reaction":
      return `/feed/${idOrUsername}`;
    case "follow":
      return `/user/${idOrUsername}`;
    default:
      return "/";
  }
};
