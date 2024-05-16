"use client";
import React from "react";
import { createPortal } from "react-dom";
import { Observer } from "@core/pub-sub";
import {
  modalSubject,
  dispatchCloseModal,
} from "./subject";
import { ModalState } from "./types";
// @ts-ignore
import styles from "./styles.module.css";
import { useClickAwayListener } from "./hooks/use-click-away";

const GlobalModal = () => {
  const [modal, setModal] = React.useState<ModalState>({ render: [] });
  const ref = React.useRef<HTMLDivElement | null>(null);
  const modalRef = React.useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      ref.current = node;
      node.focus();
    };
  }, []);
  useClickAwayListener(ref, dispatchCloseModal);

  /* attach to modal subject (start) */
  const observer = React.useMemo(() => {
    return new Observer<
      ModalState,
      React.Dispatch<React.SetStateAction<ModalState>>
    >(setModal, "modals");
  }, []);

  React.useEffect(() => {
    modalSubject.attach(observer);

    return () => modalSubject.detach(observer);
  }, [observer]);
  /* attach to modal subject (end) */

  /* a11y close modal with ESC (start) */
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (modal.render.length > 0 && e.key === "Escape") {
        dispatchCloseModal();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [modal]);
  /* a11y close modal with ESC (end) */

  return createPortal(
    modal.render.length > 0
      ? (
        <div className={styles.modals}>
          {modal.render.map((el, i) => (
            <div
              key={i}
              tabIndex={-1}
              className={styles.modals__item}
              ref={i === modal.render.length - 1 ? modalRef : null}
            >
              {el.render()}
            </div>
          ))}
        </div>
      )
      : null,
    document.getElementById("modal") || document.body
  );
};

export default GlobalModal;
