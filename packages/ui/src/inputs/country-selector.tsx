"use client";
import { forwardRef } from "react";
import { IconButton, TextField } from "@mui/material";
import Icon from "../icon";
import { dispatchOpenModal } from "@lib/global-modal";
import Modal from "./modal";

type CountrySelectorProps = {
  onChange: (v: string) => void;
  value: string;
};

// TODO: handle validation for countries (autocomplete/select/visual)
const CountrySelector = forwardRef<HTMLInputElement | HTMLTextAreaElement, CountrySelectorProps>(({ onChange, value }, ref) => {
  const openVisualMap = () => {
    dispatchOpenModal({
      render: () => (
        <Modal
          setValue={onChange}
          defaultValue={value}
        />
      ),
    })
  };

  return (
    <TextField
      type="text"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      inputRef={ref}
      InputProps={{ 
        endAdornment: (
          <IconButton
            onClick={openVisualMap}
          >
            <Icon id="public-icon" />
          </IconButton>
        )
      }}
    />
  );
});

export default CountrySelector;
