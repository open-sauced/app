const changeCapitalization = (string: string, isMakeUppercase: boolean) => {
  const firstLetterInPath = 0;
  const tempString = string.slice(firstLetterInPath);
  if(isMakeUppercase) return tempString.charAt(0).toUpperCase() + tempString.slice(1);
  return tempString.charAt(0).toLowerCase() + tempString.slice(1);
};

export default changeCapitalization;