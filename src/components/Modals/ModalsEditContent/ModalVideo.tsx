"use client";

import { useEffect, useState, useRef } from "react";
import { LiaEdit as EditIcon } from "react-icons/lia";
import ModalVideoContent from "./ModalVideoContent";

interface ModalFormWelcomeProps {
  setOpen: (st: boolean) => void;
}

export default function ModalVideo({ setOpen }: ModalFormWelcomeProps) {
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [videos, setVideos] = useState({ subtitle: "", informativeVideos: [] });
  const [idVideoFocus, setIdVideoFocus] = useState("");

  const cancelButtonRef = useRef(null);

  const handleChange = ({ id }: { id: string }) => {
    setIdVideoFocus(id);
    setOpen2(true);
  };

  useEffect(() => {
    const getVideos = async () => {
      try {
        setIsLoadingVideos(true);

        const videos = await fetch(
          `/api/admin/home-content/informative-videos`,
        );
        const response = await videos.json();

        setVideos(response);
      } catch (error) {
        console.error({ error });
      } finally {
        setIsLoadingVideos(false);
      }
    };

    getVideos();
  }, []);

  if (isLoadingVideos) return <p>Cargando Videos Informativos Educativos...</p>;

  return (
    <div>
      {videos.informativeVideos.map(
        ({ id, title, url }: { id: string; title: string; url: string }) => {
          const urlSliced = url.slice(0, 30);

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
                  {urlSliced}...
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
        disabled={isLoadingVideos}
        onClick={() => setOpen(false)}
      >
        CANCELAR
      </button>
      <ModalVideoContent
        open={open2}
        setOpen={setOpen2}
        setOpen2={setOpen}
        cancelButtonRef={cancelButtonRef}
        idVideo={idVideoFocus}
      />
    </div>
  );
}
