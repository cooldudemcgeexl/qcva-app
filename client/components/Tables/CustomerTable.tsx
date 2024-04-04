import {
  GetCustomerCountDocument,
  GetCustomersDocument,
  Customer,
} from "@/generated";
import { useFocusEffect } from "expo-router";
import { useQuery, useLazyQuery } from "@apollo/client";
import { useCallback, useMemo, useState } from "react";
import QueryTable, { ColumnSpec, PaginationProps } from "../QueryTable";

const columns: ColumnSpec<Customer> = {
  firstName: {
    headerTitle: "First",
  },
  lastName: {
    headerTitle: "Last/School",
  },
  address: {
    headerTitle: "Address",
  },
  city: {
    headerTitle: "City",
  },
  state: {
    headerTitle: "Zip",
  },
  phone: {
    headerTitle: "Phone",
  },
  email: {
    headerTitle: "Email",
  },
};

export default function CustomerTable() {
  const [page, setPage] = useState(0);
  const [itemsPerPageList] = useState([10, 20, 50]);
  const [itemsPerPage, onItemsPerPageChange] = useState(itemsPerPageList[0]);

  const customerCountResult = useQuery(GetCustomerCountDocument);

  const customerCount =
    customerCountResult.data?.aggregateCustomer._count?._all ?? 0;

  const [getCustomers, { data, loading, error }] = useLazyQuery(
    GetCustomersDocument,
    {
      variables: {
        skip: itemsPerPage * page,
        take: itemsPerPage,
      },
    }
  );

  useFocusEffect(
    useCallback(() => {
      getCustomers();
    }, [])
  );

  const numPages = useMemo(
    () => Math.ceil(customerCount / itemsPerPage),
    [customerCount, itemsPerPage]
  );

  const paginationProps: PaginationProps = {
    page: page,
    numberOfPages: numPages,
    onPageChange: (page) => setPage(page),
    numberOfItemsPerPageList: itemsPerPageList,
    numberOfItemsPerPage: itemsPerPage,
    onItemsPerPageChange: onItemsPerPageChange,
    showFastPaginationControls: true,
    selectPageDropdownLabel: "Rows Per Page",
  };

  return (
    <QueryTable
      queryData={data?.customers ?? []}
      queryLoading={loading}
      columns={columns}
      rowKeyField="id"
      paginationProps={paginationProps}
    ></QueryTable>
  );
}
