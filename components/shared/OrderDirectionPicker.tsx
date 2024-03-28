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
}

export const OrderDirectionPicker = ({ onOrderDirectionChanged }: OrderDirectionProps) => {
  const router = useRouter();
  const orderDirection = router.query.orderDirection || ("asc" as OrderDirection);

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
