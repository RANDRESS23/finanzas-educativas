"use client";

import api from "@/libs/api";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

interface IProps {
  instrument: string;
  statistic: string;
}

export default function CounterUserIntruments({
  instrument,
  statistic,
}: IProps) {
  const description = "# Personas Completado:";
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async (uri: string) => {
    setIsLoading(true);

    try {
      const { data } = await api("/statistics/instruments".concat(uri));
      setCount(data);
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.message);
      }

      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData(statistic);
  }, []);

  return (
    <div className="shadow dark:shadow-slate-700 p-4 sm:p-6 xl:p-8 ">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-xl leading-none font-bold">{instrument}</span>
          <h3 className="text-sm font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden animate-typing">
            {description}
          </h3>
        </div>
        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold">
          {!isLoading ? (
            <span className="rounded-full py-3 px-5 bg-boston-blue-600 text-white border dark:border-white border-gray-500">
              {count}
            </span>
          ) : (
            <div className="ml-5 w-0 flex items-center justify-end flex-1 text-green-500 text-base font-bold">
              <div role="status" className="max-w-sm animate-pulse">
                <div className="rounded-full p-7 bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
