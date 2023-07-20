const uppercaseFirst = (word: string) => {
  if (!word) {
    return "";
  }

  return word.charAt(0).toUpperCase() + word.slice(1);
};

export default uppercaseFirst;
