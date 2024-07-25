import type { ReactNode } from "react";
import type { Row, Header } from "../types/table";

const renderCell = <TRow extends string>(row: Row<TRow>, head: Header<TRow>) => {
  let result: ReactNode;

  const cell = row[head.id];

  switch(cell.type) {
    case "text":
      result = (
        <p>{cell.data}</p>
      );
      break;

    case "custom":
      result = (
        <>{cell.data}</>
      );
      break;
  }
  return result;
};


export { renderCell };
