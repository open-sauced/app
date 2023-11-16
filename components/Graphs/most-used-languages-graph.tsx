import { BsFillCircleFill } from "react-icons/bs";
import Button from "components/atoms/Button/button";
import Card from "components/atoms/Card/card";
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
import Text from "components/atoms/Typography/text";

export interface MostUsedLanguagesGraphProps {
  data: {
    mainLanguage: string;
    data: {
      name: string;
      value: number;
    }[];
  };
  setContributorType: (type: ContributorType) => void;
  contributorType: ContributorType;
}

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

// TODO: Pull this out because it's used in more than one place now.
const ContributorTypeFilter = ({ setContributorType, contributorType }: ContributorTypeFilterProps) => {
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

export const MostUsedLanguagesGraph = ({ data, setContributorType, contributorType }: MostUsedLanguagesGraphProps) => {
  const colors = [
    "hsl(53, 91%, 59%)",
    "hsl(204, 100%, 40%)",
    "hsl(14, 98%, 49%)",
    "hsl(267, 36%, 37%)",
    "hsl(17, 100%, 50%)",
  ];
  const percentage = 10;
  const { data: languages = [], mainLanguage } = data;
  const lastItem = languages.length > 0 ? languages.length - 1 : 0;

  // TODO: add loading view
  return (
    <Card>
      <div className="flex flex-col gap-6">
        <h2>Most used languages</h2>
        <Text>
          {mainLanguage} contributions have been growing on average {percentage}% MoM
        </Text>
        <div className="w-max">
          <ContributorTypeFilter setContributorType={setContributorType} contributorType={contributorType} />
        </div>

        <div className="flex h-3 place-content-center">
          {languages.length > 0 ? (
            languages.map((item, index) => {
              return (
                <div
                  key={item.name}
                  className={`${index === 0 ? "rounded-l-lg" : ""} ${index === lastItem ? "rounded-r-lg" : ""}`}
                  style={{ backgroundColor: colors[index], width: `${item.value}%` }}
                />
              );
            })
          ) : (
            <div className="rounded-lg bg-slate-100 w-full" />
          )}
        </div>

        <ul className="grid grid-cols-1 content-center">
          {languages.length > 0 ? (
            languages.map((item, index) => (
              <li
                key={item.name}
                className={`flex justify-between pt-4 pb-4 ${index === lastItem ? "" : "border-b-1 border-slate-100"}`}
              >
                <span className="flex gap-2 items-center font-medium text-slate-700">
                  <BsFillCircleFill size={10} style={{ fill: colors[index] }} />
                  {item.name}
                </span>
                {/* TODO: text-slate-100 doesn't pass colour contrast check.
                 text-slate-600 passes contrast checks but need to check with design
                 */}
                <span className="text-slate-600">{item.value}%</span>
              </li>
            ))
          ) : (
            <p className="text-center">There is no language data</p>
          )}
        </ul>
      </div>
    </Card>
  );
};
