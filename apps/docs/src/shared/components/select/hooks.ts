import { ChangeEvent, useRef, useState } from "react";
import { TListStatus, TSelectStatus } from "./types";

const useChangeDebounce = ({
  fn,
  time,
}: {
  fn: (event: ChangeEvent<HTMLInputElement>) => void;
  time: number;
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      fn(event);
    }, time);
  };

  return handleChange;
};

const useSelectFn = () => {
  /* refs */
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef<HTMLDivElement>(null);

  /* states */
  const [status, setStatus] = useState<TSelectStatus>("init");
  const [listStatus, setListStatus] = useState<TListStatus>("shut");

  const handleClickOutside = () => {
    setStatus("init");
    setListStatus("shut");
  };

  const handleClickInside = () => {
    switch (status) {
      case "init":
        setListStatus("open");
        setStatus("open");
        break;
      case "filter":
        setListStatus("shut");
        break;
      case "close":
        setListStatus("open");
        setStatus("filter");
        break;
    }
  };

  return {
    inputRef,
    ref,
    handleClickInside,
    handleClickOutside,
    status,
    listStatus,
  };
};

export { useChangeDebounce, useSelectFn };
