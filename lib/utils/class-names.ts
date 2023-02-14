import { ClassValue, clsx } from "clsx";

export function classNames(...inputs: ClassValue[]) {
  return clsx(inputs);
}
