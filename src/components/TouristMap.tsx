import React, { useEffect, useState } from "react";
import { csv } from "d3-fetch";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";
import geoJson from "@/constant/geo.json";
import { Tooltip } from "@chakra-ui/react";

const MapChart = () => {
  const [data, setData] = useState([]);
  const [tooltipContent, setTooltipContent] = useState("");

  useEffect(() => {
    csv(`/vulnerability.csv`).then((dataCSV: any) => {
      setData(dataCSV);
    });
  }, []);

  return (
    <>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <Graticule stroke="#272d83" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoJson}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const dCur = data.find((s) => s.ISO3 === geo.id);
                return (
                  <Tooltip
                    key={geo.id}
                    label={tooltipContent}
                    placement="top"
                    background={"global-brand-bg"}
                    border={"1px solid #a667f5"}
                    color={"chakra-body-text"}
                    borderRadius={"xl"}
                    padding={2}
                  >
                    <Geography
                      key={geo.id}
                      geography={geo}
                      stroke={"#a667f5"}
                      fill={"#282e86"}
                      fillOpacity={0.5}
                      onMouseEnter={() => {
                        setTooltipContent(`${dCur?.Name}`);
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("");
                      }}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </>
  );
};

export default MapChart;
