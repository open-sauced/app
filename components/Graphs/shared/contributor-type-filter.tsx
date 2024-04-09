import Button from "components/shared/Button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "components/atoms/Dropdown/dropdown";
import PeopleIcon from "img/icons/people.svg";
import ChevronDownIcon from "img/chevron-down.svg";
import SVGIcon from "components/atoms/SVGIcon/svg-icon";
import Icon from "components/atoms/Icon/icon";

interface ContributorTypeFilterProps {
  setContributorType: (type: ContributorType) => void;
  contributorType: ContributorType;
}

export type ContributorType = "all" | "active" | "new" | "alumni";

const peopleFilters: Record<ContributorType, string> = {
  all: "All Contributors",
  active: "Active Contributors",
  new: "New Contributors",
  alumni: "Alumni Contributors",
};

export const ContributorTypeFilter = ({ setContributorType, contributorType }: ContributorTypeFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="items-center gap-1">
          <SVGIcon IconImage={`${PeopleIcon.src}#icon`} className="w-4 h-4" />
          {peopleFilters[contributorType]}
          <Icon IconImage={ChevronDownIcon} className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-2">
        {Object.entries(peopleFilters).map(([key, value]) => (
          <DropdownMenuItem
            key={key}
            className="rounded-md !cursor-pointer"
            onClick={() => setContributorType(key as keyof typeof peopleFilters)}
          >
            {value}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
