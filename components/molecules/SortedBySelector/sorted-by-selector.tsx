import ContextFilterButton from "components/atoms/ContextFilterButton/context-filter-button";

import React, { useEffect, useRef, useState } from "react";
import Icon from "../../atoms/Icon/icon";
import cancelIcon from "public/x-circle.svg";
import Radio from "components/atoms/Radio/radio";
import humanizeNumber from "lib/utils/humanizeNumber";
import getFilterKey from "lib/utils/get-filter-key";

interface SortedBySelectorProps {
  handleCancelClick: () => void;
  className?: string;
  selected?: string;
}

const SortedOrders = {
  "name": "Repository",
  "prsCount": "PR Count",
  "prVelocityCount": "PR Velocity",
  "spamPrsCount": "Spam"
};

const SortedBySelector: React.FC<SortedBySelectorProps> = ({
  handleCancelClick,
  selected
}) => {

  if (!selected) return null;

  return (
    <div className="max-w-max relative">
      <ContextFilterButton isSelected={!!selected}>
        <div className="flex">
          <span className="text-dark-slate-10">Sorted by:</span>
          <div className="flex items-center ml-1 text-light-slate-12">
            {SortedOrders[(selected as keyof typeof SortedOrders)]}

            <Icon
              className="ml-2 cursor-pointer"
              IconImage={cancelIcon}
              onClick={() => handleCancelClick()}
            />
          </div>
        </div>
      </ContextFilterButton>
    </div>
  );
};

export default SortedBySelector;
