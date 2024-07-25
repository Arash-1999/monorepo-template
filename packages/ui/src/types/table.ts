import type { ReactNode } from "react";

// TODO: add other types for table cell
type TextCell = {
    type: "text";
    data: string | number;
};
type CustomCell = {
    type: "custom";
    data: ReactNode;
}

type Cell = TextCell |
    CustomCell;

type Header<TRow extends string> = {
    id: TRow;
    name: string;
    hidden?: boolean;
    sortable?: {
        key: string;
    };
};

type Row<TIds extends string> = {
    [key in TIds]: Cell;
};

type TableConfig = Partial<{
  breakpoint: string; // css <width> value
  responsive: boolean;
  selectable: {
      key: string;
  };
  pagination: {
  };
}>;

type TableBodyProps<TRow extends string> = {
  data: Row<TRow>[];
  headers: Header<TRow>[];
  sortHandler: (key: string) => () => void;
};

export type {
  TableConfig,
  Row,
  Header,
  TableBodyProps,
}
