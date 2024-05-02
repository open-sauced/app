import { useState } from "react";
import { useRouter } from "next/router";
import { Popover, PopoverContent, PopoverTrigger } from "components/molecules/Popover/popover";
import { Command, CommandGroup, CommandInput, CommandItem } from "components/atoms/Cmd/command";

type WorkspaceSidebarSelectProps = {
  workspaces: Workspace[];
  workspaceId?: string;
  className?: string;
};

export default function WorkspaceSidebarSelect({
  workspaces,
  workspaceId = "new",
  className = "",
}: WorkspaceSidebarSelectProps) {
  const router = useRouter();

  const options = [
    { label: "Create a new workspace", value: "new" },
    ...workspaces.map((workspace) => {
      return { label: workspace.name, value: workspace.id };
    }),
  ];
  const current = options.find((option) => option.value === workspaceId);

  const [open, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  return (
    <Popover>
      <PopoverTrigger>
        <button onClick={() => setIsOpen(!open)}>{current?.label}</button>
      </PopoverTrigger>

      <PopoverContent align="end" className="!w-full bg-white p-0 max-w-sm h-fit">
        <Command loop className="w-full px-0 pt-1 bg-transparent">
          <CommandInput
            placeholder={"Search Items"}
            value={inputValue}
            onValueChange={setInputValue}
            className="px-2 focus:ring-0"
          />
          <CommandGroup className="flex flex-col !px-0 !py-0 overflow-x-hidden overflow-y-scroll max-h-52">
            {open && options.length > 0
              ? options.map((option) => (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      if (option.value === "new") {
                        setIsOpen(false);
                        router.push("/workspaces/new");
                      } else {
                        setIsOpen(false);
                        router.push(`/workspaces/${option.value}`);
                      }
                    }}
                    className="!cursor-pointer flex justify-between items-center !px-3 rounded-md truncate break-words w-full"
                  >
                    {option.label}
                  </CommandItem>
                ))
              : null}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
