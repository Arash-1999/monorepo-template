"use client";
import { KeyboardEventHandler, useRef, useState } from "react";
import type { SelectProps } from "./types";
// TODO: move this function to somewehre accessible by all packages (e.g. utils package)
import { useClickAwayListener } from "../../../../../../packages/global-modal/src/hooks/use-click-away";
import { SelectContainer } from "./select.style";
import { useChangeDebounce } from "./hooks";

type TSelectStatus = "init" | "open" | "filter" | "close";

const Select = ({ name, options, id, debounceTime = 750 }: SelectProps) => {
  const [status, setStatus] = useState<TSelectStatus>("init");
  const [listStatus, setListStatus] = useState<"shut" | "open">("shut");
  const [value, setValue] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInputChange = useChangeDebounce({
    fn: (event) => {
      setInput(event.target.value);
    },
    time: debounceTime,
  });

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
  const handleKeyUp: KeyboardEventHandler<HTMLDivElement> = (event) => {
    if (event.key !== "Escape") return;

    switch (status) {
      case "open":
      case "filter":
        setListStatus("shut");
        setStatus("init");
    }
  };
  const handleInputKeyUp = () => {};

  const handleInputClick = () => {
    if (status === "open") {
      setListStatus("shut");
      setStatus("init");
    }
  };
  const handleOptionClick =
    (option: { label: string; value: string }) => () => {
      switch (status) {
        case "open":
        case "filter":
          makeChoice(option.value);
          setStatus("close");
          setListStatus("shut");
          break;
      }
    };

  const makeChoice = (newValue: string) => {
    setInput(newValue);
    setValue(newValue);
    if (inputRef.current !== null) {
      inputRef.current.value = newValue;
    }
  };

  useClickAwayListener(containerRef, handleClickOutside);

  return (
    <>
      <SelectContainer
        role="combobox"
        aria-haspopup="listbox"
        aria-owns={id}
        onClick={handleClickInside}
        onKeyUp={handleKeyUp}
        ref={containerRef}
      >
        <div className="custom-select" aria-expanded={listStatus === "open"}>
          <label htmlFor={name}></label>
          <input
            onClick={handleInputClick}
            className="select-css"
            type="text"
            id={name}
            ref={inputRef}
            name={name}
            aria-autocomplete="both"
            aria-controls={id}
            onChange={handleInputChange}
            onKeyUp={handleInputKeyUp}
          />
          <ul
            id={id}
            role="listbox"
            className={`custom-select-options ${listStatus === "open" ? "" : "hidden-all"}`}
          >
            {options.map((option, i) => (
              <li
                key={`${name}-${i}`}
                role="option"
                tabIndex={-1}
                onClick={handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </SelectContainer>
      <p>Selected Value: {value}</p>
      <p>Input Value: {input}</p>
    </>
  );
};

export default Select;
