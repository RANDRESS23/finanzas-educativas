"use client";

import { useRef, useState } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";
import ModalContent from "@/components/Modals/ModalsEditContent/ModalContent";
import ModalContentFirstDimension from "@/components/Modals/ModalsEditContent/ModalsFirstDimension/ModalContentFirstDimension";
import ModalContentSecondDimension from "@/components/Modals/ModalsEditContent/ModalsSecondDimension/ModalContentSecondDimension";
import ModalContentThirdDimension from "@/components/Modals/ModalsEditContent/ModalsThirdDimension/ModalContentThirdDimension";

interface CardContentProps {
  title: string;
  description: string;
  section: string;
}

export default function CardContent({
  title,
  description,
  section,
}: CardContentProps) {
  const [open, setOpen] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleChange = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white border border-gray-100 dark:bg-slate-950/40 shadow-2xl shadow-slate-500/20 dark:shadow-slate-950/60 rounded-lg p-4 sm:p-6 xl:p-8">
        <div className="flex items-center justify-between h-full">
          <div>
            <span className="text-xl leading-none font-bold">{title}</span>
            <h3 className="text-sm font-normal text-gray-500 dark:text-gray-300 whitespace-nowrap overflow-hidden animate-typing">
              {description}
            </h3>
          </div>
          <div className="flex items-center text-base font-bold">
            <button
              onClick={handleChange}
              className="rounded-full p-3 bg-sushi-400 hover:bg-sushi-300 transition-colors duration-300 enabled:active:bg-sushi-500"
            >
              <EditIcon className="text-xl" />
            </button>
          </div>
        </div>
      </div>
      {section === "home" ? (
        <ModalContent
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
          title={title}
        />
      ) : section === "first-dimension" ? (
        <ModalContentFirstDimension
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
          title={title}
        />
      ) : section === "second-dimension" ? (
        <ModalContentSecondDimension
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
          title={title}
        />
      ) : (
        <ModalContentThirdDimension
          open={open}
          setOpen={setOpen}
          cancelButtonRef={cancelButtonRef}
          title={title}
        />
      )}
    </>
  );
}
