"use client";

import {
  MisionIcon,
  QuestionIcon,
  VisionIcon,
} from "@/components/NavBar/icons";
import { META } from "@/types/TMeta";
import { Dialog, Transition } from "@headlessui/react";
import { type Meta } from "@prisma/client";
import { Fragment, useRef, useState } from "react";
import { FcCancel as CancelIcon } from "react-icons/fc";
import { FiEdit2 as EditIcon } from "react-icons/fi";
import MetaForm from "./MetaForm";

export default function MetaModal({
  meta,
  description,
  metaInfo,
  open,
  setOpen,
}: {
  meta: META;
  description: string;
  metaInfo: Partial<Meta>;
  open: boolean;
  setOpen: (st: boolean) => void;
}) {
  const cancelButtonRef = useRef(null);

  const [isLoadingForm, setIsLoadingForm] = useState(false);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[60]"
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
          <div className="fixed inset-0 bg-gray-500 dark:bg-gray-700 bg-opacity-75 dark:bg-opacity-60 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl dark:shadow-slate-700 transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white dark:bg-slate-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sushi-400 hover:bg-sushi-500/90 sm:mx-0 sm:h-10 sm:w-10 transition-colors duration-300">
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
                        className="text-base font-semibold leading-6"
                      >
                        Actualizar {description}
                      </Dialog.Title>
                      <div className="mt-2">
                        <MetaForm
                          meta={META[meta]}
                          metaInfo={metaInfo}
                          closeMetaModal={() => setOpen(false)}
                          setIsLoadingForm={setIsLoadingForm}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900/70 px-4 py-7 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-sushi-500 px-3 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-50 hover:bg-sushi-600 sm:ml-3 sm:w-auto items-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-sushi-400"
                    form="metaForm"
                    disabled={isLoadingForm}
                  >
                    <EditIcon />
                    {isLoadingForm ? "Cargando..." : "Actualizar"}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset disabled:opacity-50 ring-gray-300 hover:bg-gray-200 sm:mt-0 sm:w-auto items-center gap-x-1 disabled:cursor-not-allowed enabled:active:bg-slate-300"
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
