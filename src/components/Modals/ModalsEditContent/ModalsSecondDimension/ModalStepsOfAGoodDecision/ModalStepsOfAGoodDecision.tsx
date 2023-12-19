"use client";

import { useEffect, useState, useRef } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";
import ModalStepsOfAGoodDecisionContent from "./ModalStepsOfAGoodDecisionContent";

interface ModalStepsOfAGoodDecisionProps {
  setOpen: (st: boolean) => void;
}

export default function ModalStepsOfAGoodDecision({
  setOpen,
}: ModalStepsOfAGoodDecisionProps) {
  const [isLoadingStepsOfAGoodDecision, setIsLoadingStepsOfAGoodDecision] =
    useState(false);
  const [open2, setOpen2] = useState(false);
  const [stepsOfAGoodDecision, setStepsOfAGoodDecision] = useState([]);
  const [idStepOfAGoodDecisionFocus, setIdStepOfAGoodDecisionFocus] =
    useState("");

  const cancelButtonRef = useRef(null);

  const handleChange = ({ id }: { id: string }) => {
    setIdStepOfAGoodDecisionFocus(id);
    setOpen2(true);
  };

  useEffect(() => {
    const getStepsOfAGoodDecision = async () => {
      try {
        setIsLoadingStepsOfAGoodDecision(true);

        const stepsOfAGoodDecision = await fetch(
          `/api/admin/second-dimension/steps-of-a-good-decision`,
        );
        const response = await stepsOfAGoodDecision.json();

        setStepsOfAGoodDecision(response);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingStepsOfAGoodDecision(false);
      }
    };

    getStepsOfAGoodDecision();
  }, []);

  if (isLoadingStepsOfAGoodDecision)
    return (
      <p>
        Cargando la sección de <b>formas de tomar buenas decisiones...</b>
      </p>
    );

  return (
    <div>
      {stepsOfAGoodDecision.map(
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
        disabled={isLoadingStepsOfAGoodDecision}
        onClick={() => setOpen(false)}
      >
        CANCELAR
      </button>
      <ModalStepsOfAGoodDecisionContent
        open={open2}
        setOpen={setOpen2}
        setOpen2={setOpen}
        cancelButtonRef={cancelButtonRef}
        idStepOfAGoodDecision={idStepOfAGoodDecisionFocus}
      />
    </div>
  );
}
