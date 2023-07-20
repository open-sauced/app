interface TwitterUsernameValidation {
  valid: boolean;
  message: string;
}

export const validateTwitterUsername = (username: string): TwitterUsernameValidation => {
  if (username.length > 15)
    return {
      valid: false,
      message: "Username must be less than 15 characters",
    };
  else if (["admin", "twitter"].some((reserved) => username.toLocaleLowerCase().includes(reserved)))
    return { valid: false, message: "Username contains reserved word 'admin' or 'twitter'" };
  else if (!String(username).match(/^\w{0,15}$/))
    return { valid: false, message: "Username can only contain letters, numbers, and underscores" };
  else return { valid: true, message: "" };
};
