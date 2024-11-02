import Text from "components/atoms/Typography/text";
import Tooltip from "components/atoms/Tooltip/tooltip";
import colors from "../../../lib/utils/color.json";

export interface AllSimpleColors {
  [key: string]: {
    color: string | null;
    url: string;
  };
}

const NOTSUPPORTED = "#64748B";

export interface LanguageObject {
  languageName: string;
  percentageUsed: number;
}

interface CardHorizontalBarChartProps {
  languageList: LanguageObject[];
  withDescription: boolean;
}

const languageToColor: AllSimpleColors = colors as AllSimpleColors;

const CardHorizontalBarChart = ({ languageList, withDescription }: CardHorizontalBarChartProps): JSX.Element => {
  const sortedLangArray = languageList.sort((a, b) => b.percentageUsed - a.percentageUsed);

  return (
    <div className="flex flex-col gap-1 min-w-[120px]">
      <div className="flex items-center w-full justify-end rounded-full gap-0.5 overflow-hidden">
        {sortedLangArray.map(({ languageName, percentageUsed }, index) => {
          return (
            index < 5 && (
              <div
                key={index}
                className="h-2 transition-all duration-500 ease-in-out"
                style={{
                  width: `${percentageUsed}%`,
                  backgroundColor: languageToColor[languageName]
                    ? (languageToColor[languageName].color as string)
                    : NOTSUPPORTED,
                }}
              >
                <span className="sr-only">{`${languageName} ${percentageUsed}%`}</span>
              </div>
            )
          );
        })}
      </div>
      {withDescription && (
        <div className="flex gap-2 w-32 items-baseline">
          <div
            className={"w-2 h-2 rounded-full"}
            style={{
              backgroundColor: languageToColor[sortedLangArray[0]?.languageName]
                ? (languageToColor[sortedLangArray[0]?.languageName].color as string)
                : NOTSUPPORTED,
            }}
          />
          {/* Always display the most-used language (first item in sorted array) instead of interactive language selection */}
          <Tooltip className="max-w-[100px]" content={sortedLangArray[0]?.languageName}>
            <Text className="!text-xs !truncate !font-semibold !text-light-slate-11">
              {sortedLangArray[0]?.languageName}
            </Text>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default CardHorizontalBarChart;
