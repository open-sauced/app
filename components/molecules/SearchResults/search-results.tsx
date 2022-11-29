import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Children } from "react";

interface SearchResultsProps {
  children?: React.ReactNode;
  classNames?: string;
  state?: "open" | "closed";
}
const SearchResults = ({ children, classNames, state = "closed" }: SearchResultsProps) => {
  const childrenArray = Children.toArray(children);
  return (
    <DropdownMenu.Root open={state === "open"}>
      <DropdownMenu.Trigger className="!hidden" />
      <DropdownMenu.Portal className="">
        <DropdownMenu.Content asChild>
          <div className="min-w-[648px] w-full rounded-lg border overflow-hidden relative top-2">
            {childrenArray.map((item, index) => (
              <DropdownMenu.Item key={index} className="hover:border-none hover:outline-none transition w-full">
                {item}
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SearchResults;
