import { type GridProps } from "@mui/material";

const gridProps: Record<"item" | "container", GridProps> = {
  item: {
    xs: 12,
    md: 6,
  },
  container: {
    spacing: 2,
    sx: {
      pb: "16px",
    }
  },
};

export { gridProps };
