import React from "react";
import SkeletonWrapper from "components/atoms/SkeletonLoader/skeleton-wrapper";

interface SidebarGroupWrapperProps {
  isLoading?: boolean;
  children?: React.ReactNode;
}
const SidebarGroupWrapper = ({ isLoading, children }: SidebarGroupWrapperProps) => {
  return (
    <div className="w-full px-2 -mt-4">
      {isLoading ? (
        <>
          <SkeletonWrapper height={20} radius={5} count={2} classNames="w-48" />
          <SkeletonWrapper height={20} radius={5} count={1} classNames="w-28" />
        </>
      ) : (
        children
      )}
    </div>
  );
};

export default SidebarGroupWrapper;
