import { ReactNode } from "react";

export type SingleModal = {
  width?: number;
  height?: number;
  // render: () => JSX.Element;
  render: () => ReactNode;
};

export type ModalState = {
  render: SingleModal[];
};
