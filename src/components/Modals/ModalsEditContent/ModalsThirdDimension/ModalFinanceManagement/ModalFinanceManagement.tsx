"use client";

import { useEffect, useState, useRef } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";
import ModalFinanceManagementContent from "./ModalFinanceManagementContent";

interface ModalFinanceManagementProps {
  setOpen: (st: boolean) => void;
}

export default function ModalFinanceManagement({
  setOpen,
}: ModalFinanceManagementProps) {
  const [isLoadingFinanceManagement, setIsLoadingFinanceManagement] =
    useState(false);
  const [open2, setOpen2] = useState(false);
  const [financeManagement, setFinanceManagement] = useState([]);
  const [idFinanceManagement, setIdFinanceManagement] = useState("");

  const cancelButtonRef = useRef(null);

  const handleChange = ({ id }: { id: string }) => {
    setIdFinanceManagement(id);
    setOpen2(true);
  };

  useEffect(() => {
    const getFinanceManagement = async () => {
      try {
        setIsLoadingFinanceManagement(true);

        const financeManagement = await fetch(
          `/api/admin/third-dimension/finance-management`,
        );
        const response = await financeManagement.json();

        setFinanceManagement(response);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingFinanceManagement(false);
      }
    };

    getFinanceManagement();
  }, []);

  if (isLoadingFinanceManagement)
    return (
      <p>
        Cargando la sección de <b>manejo de finanzas adecuadamente...</b>
      </p>
    );

  return (
    <div>
      {financeManagement.map(
        ({
          id,
          title,
          description,
        }: {
          id: string;
          title: string;
          description: string;
        }) => {
          const descriptionSliced = description.slice(0, 30);

          return (
            <div
              className="mb-4 w-full flex justify-between items-center gap-3"
              key={id}
            >
              <div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  {title}
                </p>
                <p className="text-gray-500 dark:text-gray-300 text-sm whitespace-nowrap overflow-hidden animate-typing">
                  {descriptionSliced}...
                </p>
              </div>
              <div className="flex items-center text-base font-bold">
                <button
                  onClick={() => handleChange({ id })}
                  className="rounded-full p-3 bg-sushi-400 hover:bg-sushi-300 transition-colors duration-300 enabled:active:bg-sushi-500"
                >
                  <EditIcon className="text-xl" />
                </button>
              </div>
            </div>
          );
        },
      )}
      <button
        type="button"
        className="text-sm rounded-md px-10 py-2 font-semibold bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-200 disabled:opacity-50 ring-1 ring-inset ring-gray-300 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2 text-gray-900"
        disabled={isLoadingFinanceManagement}
        onClick={() => setOpen(false)}
      >
        CANCELAR
      </button>
      <ModalFinanceManagementContent
        open={open2}
        setOpen={setOpen2}
        setOpen2={setOpen}
        cancelButtonRef={cancelButtonRef}
        idFinanceManagement={idFinanceManagement}
      />
    </div>
  );
}
