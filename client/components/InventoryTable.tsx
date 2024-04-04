import {
  GetPoleCountDocument,
  GetPolesDocument,
  Pole,
  PoleHistory,
} from "@/generated";
import { useQuery } from "@apollo/client";
import { useMemo, useState } from "react";
import QueryTable, {
  ColumnConfig,
  ColumnSpec,
  PaginationProps,
} from "./QueryTable";
import { tableFormatString } from "@/utils/dates";
import { createPageLabel } from "@/utils/tables";

const columns: ColumnSpec<Pole> = {
  id: {
    headerTitle: "Pole ID",
    cellProps: { style: { maxWidth: 48 } },
    headerProps: { style: { maxWidth: 48 } },
  },
  length: {
    headerTitle: "L",
    cellProps: { style: { maxWidth: 48 } },
    headerProps: { style: { maxWidth: 48 } },
  },
  cm: {
    headerTitle: "CM",
    cellProps: { style: { maxWidth: 48 } },
    headerProps: { style: { maxWidth: 48 } },
  },
  weight: {
    headerTitle: "W",
    cellProps: { style: { maxWidth: 48 } },
    headerProps: { style: { maxWidth: 48 } },
  },
  flex: {
    headerTitle: "F",
    cellProps: { style: { maxWidth: 64 } },
    headerProps: { style: { maxWidth: 64 } },
  },
  serialNumber: {
    headerTitle: "SN",
  },
  status: {
    headerTitle: "Status",
  },
  dop: {
    headerTitle: "DOP",
    customRender: (val) => tableFormatString(val),
  } as ColumnConfig<any>,
  note: {
    headerTitle: "Notes",
  },
  history: {
    headerTitle: "History",
    customRender: (vals) => {
      return vals.map((val) => val.comment).join(" ");
    },
  } as ColumnConfig<PoleHistory[]>,
  nfc: {
    headerTitle: "NFC",
  },
};

export default function InventoryTable() {
  const [page, setPage] = useState(0);
  const [itemsPerPageList] = useState([10, 20, 50, 100]);
  const [itemsPerPage, onItemsPerPageChange] = useState(itemsPerPageList[0]);

  const poleCountResult = useQuery(GetPoleCountDocument);

  const poleCount = poleCountResult.data?.aggregatePole._count?._all ?? 0;

  const { data, loading, error } = useQuery(GetPolesDocument, {
    variables: {
      skip: itemsPerPage * page,
      take: itemsPerPage,
    },
  });

  const numPages = useMemo(
    () => Math.ceil(poleCount / itemsPerPage),
    [poleCount, itemsPerPage]
  );

  const paginationProps: PaginationProps = {
    page: page,
    numberOfPages: numPages,
    onPageChange: (page) => setPage(page),
    numberOfItemsPerPage: itemsPerPage,
    label: `${createPageLabel(page, itemsPerPage, poleCount)}`,
    numberOfItemsPerPageList: itemsPerPageList,
    onItemsPerPageChange: onItemsPerPageChange,
    showFastPaginationControls: true,
    selectPageDropdownLabel: "Rows Per Page",
  };

  return (
    <QueryTable
      queryData={data?.poles ?? []}
      queryLoading={loading}
      columns={columns}
      rowKeyField={"id"}
      paginationProps={paginationProps}
      defaultTableSize={(itemsPerPage + 2) * 50}
    ></QueryTable>
  );
}
