import Skeleton from "react-loading-skeleton";

interface SkeletonWrapperProps {
  classNames?: string;
  count?: number;
  height: number;
  width?: number;
  radius?: number;
}

const SkeletonWrapper = ({ classNames, count, width, height, radius }: SkeletonWrapperProps): JSX.Element => {
  const skeletonArray = Array(count || 1).fill(true);
  return (
    <>
      {skeletonArray.map((skeleton, index) => (
        <div className={classNames || ""} key={index}>
          <Skeleton height={height} width={width} borderRadius={radius} count={1} />
        </div>
      ))}
    </>
  );
};

export default SkeletonWrapper;
