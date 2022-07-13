import React from "react";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";

interface SelectableTableProps {
  title: string;
  rows?: Object[];
}

const SelectableTable: React.FC<SelectableTableProps> = ({ title }) => {
  return (
    <Card>
      <>
        <div className="w-full flex justify-between">
          <div>
            <Text className="!text-light-slate-12 font-medium">
              {title}
            </Text>
          </div>
          <div>
            test
          </div>
        </div>
        <div>
          test
        </div>
      </>
    </Card>
  );
};

export default SelectableTable;