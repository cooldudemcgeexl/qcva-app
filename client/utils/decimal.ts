import Decimal from "decimal.js";

export function tryParseDecimal(val: any) {
  try {
    return new Decimal(val);
  }
  catch {
    return undefined
  }
}

export function moneyFormat(val: any): string {
  const decimalValue = tryParseDecimal(val) ?? new Decimal(0);
  return `$${decimalValue}`
}