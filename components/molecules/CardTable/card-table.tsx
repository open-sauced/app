import Text from "components/atoms/Typography/text";

const CardTable = () => {
  return (
    <div>
      <div className="flex gap-2 bg-light-slate-3 rounded-md px-8 py-4">
        <div className="w-3/5">
          <Text>
            Latest PRs
          </Text>
        </div>
        <div className="flex justify-end w-[calc(10%-4px)]">test</div>
        <div className="flex justify-end w-[calc(10%-4px)]">test</div>
        <div className="flex justify-end w-[calc(10%-4px)]">test</div>
        <div className="flex justify-end w-[calc(10%-4px)]">test</div>
      </div>
    </div>
  );
};

export default CardTable;