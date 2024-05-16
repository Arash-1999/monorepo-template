"use client";
import React from "react";
import { useSize } from "ahooks";
import { styled } from "@mui/material";
import GeoMap from "./geo-map";
import type { ExtendedFeature } from "d3";

type Props = {
  value: string;
  setValue: (item: ExtendedFeature) => void;
};

const WorldMapContainer = ({ value, setValue }: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const size = useSize(ref);

  return (
    <SvgWrapper
      ref={ref}
    >
      {size ? (
        <GeoMap
          value={value}
          setValue={setValue}
          width={size.width}
          height={size.height}
        />
      ) : null}
    </SvgWrapper>
  );
};

const SvgWrapper = styled("div")(({theme}) => ({
  "--max-height": "800px",
  maxWidth: "1280px",
  width: "100%",
  height: "var(--max-height)",
  marginInline: "auto",

  "& svg": {
    background: theme.palette.background.paper,
  },

  [theme.breakpoints.down("lg")]: {
    "--max-height": "720px",
  },
  [theme.breakpoints.down("md")]: {
    "--max-height": "575px",
  },
  [theme.breakpoints.down("sm")]: {
    "--max-height": "392px",
  },
}));

export default WorldMapContainer;
