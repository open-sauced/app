import Icon from "components/atoms/Icon/icon";

interface HighlightsFilterCardProps {
  repos: { repoName: string; repoIcon: string; full_name: string }[];
  setSelected: (selected: string) => void;
  selectedFilter: string;
}
const HighlightsFilterCard = ({ repos, setSelected, selectedFilter }: HighlightsFilterCardProps): JSX.Element => {
  const handleClick = (name: string) => {
    setSelected(selectedFilter === name ? "" : name);
  };

  return (
    <aside
      aria-labelledby="highlights-repositories-filter"
      className="py-4 px-6 pb-6 rounded-lg bg-light-slate-1  border w-full h-max"
    >
      <h2 className="text-lg" id="highlights-repositories-filter">
        Repositories
      </h2>
      <p className="mb-2 text-sm font-normal text-light-slate-11">Click to filter the highlights</p>
      <div className="flex flex-col gap-2 pt-4 border-t">
        {repos.map(({ repoName, repoIcon, full_name }) => (
          <button
            onClick={() => handleClick(full_name)}
            key={full_name as string}
            className={`${
              selectedFilter === full_name ? "border-orange-600 bg-orange-200" : ""
            } flex hover:border-orange-600 hover:bg-orange-200 cursor-pointer gap-1 w-max  p-1 pr-2 border-[1px] border-light-slate-6 rounded-lg text-light-slate-12`}
          >
            <Icon IconImage={repoIcon} className="rounded-[4px] overflow-hidden" />
            <span className="max-w-[45px] md:max-w-[100px] truncate text-xs ">{repoName}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};
export default HighlightsFilterCard;
