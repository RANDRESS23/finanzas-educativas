import Title from '@/components/Title'
import Image from 'next/image'
import ContactUsGif from './gifs/ContactUs.gif'
import FormContact from './FormContact'

export default function Contact (): React.ReactNode {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
          <h2
            className="mt-3 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900"
          >
            Contactar con el equipo de <Title text='¡Finanzas Educativas!' isTextStatic />
          </h2>
        </div>
        <div className="flex justify-center items-center gap-16 mt-7">
          <div className="lg:flex lg:justify-center lg:items-center hidden">
            <Image width={400} height={400} src={ContactUsGif} alt="" />
          </div>
          <div className="border-b border-gray-900/10 pb-12 w-80">
            <FormContact />
          </div>
        </div>
      </div>
    </>
  )
}
