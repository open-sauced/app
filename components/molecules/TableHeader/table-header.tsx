import React from "react";
import { useRouter } from "next/router";
import { useDebounce } from "rooks";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import LimitSelect from "components/atoms/Select/limit-select";
import LayoutToggle, { ToggleValue } from "components/atoms/LayoutToggle/layout-toggle";
import ComponentDateFilter from "../ComponentDateFilter/component-date-filter";
import PaginationResult from "../PaginationResults/pagination-result";

interface TableHeaderProps {
  title?: string;
  metaInfo: Meta;
  entity: string;
  onSearch?: (search?: string) => void;
  updateLimit: Function;
  range?: number;
  setRangeFilter?: (range: number) => void;
  layout?: ToggleValue;
  onLayoutToggle?: (value: ToggleValue) => void;
}

const options = [
  { name: "10 per page", value: 10 },
  { name: "20 per page", value: 20 },
  { name: "30 per page", value: 30 },
  { name: "40 per page", value: 40 },
  { name: "50 per page", value: 50 },
];
const TableHeader = ({
  title,
  metaInfo,
  entity,
  updateLimit,
  onSearch,
  range,
  setRangeFilter,
  layout,
  onLayoutToggle,
}: TableHeaderProps): JSX.Element => {
  const router = useRouter();
  const { filterName } = router.query;
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [selected, setSelected] = React.useState<null | number>(null);
  const { providerToken } = useSupabaseAuth();

  const updateSuggestionsDebounced = useDebounce(async () => {
    const req = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(`${searchTerm} topic:${filterName} in:name`)}`,
      {
        ...(providerToken
          ? {
              headers: {
                Authorization: `Bearer ${providerToken}`,
              },
            }
          : {}),
      }
    );

    if (req.ok) {
      const res = await req.json();
      const suggestions = res.items.map((item: any) => item.full_name);
      setSuggestions(suggestions);
    }
  }, 250);

  React.useEffect(() => {
    setSuggestions([]);
    if (!searchTerm) return;
    updateSuggestionsDebounced();
  }, [searchTerm]);

  return (
    <div className="flex flex-col flex-wrap w-full px-4 gap-y-2 md:flex-row md:justify-between md:items-end md:pb-4">
      <div className="flex items-center justify-between gap-x-4 md:justify-start">
        <Title className="!text-2xl !leading-none " level={1}>
          {title}
        </Title>
        {layout ? (
          <div className="md:hidden">
            <LayoutToggle value={layout} onChange={onLayoutToggle} />
          </div>
        ) : (
          ""
        )}
        <PaginationResult
          total={metaInfo.itemCount}
          className="hidden !translate-y-[2px]  md:inline-flex"
          metaInfo={metaInfo}
          entity={entity}
        />
      </div>
      <div className="flex flex-col-reverse items-start gap-3 md:flex-row md:items-end ">
        {range ? (
          <ComponentDateFilter setRangeFilter={(range: number) => setRangeFilter?.(range)} defaultRange={range} />
        ) : (
          ""
        )}

        {layout ? (
          <div className="hidden md:inline-flex">
            <LayoutToggle value={layout} onChange={onLayoutToggle} />
          </div>
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
            { name: "10 per page", value: "10" },
            { name: "20 per page", value: "20" },
            { name: "30 per page", value: "30" },
            { name: "40 per page", value: "40" },
            { name: "50 per page", value: "50" },
          ]}
          className="hidden ml-auto min-w-max md:inline-block"
          onChange={function (limit: string): void {
            updateLimit(Number(limit));
          }}
        />
      </div>
    </div>
  );
};
export default TableHeader;
