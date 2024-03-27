import { useEffect, useState } from "react";
import MultiSelect, { OptionKeys } from "components/atoms/Select/multi-select";

type TrackedRepositoryFilterProps = {
  options: OptionKeys[];
  handleSelect: (selected: OptionKeys[]) => void;
};

export default function TrackedRepositoryFilter({ options, handleSelect }: TrackedRepositoryFilterProps) {
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [selected, setSelected] = useState<OptionKeys[]>([]);

  useEffect(() => {
    handleSelect(selected);
  }, [selected]);

  return (
    <MultiSelect
      placeholder="Filter"
      inputPlaceholder="Search repositories"
      className="px-3"
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
