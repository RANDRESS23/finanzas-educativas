import ForgotPasswordGif from '@/app/forgot-password/gifs/ForgotPassword.gif'
import Title from '@/components/Title'
import Image from 'next/image'
import FormSendEmail from './FormSendEmail'

export default function EmailSender(): React.ReactNode {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-12 lg:px-8 mb-10 py-20">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl md:max-w-3xl">
        <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Recuperar contraseña en{" "}
          <Title text="¡Finanzas Educativas!" isTextStatic />
        </h2>
      </div>
      <div className="flex justify-center items-center gap-16 mt-10">
        <div className="lg:flex lg:justify-center lg:items-center hidden">
          <Image width={400} height={400} src={ForgotPasswordGif} alt="" />
        </div>
        <div className="border-b border-gray-900/10 pb-12 w-80">
          <FormSendEmail />
        </div>
      </div>
    </div>
  );
}
