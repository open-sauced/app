import Skeleton from "react-loading-skeleton";

interface SkeletonWrapperProps {
  classNames?: string;
  count?: number;
  height?: number;
  width?: number;
  radius?: number;
}

const SkeletonWrapper = ({ classNames, count = 1, width, height, radius }: SkeletonWrapperProps): JSX.Element => {
  const skeletonArray = Array(count).fill(true);
  return (
    <>
      {skeletonArray.map((_, index) => {
        return !height ? (
          <div className="react-loading-skeleton" />
        ) : (
          <div className={classNames}>
            <Skeleton height={height} width={width} borderRadius={radius} count={1} />
          </div>
        );
      })}
    </>
  );
};

export default SkeletonWrapper;
