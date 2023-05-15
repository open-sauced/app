import React from "react";

import Title from "components/atoms/Typography/title";

interface ContextClueCardProps extends React.ComponentProps<"div"> {
  title: string;
  desc: string;
}
const ContextClueCard = ({ title, desc }: ContextClueCardProps) => {
  return (
    <div className="bg-white relative border overflow-hidden inline-flex w-full flex-col gap-3 md:gap-8 border-light-slate-6 p-6 rounded-lg">
      <div className="absolute h-2 bg-orange-500 right-0 left-0 top-0"></div>
      <Title className="!text-3xl md:!text-5xl" level={1}>
        {title}
      </Title>
      <p className="text-light-slate-11 text-sm md:text-base">{desc}</p>
    </div>
  );
};

export default ContextClueCard;
