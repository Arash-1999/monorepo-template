import { useState } from "react";
import { WorldMap } from "@lib/chart/world-map";
import { dispatchCloseModal } from "@lib/global-modal";
import { styled } from "@mui/material";

type ModalProps = {
  setValue: (value: string) => void;
  defaultValue?: string;
};

const Modal = ({ setValue, defaultValue = "", }: ModalProps) => {
  const [country, setCountry] = useState<string>(defaultValue); // temp value in modal

  return (
    <ModalContainer>
      <p>{country}</p>

      <WorldMap
        value={country}
        setValue={(item) => {
          setCountry(item.properties?.name || "");
        }}
      />

      <button
        onClick={() => {
          setValue(country)
          dispatchCloseModal();
        }}
      >
        submit
      </button>
    </ModalContainer>
  );
};

const ModalContainer = styled("div")(({ theme }) => ({
  minWidth: "275px",
  width: "min(80vw, 1280px)",

  [theme.breakpoints.down("md")]: {
    width: "80vw",
  },
  [theme.breakpoints.down("lg")]: {
    width: "",
  },
}));

export default Modal;
