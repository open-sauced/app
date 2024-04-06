import { useRouter } from "next/router";
import SingleSelect from "components/atoms/Select/single-select";

export type DayRange = 7 | 30 | 90;

const dayRanges: { label: `${DayRange}d`; value: `${DayRange}` }[] = [
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
    <label className="w-max font-semibold">
      <span className="sr-only">Period:</span>
      <SingleSelect
        insetLabel="Period:"
        onValueChange={onDefaultDayRangeChanged}
        value={`${dayRange}`}
        options={dayRanges}
      />
    </label>
  );
};
