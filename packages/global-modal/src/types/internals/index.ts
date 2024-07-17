import type { SingleModal } from "..";

const modalStatus = {
  "OPENNING": "OPENNING",
  "OPEN": "OPEN",
  "CLOSING": "CLOSING",
} as const;

type ModalStatus = keyof typeof modalStatus;

interface IntSingleModal extends SingleModal{
  status: ModalStatus;
}

interface ModalState {
  render: IntSingleModal[];
}

export type {
  IntSingleModal,
  ModalState,
}
