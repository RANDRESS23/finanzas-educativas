"use client";

import { useEffect, useState, useRef } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";
import ModalCreditContent from "./ModalCreditContent";

interface ModalFormSavingProps {
  setOpen: (st: boolean) => void;
}

export default function ModalCredit({ setOpen }: ModalFormSavingProps) {
  const [isLoadingCredit, setIsLoadingCredit] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [isCreditMeaningEdit, setIsCreditMeaningEdit] = useState(false);
  const [credit, setCredit] = useState({ creditMeaning: "", creditTypes: [] });
  const [idCreditTypeFocus, setIdCreditTypeFocus] = useState("");

  const cancelButtonRef = useRef(null);

  const handleChangeSavingMeaning = () => {
    setIsCreditMeaningEdit(true);
    setOpen2(true);
  };

  const handleChange = ({ id }: { id: string }) => {
    setIdCreditTypeFocus(id);
    setOpen2(true);
  };

  useEffect(() => {
    const getCredit = async () => {
      try {
        setIsLoadingCredit(true);

        const credit = await fetch(`/api/admin/first-dimension/credit`);
        const response = await credit.json();

        setCredit(response);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingCredit(false);
      }
    };

    getCredit();
  }, []);

  if (isLoadingCredit) return <p>Cargando la sección de crédito...</p>;

  return (
    <div>
      <p className="font-semibold text-lg">
        Edita el concepto de <span className="text-sushi-500">Crédito: </span>
      </p>
      <div className="mb-4 w-full flex justify-between items-center gap-3">
        <div>
          <p className="text-gray-700 dark:text-gray-300 font-semibold">
            Definición de Crédito
          </p>
          <p className="text-gray-500 dark:text-gray-300 text-sm whitespace-nowrap overflow-hidden animate-typing">
            {credit.creditMeaning.slice(0, 30)}...
          </p>
        </div>
        <div className="flex items-center text-base font-bold">
          <button
            onClick={handleChangeSavingMeaning}
            className="rounded-full p-3 bg-sushi-400 hover:bg-sushi-300 transition-colors duration-300 enabled:active:bg-sushi-500"
          >
            <EditIcon className="text-xl" />
          </button>
        </div>
      </div>
      <p className="font-semibold text-lg mt-2">
        Edita los tipos de <span className="text-sushi-500">Crédito: </span>
      </p>
      {credit.creditTypes.map(
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
            <>
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
            </>
          );
        },
      )}
      <button
        type="button"
        className="text-sm rounded-md px-10 py-2 font-semibold bg-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 hover:bg-gray-100 dark:hover:bg-gray-200 disabled:opacity-50 ring-1 ring-inset ring-gray-300 w-full flex items-center justify-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400 mb-2 text-gray-900"
        disabled={isLoadingCredit}
        onClick={() => setOpen(false)}
      >
        CANCELAR
      </button>
      <ModalCreditContent
        open={open2}
        setOpen={setOpen2}
        setOpen2={setOpen}
        cancelButtonRef={cancelButtonRef}
        idCreditType={idCreditTypeFocus}
        isCreditMeaningEdit={isCreditMeaningEdit}
      />
    </div>
  );
}
