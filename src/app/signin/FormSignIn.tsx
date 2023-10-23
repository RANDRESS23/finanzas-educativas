'use client'

import { useState } from 'react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function FormSignIn () {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FieldValues>({
    defaultValues: {
      document: '',
      password: ''
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true)

      const response = await signIn('credentials', {
        document: data.document,
        password: data.password,
        redirect: false
      })

      if (response?.error !== null) {
        return toast.error('Datos incorrectos!')
      }

      if (response?.ok) {
        if (data.document === '0000000000') {
          toast.success('Admin logueado!')
          router.refresh()
          router.push('/profile/admin')
          reset()
        } else {
          toast.success('Usuario logueado!')
          router.refresh()
          router.push('/profile/user')
          reset()
        }
      }
    } catch (error: any) {
      toast.error(error.response.data.message)
      console.log({ errorMessage: error.response.data.message })
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <!-- Username Input --> */}
      <div className="mb-4">
        <label
          htmlFor="document"
          className="block font-medium leading-6 text-gray-900"
        >
          Número de Identificación
        </label>
        <input
          type="text"
          id="document"
          {...register('document', {
            required: 'El número de identificación es un campo obligatorio!'
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs
                ${
                  errors.document !== undefined
                    ? 'ring-rose-500'
                    : 'border-gray-300'
                }}
                ${
                  errors.document !== undefined
                    ? 'focus:outline-rose-500'
                    : 'focus:outline-[#008aae]'
                }`}
        />
        {errors.document !== undefined && (
          <p className="my-2 text-sm text-rose-500">
            {errors.document.message as any}
          </p>
        )}
      </div>

      <div className="mb-1">
        <label
          htmlFor="password"
          className="block font-medium leading-6 text-gray-900"
        >
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: 'La contraseña es un campo obligatorio!'
          })}
          className={`block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-[#008aae] sm:max-w-xs"
                autoComplete="off
                ${
                  errors.password !== undefined
                    ? 'ring-rose-500'
                    : 'border-gray-300'
                }}
                ${
                  errors.password !== undefined
                    ? 'focus:outline-rose-500'
                    : 'focus:outline-[#008aae]'
                }`}
        />
        {errors.password !== undefined && (
          <p className="mt-2 text-sm text-rose-500">
            {errors.password.message as any}
          </p>
        )}
      </div>
      {/* <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="text-blue-500"
              />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div> */}
      <p className="mb-6 text-sm">
        <Link
          href="/signup"
          className="leading-6 text-[#008aae] hover:text-[#79ad34]"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </p>
      <button
        type="submit"
        className="rounded-md px-10 py-2 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 duration-300 bg-[#008aae] hover:bg-[#79ad34] disabled:opacity-50 w-full"
        disabled={isLoading}
      >
        {isLoading ? 'Cargando..' : 'INGRESAR'}
      </button>
    </form>
  )
}
