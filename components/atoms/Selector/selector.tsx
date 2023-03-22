import Radio from "components/atoms/Radio/radio";
import RadioCheck from "../RadioCheck/radio-check";

interface SelectorProps {
  filterOptions: string[];
  handleFilterClick: (filter: string) => void;
  selected?: string;
  variation?: "circle" | "check"
}

const Selector = ({
  filterOptions,
  handleFilterClick,
  selected,
  variation = "circle"
}: SelectorProps) => {
  return (
    <div className="mt-2 absolute transform md:translate-x-0 space-y-1 mt-1 shadow-superlative z-10 w-72 bg-white rounded-lg px-1.5 py-2">
      {filterOptions.length > 0 &&
        filterOptions.map((option, index) => {
          return (
            variation === "circle" ? (
              <Radio
                key={index}
                onClick={() => {
                  handleFilterClick(option);
                }}
                className="!w-full"
                checked={selected === option ? true : false}
              >
                {option}
              </Radio>
            ) : (
              <RadioCheck
                key={index}
                onClick={() => {
                  handleFilterClick(option);
                }}
                className="!w-full"
                checked={selected === option ? true : false}
              >
                {option}
              </RadioCheck>
            )
          );
        })}
    </div>
  );
};

export default Selector;
