export function isDefined<T>(val: T | undefined): val is T {
  return val !== undefined;
}

export function isDefinedAndTrue<T extends boolean>(val: T | undefined) {
  return isDefined(val) && val;
}
