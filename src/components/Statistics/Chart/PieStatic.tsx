"use client";

import getOptsAndStats from "@/libs/getOptsAndStats";
import { type TitleComponentOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type StatisticData = { name: string; value: number }[];

export default function PieStatic({
  data,
  title,
}: {
  data: any;
  title: TitleComponentOption;
}) {
  const [constructedData, setConstructedData] = useState<StatisticData>([]);
  const [timeOut, setTimeOut] = useState(false);

  const constructData = async (data: any) => {
    const inputData = data;
    const transformedData = Object.entries(inputData).map(([name, value]) => ({
      name,
      value,
    })) as typeof constructedData;

    setConstructedData(transformedData);
  };

  const opt = getOptsAndStats(title, constructedData);

  useEffect(() => {
    constructData(data);

    const timeout = setTimeout(() => setTimeOut(true), 500);

    return () => {
      clearTimeout(timeout);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactECharts
      option={opt}
      notMerge
      lazyUpdate
      theme={useTheme().theme}
      showLoading={!timeOut}
      loadingOption={{
        text: "Cargando estadísticas...",
        color: "#fff",
        textColor: "#fff",
        maskColor: "rgba(0, 0, 0, 0.8)",
        zlevel: 0,
      }}
    />
  );
}
