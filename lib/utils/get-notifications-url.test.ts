import { getNotificationURL } from "lib/utils/get-notification-url";

describe("[lib] getNotificationURL()", () => {
  it("should return the correct URL for a highlight reaction notification", () => {
    const type = "highlight_reaction";
    const idOrUsername = 30;
    const result = getNotificationURL(type, idOrUsername);
    expect(result).toBe("/feed/30");
  });

  it("should return the correct URL for a follow notification", () => {
    const type = "follow";
    const idOrUsername = "takanome-dev";
    const result = getNotificationURL(type, idOrUsername);
    expect(result).toBe("/user/takanome-dev");
  });

  it("should return the correct URL for an unknown notification", () => {
    const type = "unknown";
    const idOrUsername = "unknown";
    const result = getNotificationURL(type, idOrUsername);
    expect(result).toBe("/");
  });
});
