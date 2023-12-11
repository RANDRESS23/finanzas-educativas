"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsCashCoin as CashIcon } from "react-icons/bs";
import ModalFormFinanceManagement from "./ModalFormFinanceManagement";

interface ModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  setOpen2: (value: boolean) => void;
  cancelButtonRef: any;
  idFinanceManagement: string;
}

export default function ModalFinanceManagementContent({
  open,
  setOpen,
  setOpen2,
  cancelButtonRef,
  idFinanceManagement,
}: ModalProps) {
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-slate-950/40 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white dark:bg-slate-950/40 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-boston-blue-600 sm:mx-0 sm:h-10 sm:w-10 p-2">
                      <CashIcon className="text-6xl md:text-4xl text-white" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-900 dark:text-gray-300"
                      >
                        Editar la sección de{" "}
                        <span className="text-sushi-500">
                          Formas de Tomar Buenas Decisiones
                        </span>
                      </Dialog.Title>
                      <div className="mt-4 w-full">
                        <ModalFormFinanceManagement
                          setOpen={setOpen}
                          setOpen2={setOpen2}
                          idFinanceManagement={idFinanceManagement}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
