import { SubjectBase } from "@core/pub-sub";
import { ModalState, } from "./types/internals";
import type { SingleModal } from "./types";
import { TRANSITION_IN_DURATION, TRANSITION_OUT_DURATION } from "./constants";

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
      this.state = {
        render: this.state.render.map((el) => ({
          ...el,
          status: "OPEN",
        })),
      };
      this.notify();
    }, TRANSITION_IN_DURATION);
  }

  closeModal() {
    if(this.state.render.length > 0) {
      const last = this.state.render.pop();

      if(last) {
        last.status = "CLOSING";
        this.state = { render: [...this.state.render, last], }
        this.notify();

        setTimeout(() => {
          this.state = {
            render: this.state.render.filter((el) => el.status !== "CLOSING"),
          };
          this.notify();
        }, TRANSITION_OUT_DURATION);
      }
    }
  }

  closeAllModals() {
    // TODO: change logic to use status and trnasition
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
