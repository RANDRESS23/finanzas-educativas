"use client";

import api from "@/libs/api";
import getOptsAndStats from "@/libs/getOptsAndStats";
import { isAxiosError } from "axios";
import { type TitleComponentOption } from "echarts";
import ReactECharts from "echarts-for-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export type StatisticData = { name: string; value: number }[];

export default function Pie({
  statistic,
  title,
}: {
  statistic: string;
  title: TitleComponentOption;
}) {
  const [constructedData, setConstructedData] = useState<StatisticData>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (uri: string) => {
    setIsLoading(true);

    try {
      const { data } = await api("/statistics/instruments".concat(uri));
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.message);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  const constructData = async (uri: string) => {
    const inputData = await getData(uri);
    const transformedData = Object.entries(inputData).map(([name, value]) => ({
      name,
      value,
    })) as typeof constructedData;

    setConstructedData(transformedData);
  };

  const opt = getOptsAndStats(title, constructedData);

  useEffect(() => {
    constructData(statistic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ReactECharts
      option={opt}
      notMerge
      lazyUpdate
      theme={useTheme().theme}
      showLoading={isLoading}
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
