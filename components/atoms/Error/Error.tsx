import React from "react";
import clsx from "clsx";
import Text from "@supabase/ui/dist/cjs/components/Typography/Text";
import ErrorIcon from "img/errorIcon.svg";
import Icon from "../Icon/icon";

interface ErrorProps {
  errorMessage?: string;
  fullWidth?: boolean;
}

const Error: React.FC<ErrorProps> = ({ errorMessage, fullWidth = false }) => {
  const wideStyle = fullWidth ? "flex" : "inline-flex ";

  return (
    <div className={clsx(wideStyle, "rounded-md border border-light-red-6 bg-light-red-4 p-2 gap-x-2 items-center")}>
      <Icon IconImage={ErrorIcon} />

      <Text className="!text-light-red-10 !text-xs font-semibold">{errorMessage || "Something went wrong!"}</Text>
    </div>
  );
};

export default Error;
