import CounterUserIntruments from "@/components/Statistics/Counter/CounterUserIntruments";
import React from "react";

export default function StatisticsCount() {
  return (
    <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <CounterUserIntruments
        instrument="Encuesta caracterización"
        statistic="/characterization/counts"
      />
      <CounterUserIntruments
        instrument="Encuesta pre-test"
        statistic="/pre-test/counts"
      />
      <CounterUserIntruments
        instrument="Encuesta post-test"
        statistic="/post-test/counts"
      />
    </div>
  );
}
