import { SpringValue } from "@react-spring/web";
import { useEffect, useState } from "react";

export type HtmlNodeTransform = (x: SpringValue<number>, y: SpringValue<number>) => any;

/**
 * This hook is used to get the `htmlNodeTransform` function from the `@nivo/treemap`
 * library, an ESM only library that is not compatible with Next.js unless it is imported
 * dynamically.
 *
 * This function is used to animate the treemap nodes.
 *
 * @returns The `htmlNodeTransform` function from the `@nivo/treemap` library.
 */
export const useHtmlNodeTransform = () => {
  const [htmlNodeTransform, setHtmlNodeTransform] = useState<HtmlNodeTransform | null>(null);

  useEffect(() => {
    import("@nivo/treemap").then((nivo) => {
      const { htmlNodeTransform: transform } = nivo;
      setHtmlNodeTransform(transform);
    });
  }, []);

  return htmlNodeTransform;
};
