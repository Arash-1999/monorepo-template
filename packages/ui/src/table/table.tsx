import type { TableConfig, Row, Header, } from "../types/table";
import { useMatchMedia } from "../utils";
import DesktopBody from "./body/desktop";
import MobileBody from "./body/mobile";

type TableProps<TRow extends string> = {
  config: TableConfig;
  data: Row<TRow>[];
  headers: Header<TRow>[];
  id: string;
};

const Table = <TRow extends string>({
  config,
  data,
  headers,
  id,
}: TableProps<TRow>) => {
  const isMobile = useMatchMedia(`(max-width: ${config.breakpoint || "768px"};)`);

  const sortHandler = (key: string) => () => {
    console.log(key);
  };

  return (
    <section id={id}>
      {/* table */}
      {isMobile ? (
        <MobileBody
            data={data}
            headers={headers}
            sortHandler={sortHandler}
        />
      ) : (
        <DesktopBody
          data={data}
          headers={headers}
          sortHandler={sortHandler}
        />
      )}

      {/* pagination */}
      {config.pagination ? (
        <div>
        </div>
      ) : null}
    </section>
  );
};

export default Table;
