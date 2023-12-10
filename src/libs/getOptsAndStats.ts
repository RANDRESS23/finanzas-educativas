import { type StatisticData } from "@/components/Statistics/Chart/Pie";
import type { EChartsOption, TitleComponentOption } from "echarts";

export default function getOptsAndStats(
  title: TitleComponentOption,
  data: StatisticData,
): EChartsOption {
  return {
    title: {
      left: "center",
      ...title,
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    backgroundColor: "transparent",
    series: [
      {
        name: title.text,
        type: "pie",
        radius: "50%",
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
}
