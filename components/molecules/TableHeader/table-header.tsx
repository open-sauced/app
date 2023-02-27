import React from "react";

import Search from "components/atoms/Search/search";
import Select from "components/atoms/Select/custom-select";
import Title from "components/atoms/Typography/title";
import ComponentDateFilter from "../ComponentDateFilter/component-date-filter";
import PaginationResult from "../PaginationResults/pagination-result";
import { useRouter } from "next/router";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useDebounce } from "rooks";

interface TableHeaderProps {
  title?: string;
  showing: { from: number; to: number; total: number; entity: string };
  onSearch?: (search?: string) => void;
  updateLimit: Function;
  range?: number;
  setRangeFilter?: (range: number) => void;
}
const TableHeader = ({
  title,
  showing,
  updateLimit,
  onSearch,
  range,
  setRangeFilter
}: TableHeaderProps): JSX.Element => {
  const router = useRouter();
  const { filterName } = router.query;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<string[]>(["openarch/north", "opencv/opencv", "openmusic5/featurecity"]);
  const { providerToken } = useSupabaseAuth();

  const updateSuggestionsDebounced = useDebounce( async () => {
    const req = await fetch(`https://api.github.com/search/repositories?q=${encodeURIComponent(`${searchTerm} topic:${filterName} in:name`)}`, {
      ...providerToken? {
        headers: {
          "Authorization": `Bearer ${providerToken}`
        }} : {}
    });

    const res = await req.json();

    if(req.ok) {
      const suggestions = res.items.map((item: any) => item.full_name);
      if(suggestions.length > 5) suggestions.length = 5;
      setSuggestions(suggestions);
    }
  }, 4000);

  React.useEffect(() => {
    setSuggestions([]);
    if(!searchTerm) return;
    console.log(providerToken);
    updateSuggestionsDebounced();
  }, [searchTerm]);

  return (
    <div className="flex flex-wrap gap-y-2 flex-col md:flex-row md:justify-between md:items-end w-full md:pb-4">
      <div className="flex gap-x-4 items-end">
        <Title className="!text-2xl !leading-none " level={1}>
          {title}
        </Title>
        <PaginationResult className="hidden !translate-y-[2px]  md:inline-flex" {...showing} />
      </div>
      <div className="flex flex-col-reverse md:flex-row items-start gap-3  md:items-end">
        {range ? (
          <ComponentDateFilter setRangeFilter={(range: number) => setRangeFilter?.(range)} defaultRange={range} />
        ) : (
          ""
        )}
        {onSearch ? (
          <Search placeholder={`Search ${title}`} className="max-w-full text-sm py-1.5" name={"query"} onSearch={onSearch}
            suggestions={suggestions} onChange={(value) => setSearchTerm(value)} />
        ) : (
          ""
        )}
        <Select
          placeholder="10 per page"
          options={[
            { name: "10 per page", value: 10 },
            { name: "20 per page", value: 20 },
            { name: "30 per page", value: 30 },
            { name: "40 per page", value: 40 },
            { name: "50 per page", value: 50 }
          ]}
          className="hidden ml-auto md:inline-block md:!max-w-[220px]"
          label="Showing"
          onChange={function (limit: number): void {
            updateLimit(limit);
          }}
        ></Select>
      </div>
    </div>
  );
};
export default TableHeader;
