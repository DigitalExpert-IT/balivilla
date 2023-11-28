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
import { useTranslation } from "react-i18next";

const MapChart = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

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
                const dCur: any = data.find((s: any) => s.ISO3 === geo.id);

                return (
                  <Tooltip
                    key={geo.id}
                    label={`${dCur?.Name} || 
                    ${t("pages.home.touristSection.totalTourist")}: ${
                      dCur?.SEPTEMBER
                    }`}
                    placement="top"
                    background={"global-brand-bg"}
                    border={"1px solid #a667f5"}
                    color={"chakra-body-text"}
                    borderRadius={"xl"}
                    padding={2}
                    isDisabled={!dCur || dCur?.SEPTEMBER === "-"}
                  >
                    <Geography
                      key={geo.id}
                      geography={geo}
                      stroke={
                        dCur && dCur?.SEPTEMBER != "-"
                          ? "#a667f5"
                          : "transparent"
                      }
                      fill={
                        dCur && dCur?.SEPTEMBER != "-" ? "#a667f5" : "#282e86"
                      }
                      fillOpacity={0.5}
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
