import { ReactNode } from "react";

type SingleModal = {
  width?: number;
  height?: number;
  render: () => ReactNode;
};

export type {
  SingleModal,
};
