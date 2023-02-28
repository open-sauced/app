import Title from "components/atoms/Typography/title";
import Icon from "components/atoms/Icon/icon";
import { useState } from "react";

interface HighlightsFilterCardProps {
  repos: { repoName: string; repoIcon: string; full_name: string }[];
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}
const HighlightsFilterCard = ({ repos, setSelected }: HighlightsFilterCardProps): JSX.Element => {
  const [selected, setSelectedRepo] = useState("");

  const handleClick = (name: string) => {
    setSelectedRepo(name);
    setSelected(name);
  };

  return (
    <div className="py-4 px-6 rounded-lg  border w-[18.625rem] h-max">
      <Title className="!font-normal" level={3}>
        Repositories
      </Title>
      <p className="text-sm text-light-slate-11 mb-2 font-normal">Click to filter the highlights</p>
      <div className="flex flex-col border-t pt-4 gap-2">
        {/* eslint-disable-next-line camelcase */}
        {repos.map(({ repoName, repoIcon, full_name }) => (
          <div
            onClick={() => handleClick(full_name)}
            key={(repoName + repoIcon) as string}
            className={`${
              // eslint-disable-next-line camelcase
              selected === full_name ? "border-orange-600 bg-orange-200" : ""
            } flex hover:border-orange-600 hover:bg-orange-200 cursor-pointer gap-1 w-max  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12`}
          >
            <Icon IconImage={repoIcon} className="rounded-[4px] overflow-hidden" />
            <span className="max-w-[45px] md:max-w-[100px] truncate text-xs ">{repoName}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default HighlightsFilterCard;
