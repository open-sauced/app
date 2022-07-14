import React from "react";
import Card from "components/atoms/Card/card";
import Text from "components/atoms/Typography/text";
import Icon from "components/atoms/Icon/icon";
import IconButton from "components/atoms/IconButton/icon-button";
import ForkIcon from "public/icons/fork-icon.svg";
import StarIcon from "public/icons/star-icon.svg";
import Person from "public/icons/person.svg";
import Icon3 from "public/icons/icon3.svg";

interface SelectableTableProps {
  title: string;
  rows?: Object[];
  ColumnIcons?: "participants";
}

const iconSuite = {
  participants: {
    star: StarIcon,
    fork: ForkIcon,
    person: Person,
    icon3: Icon3
  }
};

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
          <table className="table-auto w-full">
            <thead className="border-b-[1px]">
              <tr>
                <th className="p-2">
                            
                </th>
                <th className="p-2">
                  <Icon IconImage={iconSuite.participants.star} />
                </th>
                <th className="p-2">
                  <Icon IconImage={iconSuite.participants.fork} />
                </th>
                <th className="p-2">
                  <Icon IconImage={iconSuite.participants.person} />
                </th>
                <th className="p-2">
                  <Icon IconImage={iconSuite.participants.icon3} />
                </th>
              </tr>
              <tr className="h-3"></tr>
            </thead>
            <tbody>
              <tr className="h-3"></tr>
              <tr>
                <td className="text-left p-2">
                            freecodecamp
                </td>
                <td className="p-2">
                            +100%
                </td>
                <td className="p-2">
                            +20%
                </td>
                <td className="p-2">
                            +40%
                </td>
                <td className="p-2">
                            +5%
                </td>
              </tr>
              <tr>
                <td className="text-left p-2">
                            free-programming-books
                </td>
                <td className="p-2">
                            +60%
                </td>
                <td className="p-2">
                            +40%
                </td>
                <td className="p-2">
                            +40%
                </td>
                <td className="p-2">
                            +20%
                </td>
              </tr>
              <tr>
                <td className="text-left p-2">
                            material-ui
                </td>
                <td className="p-2">
                            +30%
                </td>
                <td className="p-2">
                            -10%
                </td>
                <td className="p-2">
                            +5%
                </td>
                <td className="p-2">
                            -10%
                </td>
              </tr>
              <tr>
                <td className="text-left p-2">
                            java-design-patterns
                </td>
                <td className="p-2">
                            +40%
                </td>
                <td className="p-2">
                            -10%
                </td>
                <td className="p-2">
                            +10%
                </td>
                <td className="p-2">
                            -15%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </Card>
  );
};

export default SelectableTable;