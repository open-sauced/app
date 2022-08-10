const regex = new RegExp(/^ghp_[0-9a-zA-Z]{36}$/g);

const validateIsStringGitHubPAT = (patString: string) => {
  return regex.test(patString);
};

export default validateIsStringGitHubPAT;