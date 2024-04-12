import { useRouter } from "next/router";
import SingleSelect from "components/atoms/Select/single-select";

export type LimitOptions = 10 | 20 | 30 | 40 | 50;

const limitOptions: { label: string; value: `${LimitOptions}` }[] = [
  { label: "10 per page", value: "10" },
  { label: "20 per page", value: "20" },
  { label: "30 per page", value: "30" },
  { label: "40 per page", value: "40" },
  { label: "50 per page", value: "50" },
];

interface LimitPickerProps {
  onLimitChanged?: (value: string) => void;
}

export const LimitPicker = ({ onLimitChanged }: LimitPickerProps) => {
  const router = useRouter();
  const limit = (Number(router.query.limit) || 10) as LimitOptions;

  const onDefaultLimitChanged = (value: string) => {
    router.push({ query: { ...router.query, page: 1, limit: value } });
    onLimitChanged?.(value);
  };

  return (
    <label className="w-max font-semibold">
      <span className="sr-only">Limit:</span>
      <SingleSelect
        insetLabel="Showing:"
        onValueChange={onDefaultLimitChanged}
        value={`${limit}`}
        options={limitOptions}
      />
    </label>
  );
};
