import api from "@/libs/api";

interface IProps {
  instrument: string;
  statistic: string;
}

const getCounts = async (uri: string) => {
  try {
    const { data } = await api<number>(
      `${process.env.NEXTAUTH_URL}/api/statistics/instruments/${uri}`,
    );
    return data;
  } catch (error) {
    console.error({ error });
    return -1;
  }
};

export default async function CounterUserIntruments({
  instrument,
  statistic,
}: IProps) {
  const description = "Número de Personas Completado:";

  const count = await getCounts(statistic);

  return (
    <div className="shadow dark:shadow-slate-700 p-4 sm:p-6 xl:p-8 ">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <span className="text-xl leading-none font-bold">{instrument}</span>
          <h3 className="text-sm font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden">
            {description}
          </h3>
        </div>
        <div className="ml-5 w-0 flex items-center justify-end flex-1 text-base font-bold">
          <span className="rounded-full py-3 px-5 bg-boston-blue-600 text-white border dark:border-white border-gray-500">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}
