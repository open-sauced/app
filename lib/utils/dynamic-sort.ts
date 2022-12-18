type sortArg<T> = keyof T | `-${string & keyof T}`

/**
 * This function is used to sort an array of objects by a key.
 * @param arg the key to sort by, or the key prefixed with a dash to sort in descending order
 * @returns a number to be used in the sort function
 */
function dynamicSort<T>(arg: sortArg<T>) {
  let sortOrder = 1;
  let key: keyof T;

  if(typeof arg === "string" && arg.startsWith("-")) {
    sortOrder = -1;
    key = arg.substring(1) as keyof T;
  } else {
    key = arg as keyof T;
  }

  return function (a: T,b: T) {
    const result = (a[key] < b[key]) ? -1 : (a[key] > b[key]) ? 1 : 0;
    return result * sortOrder;
  };
}

export default dynamicSort;
