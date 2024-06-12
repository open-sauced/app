import { useEffect, useState } from "react";
import MultiSelect, { OptionKeys } from "components/atoms/Select/multi-select";

type ContributionsFilterProps = {
  options: OptionKeys[];
  handleSelect: (selected: OptionKeys[]) => void;
};

export const contributionsOptions: OptionKeys[] = [
  { label: "Pull Requests", value: "prs" },
  { label: "Issue Comments", value: "issue-comments" },
];

export function useContributionsFilter(selectedOptions = [contributionsOptions[0]]) {
  const [selected, setSelected] = useState<OptionKeys[]>(selectedOptions);
  const showPRs = selected.filter((option) => option.value === "prs").length > 0;
  const showIssueComments = selected.filter((option) => option.value === "issue-comments").length > 0;

  return { selected, setSelected, showPRs, showIssueComments };
}

export default function ContributionsFilter({ options, handleSelect }: ContributionsFilterProps) {
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [selected, setSelected] = useState<OptionKeys[]>([options[0]]);

  useEffect(() => {
    handleSelect(selected);
  }, [selected, handleSelect]);

  return (
    <MultiSelect
      placeholder="Contributions"
      className="px-3 text-sm"
      options={options}
      open={isMultiSelectOpen}
      setOpen={setIsMultiSelectOpen}
      selected={selected}
      setSelected={setSelected}
      handleSelect={(option) => {
        setSelected((list) => {
          // toggle: if already in, filter, else add into list
          if (list.find((o) => o.value === option.value)) {
            list = list.filter((o) => o.value !== option.value);
          } else {
            list = [...list, option];
          }
          return list;
        });
      }}
    />
  );
}
