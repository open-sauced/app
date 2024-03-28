import { useRouter } from "next/router";
import SingleSelect from "components/atoms/Select/single-select";

export type OrderDirection = "ASC" | "DESC";

const orderOptions = [
  {
    label: "Ascending",
    value: "ASC",
  },
  {
    label: "Descending",
    value: "DESC",
  },
];

interface OrderDirectionProps {
  onOrderDirectionChanged?: (value: OrderDirection) => void;
  defaultValue: OrderDirection;
}

export const OrderDirectionPicker = ({ onOrderDirectionChanged, defaultValue }: OrderDirectionProps) => {
  const router = useRouter();
  const orderDirection = router.query.orderDirection || defaultValue;

  const onDefaultOrderDirectionChanged = (value: string) => {
    router.push({ query: { ...router.query, orderDirection: value } });
    onOrderDirectionChanged?.(value as OrderDirection);
  };

  return (
    <label className="w-max font-semibold">
      <span className="sr-only">Direction:</span>
      <SingleSelect
        insetLabel="Direction:"
        onValueChange={onDefaultOrderDirectionChanged}
        value={`${orderDirection}`}
        options={orderOptions}
      />
    </label>
  );
};
