import React from "react";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import IconButton from "components/atoms/IconButton/icon-button";

interface SelectableTableProps {
  title: string;
  rows?: Object[];
}

const SelectableTable: React.FC<SelectableTableProps> = ({ title }) => {
  return (
    <Card>
      <>
        <div className="w-full flex justify-between pb-5">
          <div>
            <Text className="!text-light-slate-12 font-medium">
              {title}
            </Text>
          </div>
          <div>
            <IconButton />
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