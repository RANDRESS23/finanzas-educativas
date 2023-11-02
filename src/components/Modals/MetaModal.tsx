"use client";

import {
  MisionIcon,
  QuestionIcon,
  VisionIcon,
} from "@/components/NavBar/icons";
import { Dialog, Transition } from "@headlessui/react";
import { InformationSchema } from "@prisma/client";
import { Fragment, useRef, useState } from "react";
import { FcCancel as CancelIcon } from "react-icons/fc";
import { FiEdit2 as EditIcon } from "react-icons/fi";
import MetaForm from "./MetaForm";
import clsx from "clsx";

export enum META {
  mision = "mision",
  vision = "vision",
  whoami = "whoami",
}

export default function MetaModal({
  meta,
  description,
  aboutInfo,
  open,
  setOpen,
}: {
  meta: META;
  description: string;
  aboutInfo: Partial<InformationSchema>;
  open: boolean;
  setOpen: (st: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#79ad3481] sm:mx-0 sm:h-10 sm:w-10">
                      {meta === META.mision ? (
                        <MisionIcon />
                      ) : meta === META.whoami ? (
                        <QuestionIcon />
                      ) : (
                        <VisionIcon />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Actualizar {description}
                      </Dialog.Title>
                      <div className="mt-2">
                        <MetaForm
                          meta={META[meta]}
                          aboutInfo={aboutInfo}
                          closeMetaModal={() => setOpen(false)}
                          setIsLoadingForm={setIsLoadingForm}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-7 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className={clsx(
                      "inline-flex w-full justify-center rounded-md bg-[#79ad34] px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-50 hover:bg-[#69952e] sm:ml-3 sm:w-auto items-center gap-x-1",
                      { "cursor-not-allowed": isLoadingForm }
                    )}
                    form="metaForm"
                    disabled={isLoadingForm}
                  >
                    <EditIcon />
                    {isLoadingForm ? "Cargando..." : "Actualizar"}
                  </button>
                  <button
                    type="button"
                    className={clsx(
                      "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset disabled:opacity-50 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto items-center gap-x-1",
                      { "cursor-not-allowed": isLoadingForm }
                    )}
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                    disabled={isLoadingForm}
                  >
                    <CancelIcon />
                    Cancelar
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
