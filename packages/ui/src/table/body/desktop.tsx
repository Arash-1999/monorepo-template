"use client";
import type { TableBodyProps } from "../../types/table";
import { renderCell } from "../render-cell";

const Desktop = <TRow extends string>({headers, data, sortHandler}: TableBodyProps<TRow>) => {
  return (
      <table>
        <thead>
          <tr>
            {headers.map((head) => (
              <th
                key={head.id}
              >
                <div>
                  <span>
                    {head.name}
                  </span>
                  {head.sortable ? (
                    <button
                      onClick={sortHandler(head.sortable.key)}
                    >
                    </button>
                  ) : null}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, i) => (
            <tr key={`row-${i}`}>
              {headers.map((head, j) => (
                <td key={`cell-${i}-${j}`}>
                    {renderCell(row, head)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  );
};

export default Desktop;
