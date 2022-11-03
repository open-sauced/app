import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface SearchResultsProps {
  children?: React.ReactNode;
  classNames?: string;
  state?: "open" | "closed";
}
const SearchResults = ({ children, classNames, state }: SearchResultsProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger />
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Label />
          <DropdownMenu.Item />

          <DropdownMenu.Group>
            <DropdownMenu.Item />
          </DropdownMenu.Group>

          <DropdownMenu.CheckboxItem>
            <DropdownMenu.ItemIndicator />
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.RadioGroup>
            <DropdownMenu.RadioItem>
              <DropdownMenu.ItemIndicator />
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger />
            <DropdownMenu.Portal>
              <DropdownMenu.SubContent />
            </DropdownMenu.Portal>
          </DropdownMenu.Sub>

          <DropdownMenu.Separator />
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default SearchResults;
