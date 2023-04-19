import React from "react";
import { useRouter } from "next/router";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";
import { useDebounce } from "rooks";

import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import ComponentDateFilter from "../ComponentDateFilter/component-date-filter";
import PaginationResult from "../PaginationResults/pagination-result";
import LimitSelect from "components/atoms/Select/limit-select";

interface TableHeaderProps {
  title?: string;
  metaInfo: Meta;
  entity: string;
  onSearch?: (search?: string) => void;
  updateLimit: Function;
  range?: number;
  setRangeFilter?: (range: number) => void;
}

const options = [
  { name: "10 per page", value: 10 },
  { name: "20 per page", value: 20 },
  { name: "30 per page", value: 30 },
  { name: "40 per page", value: 40 },
  { name: "50 per page", value: 50 }
];
const TableHeader = ({
  title,
  metaInfo,
  entity,
  updateLimit,
  onSearch,
  range,
  setRangeFilter
}: TableHeaderProps): JSX.Element => {
  const router = useRouter();
  const { filterName } = router.query;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<null | number>(null);
  const { providerToken } = useSupabaseAuth();

  const handleSelected = (value: string) => {
    console.log(value);
    console.log(selected);
    const limit = Number(value);
    setSelected(limit);
    updateLimit(limit);
  };

  const updateSuggestionsDebounced = useDebounce(async () => {
    const req = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(`${searchTerm} topic:${filterName} in:name`)}`,
      {
        ...(providerToken
          ? {
            headers: {
              Authorization: `Bearer ${providerToken}`
            }
          }
          : {})
      }
    );

    if (req.ok) {
      const res = await req.json();
      const suggestions = res.items.map((item: any) => item.full_name);
      if (suggestions.length > 5) suggestions.length = 5;
      setSuggestions(suggestions);
    }
  }, 250);

  React.useEffect(() => {
    setSuggestions([]);
    if (!searchTerm) return;
    updateSuggestionsDebounced();
  }, [searchTerm]);

  return (
    <div className="flex flex-col flex-wrap w-full gap-y-2 md:flex-row md:justify-between md:items-end md:pb-4">
      <div className="flex items-end gap-x-4">
        <Title className="!text-2xl !leading-none " level={1}>
          {title}
        </Title>
        <PaginationResult
          total={metaInfo.itemCount}
          className="hidden !translate-y-[2px]  md:inline-flex"
          metaInfo={metaInfo}
          entity={entity}
        />
      </div>
      <div className="flex flex-col-reverse items-start gap-3 md:flex-row md:items-end">
        {range ? (
          <ComponentDateFilter setRangeFilter={(range: number) => setRangeFilter?.(range)} defaultRange={range} />
        ) : (
          ""
        )}
        {onSearch ? (
          <Search
            placeholder={`Search ${title}`}
            className="max-w-full text-sm py-1.5"
            name={"query"}
            onSearch={onSearch}
            suggestions={suggestions}
            onChange={(value) => setSearchTerm(value)}
          />
        ) : (
          ""
        )}

        <LimitSelect
          placeholder="10 per page"
          options={[
            { name: "10 per page", value: 10 },
            { name: "20 per page", value: 20 },
            { name: "30 per page", value: 30 },
            { name: "40 per page", value: 40 },
            { name: "50 per page", value: 50 }
          ]}
          className="hidden ml-auto min-w-max md:inline-block"
          onChange={function (limit: number): void {
            updateLimit(limit);
          }}
        />
      </div>
    </div>
  );
};
export default TableHeader;
