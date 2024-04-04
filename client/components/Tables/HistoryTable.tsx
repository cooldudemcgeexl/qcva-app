import { allPass, map, pipe, unique, uniqueBy } from "remeda";
import QueryTable, {
  ColumnConfig,
  ColumnSpec,
  PaginationProps,
} from "../QueryTable";

import {
  Order,
  GetOrdersQuery,
  OrderItem,
  Customer,
  GetPoleCountDocument,
  GetOrderCountDocument,
  GetOrdersDocument,
  SortOrder,
} from "@/generated";
import { longTableFormatString } from "@/utils/dates";
import { createPageLabel, summarizeOrderType } from "@/utils/tables";
import { moneyFormat } from "@/utils/decimal";
import { useCallback, useMemo, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useFocusEffect } from "expo-router";

type OrderQueryData = GetOrdersQuery["orders"][number];

const columns: ColumnSpec<OrderQueryData> = {
  orderItems: {
    headerTitle: "Order Type",
    customRender: (vals) => summarizeOrderType(vals),
  } as ColumnConfig<OrderItem[]>,
  customer: {
    headerTitle: "Customer",
    customRender: (val) => `${val.firstName} ${val.lastName}`,
  } as ColumnConfig<Customer>,
  orderDate: {
    headerTitle: "Order Date",
    customRender: (val) => longTableFormatString(val),
  },
  orderTotal: {
    headerTitle: "Order Total",
    customRender: (val) => moneyFormat(val),
  },
};

export default function HistoryTable() {
  const [page, setPage] = useState(0);
  const [itemsPerPageList] = useState([5, 10, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(itemsPerPageList[0]);

  const orderCountResult = useQuery(GetOrderCountDocument);
  const orderCount = orderCountResult.data?.aggregateOrder._count?._all ?? 0;

  const [getOrders, { data, loading, error }] = useLazyQuery(
    GetOrdersDocument,
    {
      variables: {
        skip: itemsPerPage * page,
        take: itemsPerPage,
        orderBy: [{ orderDate: SortOrder.Asc }],
      },
    }
  );

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );

  const numPages = useMemo(
    () => Math.ceil(orderCount / itemsPerPage),
    [orderCount, itemsPerPage]
  );

  const paginationProps: PaginationProps = {
    page: page,
    numberOfPages: numPages,
    onPageChange: (page) => setPage(page),
    numberOfItemsPerPage: itemsPerPage,
    label: createPageLabel(page, itemsPerPage, orderCount),
    numberOfItemsPerPageList: itemsPerPageList,
    onItemsPerPageChange: onItemsPerPageChange,
    showFastPaginationControls: true,
    selectPageDropdownLabel: "Rows Per Page",
  };

  return (
    <QueryTable
      queryData={data?.orders ?? []}
      queryLoading={loading}
      columns={columns}
      rowKeyField={"id"}
      paginationProps={paginationProps}
    ></QueryTable>
  );
}
