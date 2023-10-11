import { SpringValue, to } from "@react-spring/web";

/**
 There are several utility functions in the @nico/* packages that are ESM only. If you are
 unable to dynamically import them for usage in your project, you can copy the source code
here and use this instead.

You'll know if you need to do this if you see an error like this:

 Error: require() of ES Module /Users/nicktaylor/dev/work/app/node_modules/@nivo/treemap/node_modules/d3-color/src/index.js from /Users/nicktaylor/dev/work/app/node_modules/@nivo/treemap/node_modules/@nivo/colors/dist/nivo-colors.cjs.js not supported.
Instead change the require of index.js in /Users/nicktaylor/dev/work/app/node_modules/@nivo/treemap/node_modules/@nivo/colors/dist/nivo-colors.cjs.js to a dynamic import() which is available in all CommonJS modules.

**/

// See https://github.com/plouc/nivo/blob/master/packages/treemap/src/transitions.ts#L6-L7
export function htmlNodeTransform(x: SpringValue<number>, y: SpringValue<number>) {
  return to([x, y], (x, y) => `translate(${x}px, ${y}px)`);
}
