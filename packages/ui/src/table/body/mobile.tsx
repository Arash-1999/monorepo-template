import { TableBodyProps } from "../../types/table";
import { styled } from "@mui/material";

const Mobile = <TRow extends string>({ data, headers }: TableBodyProps<TRow>) => {
  return (
    <>
      <ListContainer>
        {data.map((cell, i) => (
          <li key={`cell-${i}`}>
            <div>
              {headers.filter(head => head.primary).map((head) => (
                <div key={head.id}>
                  {cell[head.id].data}
                </div>
              ))}
            </div>

            <hr />

            {headers.filter((head) => !head.primary).map((head) => (
              <div key={`${head.id}`} className="list_row">
                <p>
                  {head.name}
                </p>

                <p>
                  {cell[head.id].data}
                </p>
              </div>
            ))}
          </li>
        ))}
      </ListContainer>
    </>
  );
};


const ListContainer = styled("ul")(({ theme }) => `
  list-style-type: none;
  padding: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    padding: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.divider};
  }
  .list_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    margin: 0;
  }
`);
export default Mobile;
