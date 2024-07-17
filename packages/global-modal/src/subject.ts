import { SubjectBase } from "@core/pub-sub";
import { ModalState, } from "./types/internals";
import type { SingleModal } from "./types";
import { TRANSITION_DURATION } from "./constants";

class ModalSubject extends SubjectBase<ModalState> {
  constructor(defaultValue: ModalState) {
    super(defaultValue);
  }

  openModal(d: SingleModal) {
    this.state = {
      render: [
        ...this.state.render,
        { ...d, status: "OPENNING", }
      ]
    };
    this.notify();

    setTimeout(() => {
      // TODO: change OPENNING status to open then notify
    }, TRANSITION_DURATION);
  }
  closeModal() {
    this.state = { render: this.state.render.slice(0, -1) };
    this.notify();
  }
  closeAllModals() {
    this.state = { render: [] };
    this.notify();
  }
}

const modalSubject = new ModalSubject({ render: [] });

const dispatchOpenModal = (d: SingleModal): void => {
  modalSubject.openModal(d);
};

const dispatchCloseModal = (): void => {
  modalSubject.closeModal();
};

const dispatchCloseAllModals = (): void => {
  modalSubject.closeAllModals();
};

export {
  modalSubject,
  dispatchOpenModal,
  dispatchCloseModal,
  dispatchCloseAllModals,
};
