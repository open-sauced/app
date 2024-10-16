import React from "react";
import { useRouter } from "next/router";
import { useDebounce } from "rooks";
import useSupabaseAuth from "lib/hooks/useSupabaseAuth";

import Search from "components/atoms/Search/search";
import Title from "components/atoms/Typography/title";
import LimitSelect, { LimitSelectMap } from "components/atoms/Select/limit-select";
import LayoutToggle, { ToggleValue } from "components/atoms/LayoutToggle/layout-toggle";
import { setQueryParams } from "lib/utils/query-params";
import ClientOnly from "components/atoms/ClientOnly/client-only";
import PaginationResult from "../PaginationResults/pagination-result";

interface TableHeaderProps {
  title?: string;
  metaInfo: Meta;
  entity: string;
  onSearch?: (search?: string) => void;
  layout?: ToggleValue;
  onLayoutToggle?: (value: ToggleValue) => void;
}

const TableHeader = ({ title, metaInfo, entity, onSearch, layout, onLayoutToggle }: TableHeaderProps): JSX.Element => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const { providerToken } = useSupabaseAuth();

  const { limit } = router.query;

  const updateSuggestionsDebounced = useDebounce(async () => {
    const req = await fetch(
      `https://api.github.com/search/repositories?q=${encodeURIComponent(`${searchTerm} in:name`)}`,
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
    <div className="flex flex-col flex-wrap w-full pl-4 md:pl-0 gap-y-2 md:flex-row md:justify-between md:items-center md:pb-4">
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
        <ClientOnly>
          <PaginationResult
            total={metaInfo.itemCount}
            className="hidden !translate-y-[2px]  md:inline-flex"
            metaInfo={metaInfo}
            entity={entity}
          />
        </ClientOnly>
      </div>
      <div className="flex flex-col-reverse items-start gap-3 md:flex-row md:items-end ">
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
            labelText={`Search ${title}`}
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
          defaultValue={limit as LimitSelectMap}
          className="hidden ml-auto min-w-max md:inline-block"
          onChange={function (limit: string): void {
            setQueryParams({ limit: `${limit}` });
          }}
        />
      </div>
    </div>
  );
};
export default TableHeader;
