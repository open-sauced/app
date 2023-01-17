import '../styles/globals.css';
import * as NextImage from "next/legacy/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => typeof props.src === 'string' ? (
    <OriginalNextImage {...props} unoptimized blurDataURL={props.src} />
  ) : (
    <OriginalNextImage {...props} unoptimized />
  ),
});

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}