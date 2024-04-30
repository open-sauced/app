import React from "react";

const useLockBody = () => {
  React.useLayoutEffect((): (() => void) => {
    const originalStyle: string = window.getComputedStyle(document.body).overflow;
    const oldWidth = document.documentElement.clientWidth;
    const header = document.getElementsByTagName("header")?.[0];
    const paddingRight: string = window.getComputedStyle(header).paddingRight;
    const paddingRightInPixel = Number(paddingRight.slice(0, -2)) || 0;

    document.body.style.overflow = "hidden";

    const newWidth = document.documentElement.clientWidth;
    const scrollbarWidth = Math.max(0, newWidth - oldWidth);
    document.body.style.marginRight = `${scrollbarWidth}px`;
    header.style.paddingRight = `${scrollbarWidth + paddingRightInPixel}px`;

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.style.marginRight = "0";
      header.style.paddingRight = paddingRight;
    };
  }, []);
};

export default useLockBody;
