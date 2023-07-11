/**
 * A react component that will ensure that its min-height is the same as the screen height.
 * This is not possible with pure css because some mobile browsers don't account for the top and bottom bars
 * when calculating `vh`.
 * see https://dev.to/nirazanbasnet/dont-use-100vh-for-mobile-responsive-3o97
 */

import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useWindowSize } from "react-use";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
}

export default function FullHeightContainer(props: Props) {
  const { children, className, ...rest } = props;
  const { height: innerHeight } = useWindowSize();
  const [minHeight, setMinHeight] = useState<string>("100vh");

  useEffect(() => {
    setMinHeight(`${innerHeight}px`);
  }, [innerHeight]);

  return (
    <div
      className={clsx("grid min-h-screen max-h-screen", className)}
      style={{ minHeight: minHeight }}
      {...rest}
    >
      {children}
    </div>
  );
}
