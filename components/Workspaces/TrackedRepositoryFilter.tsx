import { useState } from "react";
import MultiSelect, { OptionKeys } from "components/atoms/Select/multi-select";

export default function TrackedRepositoryFilter() {
  const [isMultiSelectOpen, setIsMultiSelectOpen] = useState(false);
  const [selected, setSelected] = useState<OptionKeys[]>([]);

  return (
    <>
      <MultiSelect
        placeholder="Filter"
        className="px-3"
        // TODO: get suggestions from useSearchTrackedRepos
        options={[{ label: "TanStack/router", value: "TanStack/router" }]}
        open={isMultiSelectOpen}
        setOpen={setIsMultiSelectOpen}
        selected={selected}
        setSelected={setSelected}
        handleSelect={(option) => {
          setSelected((list) => {
            if (list.find((o) => o.value === option.value)) {
              list = list.filter((o) => o.value !== option.value);
            } else {
              list = [...list, option];
            }
            return list;
          });
        }}
      />
    </>
  );
}
