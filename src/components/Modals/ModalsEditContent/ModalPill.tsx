"use client";

import { useEffect, useState, useRef } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";
import ModalPillContent from "./ModalPillContent";

interface ModalFormWelcomeProps {
  setOpen: (st: boolean) => void;
}

export default function ModalPill({ setOpen }: ModalFormWelcomeProps) {
  const [isLoadingPills, setIsLoadingPills] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [pills, setPills] = useState({ subtitle: "", knowledgePills: [] });
  const [idPillFocus, setIdPillFocus] = useState("");

  const cancelButtonRef = useRef(null);

  const handleChange = ({ id }: { id: string }) => {
    setIdPillFocus(id);
    setOpen2(true);
  };

  useEffect(() => {
    const getPills = async () => {
      try {
        setIsLoadingPills(true);

        const pills = await fetch(`/api/admin/home-content/knowledge-pills`);
        const response = await pills.json();

        setPills(response);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingPills(false);
      }
    };

    getPills();
  }, []);

  if (isLoadingPills) return <p>Cargando Pildoras de Conocimiento...</p>;

  return (
    <div>
      {pills.knowledgePills.map(
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
        disabled={isLoadingPills}
        onClick={() => setOpen(false)}
      >
        CANCELAR
      </button>
      <ModalPillContent
        open={open2}
        setOpen={setOpen2}
        setOpen2={setOpen}
        cancelButtonRef={cancelButtonRef}
        idPill={idPillFocus}
      />
    </div>
  );
}
