import { OrderItem } from "@/generated";
import { map, pipe, unique } from "remeda";

export function createPageLabel(page: number, itemsPerPage: number, totalItems: number) {
  const startItem = (page * itemsPerPage);
  const endItem = Math.min((page + 1) * itemsPerPage, totalItems);
  return `${startItem + 1}-${endItem} of ${totalItems}`
}

export type OrderType = "Rental" | "Sale" | "Mixed";

export function summarizeOrderType(orderItems: OrderItem[]): OrderType {
  const uniqueVals = pipe(
    orderItems,
    map((orderItem) => orderItem.orderType),
    unique()
  );
  if (uniqueVals.includes("Sale")) {
    if (uniqueVals.length > 1) {
      return "Mixed";
    }
    return "Sale";
  }
  return "Rental";
}