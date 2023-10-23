'use client'

import { useState } from 'react'
import { ArrowUp, ArrowDown } from './icons'
import { AboutUs, Mision, Vision } from './svgs'

const SVGS_IMAGES: Record<string, () => JSX.Element> = {
  ABOUT_US: () => <AboutUs />,
  MISION: () => <Mision />,
  VISION: () => <Vision />
}

interface AboutSectionProps {
  svgName: string
  svgInLeftPosition: boolean
  title: string
  description: string
  moreDescription: string
}

export default function AboutSection ({
  svgName, svgInLeftPosition, title, description, moreDescription
}: AboutSectionProps): React.ReactNode {
  const [viewMoreInfoVision, setViewMoreInfoVision] = useState(false)

  const handleViewMoreInfoVision = () => {
    setViewMoreInfoVision(!viewMoreInfoVision)
  }

  return (
    <section className="w-full md:flex md:justify-center md:items-center md:gap-16 mb-16">
      {
        svgInLeftPosition && (
          <div className="hidden md:block lg:w-96">
            {SVGS_IMAGES[svgName]()}
          </div>
        )
      }
      <div className="flex flex-col gap-3 w-full md:w-5/12">
        <h1 className="font-bold text-4xl text-[#79ad34]">{title}</h1>
        <p className="text-gray-600 text-lg">
          {description}
        </p>
        {viewMoreInfoVision && (
          <p className="text-gray-600 text-lg">
            {moreDescription}
          </p>
        )}
        <button
          className="text-white font-bold py-2 px-6 mt-4 rounded-2xl transition-colors duration-300 flex justify-center items-center gap-2 bg-[#008aae] hover:bg-[#79ad34]"
          onClick={handleViewMoreInfoVision}
        >
          {viewMoreInfoVision
            ? 'Ocultar Información extra'
            : 'Mostrar más información'}
          {viewMoreInfoVision ? <ArrowUp /> : <ArrowDown />}
        </button>
      </div>
      {
        !svgInLeftPosition && (
          <div className="hidden md:block lg:w-96">
            {SVGS_IMAGES[svgName]()}
          </div>
        )
      }
    </section>
  )
}
