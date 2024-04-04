import { QueryDoc } from "@/utils/queryDocuments";
import React, { ReactNode, useMemo } from "react";
import { DataTable, ActivityIndicator } from "react-native-paper";
import { entries, values } from "remeda";

export type CellProps = Partial<React.ComponentProps<typeof DataTable.Cell>>;
export type HeaderProps = Partial<React.ComponentProps<typeof DataTable.Title>>;

export interface ColumnConfig<T> {
  headerTitle?: string;
  cellProps?: CellProps;
  headerProps?: HeaderProps;
  customRender?: (val: T) => ReactNode;
}

export type ColumnSpec<T> = Partial<Record<keyof T, ColumnConfig<T[keyof T]>>>;
export type PaginationProps = React.ComponentProps<typeof DataTable.Pagination>;

export interface QueryTableProps<T extends QueryDoc> {
  queryData: T[];
  queryLoading?: boolean;
  rowKeyField: keyof T & (string | number);
  columns: ColumnSpec<T>;
  paginationProps: PaginationProps;
  defaultTableSize?: number;
}

interface CellHeader {
  title?: string;
  headerProps?: HeaderProps;
}

export default function QueryTable<T extends QueryDoc>({
  queryData,
  queryLoading,
  rowKeyField,
  columns,
  paginationProps,
  defaultTableSize,
}: QueryTableProps<T>) {
  const tableHeaders: CellHeader[] = useMemo(
    () =>
      values(columns).map((colSpec) => ({
        title: colSpec?.headerTitle,
        headerProps: colSpec?.cellProps,
      })),
    [columns]
  );

  return (
    <DataTable>
      <DataTable.Header>
        {tableHeaders.map((tableHeader) => (
          <DataTable.Title key={tableHeader.title} {...tableHeader.headerProps}>
            {tableHeader.title}
          </DataTable.Title>
        ))}
      </DataTable.Header>

      {queryLoading ? (
        <ActivityIndicator
          className="py-2"
          size={"large"}
          animating={true}
        ></ActivityIndicator>
      ) : (
        queryData.map((dataVal) => (
          <DataTable.Row key={dataVal[rowKeyField]}>
            {entries(dataVal).map(([fieldKey, fieldVal]) => {
              if (fieldKey in columns) {
                const columnSpec = columns[fieldKey];
                const renderFn = columnSpec?.customRender;
                const fieldContent = renderFn ? renderFn(fieldVal) : fieldVal;
                const cellProps = columnSpec?.cellProps;

                return (
                  <DataTable.Cell
                    key={`${dataVal[rowKeyField]}-${fieldKey}`}
                    {...cellProps}
                  >
                    {fieldContent}
                  </DataTable.Cell>
                );
              }
            })}
          </DataTable.Row>
        ))
      )}

      <DataTable.Pagination {...paginationProps} />
    </DataTable>
  );
}
