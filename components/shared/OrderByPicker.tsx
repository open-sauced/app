import { useRouter } from "next/router";
import { ComponentProps } from "react";
import SingleSelect from "components/atoms/Select/single-select";

type Options = ComponentProps<typeof SingleSelect>["options"];

interface OrderByPickerProps {
  // TODO: type this better
  onOrderDirectionChanged?: (value: string) => void;
  options: Options;
}

export const OrderByPicker = ({ onOrderDirectionChanged: onOrderByChanged, options }: OrderByPickerProps) => {
  const router = useRouter();
  const orderBy = router.query.orderby || "";

  const onDefaultOrderDirectionChanged = (orderBy: string) => {
    router.push({ query: { ...router.query, orderBy } });
    onOrderByChanged?.(orderBy);
  };

  return (
    <label className="w-max font-semibold">
      <span className="sr-only">Order by:</span>
      <SingleSelect
        insetLabel="Order by:"
        onValueChange={onDefaultOrderDirectionChanged}
        value={`${orderBy}`}
        options={options}
      />
    </label>
  );
};
