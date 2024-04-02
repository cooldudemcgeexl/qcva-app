import { QueryDoc } from "@/utils/queryDocuments";
import React, { useMemo } from "react";
import { DataTable } from "react-native-paper";
import { entries, values } from "remeda";

export type CellProps = React.ComponentProps<typeof DataTable.Cell>;

interface ColumnConfig {
  headerTitle?: string;
  columnProps?: CellProps;
}

export type ColumnSpec<T> = Partial<Record<keyof T, ColumnConfig>>;
export type PaginationProps = React.ComponentProps<typeof DataTable.Pagination>;

export interface QueryTableProps<T extends QueryDoc> {
  queryData: T[];
  rowKeyField: keyof T & (string | number);
  columns: ColumnSpec<T>;
  paginationProps: PaginationProps;
}

export default function QueryTable<T extends QueryDoc>({
  queryData,
  rowKeyField,
  columns,
  paginationProps,
}: QueryTableProps<T>) {
  const tableHeaders = useMemo(
    () => values(columns).map((colSpec) => colSpec?.headerTitle),
    [columns]
  );

  return (
    <DataTable>
      <DataTable.Header>
        {tableHeaders.map((tableHeader) => (
          <DataTable.Title key={tableHeader}>{tableHeader}</DataTable.Title>
        ))}
      </DataTable.Header>

      {queryData.map((dataVal) => (
        <DataTable.Row key={dataVal[rowKeyField]}>
          {entries(dataVal).map(([fieldKey, fieldVal]) => {
            if (fieldKey in columns) {
              return (
                <DataTable.Cell key={`${dataVal[rowKeyField]}-${fieldKey}`}>
                  {fieldVal}
                </DataTable.Cell>
              );
            }
          })}
        </DataTable.Row>
      ))}

      <DataTable.Pagination {...paginationProps} />
    </DataTable>
  );
}
