'use client'

import {
  faFacebook,
  faGithub,
  faInstagramSquare,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'

export default function Footer (): React.ReactNode {
  const Facebook = faFacebook
  const Twitter = faTwitter
  const GithHub = faGithub
  const Instagram = faInstagramSquare
  const Youtube = faYoutube
  const { data: session, status } = useSession()
  const pathname = usePathname()

  const handleCloseSession = (): void => {
    signOut()
  }

  return (
    <footer
      className={`flex flex-col justify-center items-center gap-10 py-10 border-t border-[#0f172a1a] ${
        pathname.includes('/profile/admin') && 'lg:ml-64'
      }`}
    >
      <div>
        <ul className="grid grid-cols-2 grid-rows-3 gap-5 sm:flex sm:gap-8 text-gray-400">
          <li className='flex justify-center items-center'>
            <Link
              className="hover:text-[#79ad34] transition-all"
              href={status === 'authenticated' && session?.user?.document !== '0000000000'
                ? '/profile/user'
                : status === 'authenticated' && session?.user?.document === '0000000000'
                  ? '/profile/admin/home-preview'
                  : '/'}
            >
              Inicio
            </Link>
          </li>
          <li className='flex justify-center items-center'>
            <Link
              className="hover:text-[#79ad34] transition-all"
              href="/financial-education"
            >
              Educación Financiera
            </Link>
          </li>
          <li className='flex justify-center items-center'>
            <Link
              className="hover:text-[#79ad34] transition-all"
              href="/contact"
            >
              Contacto
            </Link>
          </li>
          <li className='flex justify-center items-center'>
            <Link className="hover:text-[#79ad34] transition-all" href="/about">
              Nosotros
            </Link>
          </li>
          {status !== 'authenticated'
            ? (
            <>
              <li className='flex justify-center items-center'>
                <Link
                  className="hover:text-[#79ad34] transition-all"
                  href="/signup"
                >
                  Registrarse
                </Link>
              </li>
              <li className='flex justify-center items-center'>
                <Link
                  className="hover:text-[#79ad34] transition-all"
                  href="/signin"
                >
                  Ingresar
                </Link>
              </li>
            </>
              )
            : (
            <button
              className="hover:text-[#79ad34] transition-all col-span-2"
              onClick={handleCloseSession}
            >
              Cerrar Sesión
            </button>
              )}
        </ul>
      </div>
      <div>
        <ul className="flex justify-center items-center gap-5 sm:gap-12">
          <li>
            <Link href="#" className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={Facebook}
                className="text-gray-400 hover:text-[#008aae] transition-colors w-6 h-6"
                key="facebook"
                id="facebook"
              />
            </Link>
          </li>
          <li>
            <Link href="#" className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={Instagram}
                className="text-gray-400 hover:text-[#008aae] transition-colors w-6 h-6"
                key="instagram"
                id="instagram"
              />
            </Link>
          </li>
          <li>
            <Link href="#" className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={Twitter}
                className="text-gray-400 hover:text-[#008aae] transition-colors w-6 h-6"
                key="twitter"
                id="twitter"
              />
            </Link>
          </li>
          <li>
            <Link href="#" className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={GithHub}
                className="text-gray-400 hover:text-[#008aae] transition-colors w-6 h-6"
                key="github"
                id="github"
              />
            </Link>
          </li>
          <li>
            <Link href="#" className="flex justify-center items-center">
              <FontAwesomeIcon
                icon={Youtube}
                className="text-gray-400 hover:text-[#008aae] transition-colors w-7 h-6"
                key="youtube"
                id="youtube"
              />
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Finanzas Educativas. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}
