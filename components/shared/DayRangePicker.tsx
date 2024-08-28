import { useRouter } from "next/router";
import SingleSelect from "components/atoms/Select/single-select";

export type DayRange = 7 | 30 | 90 | 180 | 360;

const dayRanges: { label: string; value: `${DayRange}` }[] = [
  {
    label: "7d",
    value: "7",
  },
  {
    label: "30d",
    value: "30",
  },
  {
    label: "90d",
    value: "90",
  },
  {
    label: "6mo",
    value: "180",
  },
  {
    label: "1yr",
    value: "360",
  },
];

interface DayRangePickerProps {
  onDayRangeChanged?: (value: string) => void;
}

export const DayRangePicker = ({ onDayRangeChanged }: DayRangePickerProps) => {
  const router = useRouter();
  const dayRange = (Number(router.query.range) || 30) as DayRange;

  const onDefaultDayRangeChanged = (value: string) => {
    router.push({ query: { ...router.query, range: value } });
    onDayRangeChanged?.(value);
  };

  return (
    <label className="w-fit font-semibold">
      <span className="sr-only">Range:</span>
      <SingleSelect
        insetLabel="Range:"
        onValueChange={onDefaultDayRangeChanged}
        value={`${dayRange}`}
        options={dayRanges}
      />
    </label>
  );
};
