"use client";

import { useState } from "react";
import ArrowDown from "./icons/ArrowDown";
import ArrowUp from "./icons/ArrowUp";

export default function VisionToggle() {
  const [viewMoreInfoVision, setViewMoreInfoVision] = useState(false);

  const handleViewMoreInfoVision = () => {
    setViewMoreInfoVision(!viewMoreInfoVision);
  };

  return (
    <>
      {viewMoreInfoVision && (
        <p className="text-gray-600 text-lg">
          Para lograr nuestra visión, trabajamos incansablemente para brindar
          información educativa de alta calidad, herramientas interactivas y
          recursos prácticos que ayuden a las personas a administrar sus
          finanzas de manera efectiva. Aspiramos a ser líderes en la promoción
          de la educación financiera y la cultura del ahorro, contribuyendo así
          a una sociedad más próspera y económicamente segura para todos.
        </p>
      )}
      <button
        className="text-white font-bold py-2 px-6 mt-4 rounded-2xl transition-colors duration-300 flex justify-center items-center gap-2 bg-boston-blue-600 hover:bg-sushi-500"
        onClick={handleViewMoreInfoVision}
      >
        {viewMoreInfoVision
          ? "Ocultar Información extra"
          : "Mostrar más información"}
        {viewMoreInfoVision ? <ArrowUp /> : <ArrowDown />}
      </button>
    </>
  );
}
