import Radio from "components/atoms/Radio/radio";
import humanizeNumber from "lib/utils/humanizeNumber";

interface SelectorProps {
  filterOptions: string[];
  handleFilterClick: (filter: string) => void;
  selected?: string;
}

const Selector = ({
  filterOptions,
  handleFilterClick,
  selected,
}: SelectorProps) => {
    return (
        <div className="mt-2 absolute transform -translate-x-1/3 md:translate-x-0 space-y-1 mt-1 shadow-superlative z-10 w-72 bg-white rounded-lg px-1.5 py-2">
          {filterOptions.length > 0 &&
            filterOptions.map((option, index) => {
              return (
                <Radio
                  withLabel={"-"}
                  key={index}
                  onClick={() => {
                    handleFilterClick(option);
                  }}
                  css="!w-full"
                  checked={selected === option ? true : false}
                >
                  {option}
                </Radio>
              );
            })}
        </div>
    )
}

export default Selector
