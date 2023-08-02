type TooltipParams = {
  name: string;
  value: number;
};
const getFormattedTooltipValue = (params: Array<TooltipParams>) => {
  const currentParam = params[0];
  const daysAgo = parseInt(currentParam.name) > 1 ? currentParam.name + " days ago" : currentParam.name + " day ago";
  const prCount = currentParam.value > 1 ? currentParam.value + " PRs" : currentParam.value + " PR";
  return `${daysAgo} <br/> ${prCount}`;
};

export default getFormattedTooltipValue;
