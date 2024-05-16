"use client";
import React from "react";
import {
  geoMercator,
  geoPath,
  select,
  zoom,
} from "d3";
import type { ExtendedFeature, ExtendedFeatureCollection } from "d3";
import { styled } from "@mui/material";
import worldGeoJson from "./world-110m.json";

type Props = {
  width: number;
  height: number;
  data?: ExtendedFeatureCollection;
  value: string;
  setValue: (country: ExtendedFeature) => void
};

const regex = new RegExp("[-_ ]", "g");
const normal = (s: string): string => {
  return s.toLowerCase().replace(regex, "");
};

const GeoMap = ({
  width,
  height,
  value,
  setValue,
  data = worldGeoJson as ExtendedFeatureCollection,
}: Props) => {
  const svgRef = React.useRef<SVGSVGElement>(null);

  const path = React.useMemo(() => {
    const projection = geoMercator()
      .scale(width / 2 / Math.PI) // scale: bigger value = more zoom
      // .center([2.34, 48.86])
      .center([0, 40])
      .translate([width / 2, height / 2]);
    return geoPath(projection);
  }, [width, height]);

  React.useEffect(() => {
    if (svgRef.current) {
      const svg = select(svgRef.current as Element);

      const zoomHelper = zoom()
        .scaleExtent([1, 8])
        .on("zoom", ({ transform }) => {
          svg.select("g.countries").attr("transform", transform);
          svg.selectAll("path").attr("stroke-width", 1 / transform.k);
        });

      svg.call(zoomHelper);
    }
  }, []);

  return (
    <svg
      width={width}
      height={height}
      ref={svgRef}
    >
      <g className="countries">
        {data.features.map((item, i) => {
          const name = item.properties?.name || "";

          return (
            <Path
              key={i}
              d={path(item) ?? undefined}
              active={normal(name) === normal(value)}
              onClick={() => setValue(item)}
            />
          );
        })}
      </g>
    </svg>
  );
};

const Path = styled(
  "path",
  { shouldForwardProp: (p) => p !== "active", }
)<{ active: boolean }>(({ active, theme }) => ({
  "--color": theme.palette.primary.main,
  fill: active ? "var(--color)" : "#eee",
  transition: "fill .1s ease-out",
  stroke: "#323232",

  "&:hover": {
    cursor: "pointer",
    // TODO: use some drop shadow depend on theme
    filter: "drop-shadow(0 0 8px rgba(0, 0, 0, .08))",
    fill: active ? "var(--color)" : "#bbb",
  }
}));

export default GeoMap;
