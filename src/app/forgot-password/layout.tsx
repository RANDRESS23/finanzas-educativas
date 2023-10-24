import { type Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Finanzas Educativas | Recuperar Contraseña'
}

export default function RecoveryPasswordLayout ({
  children
}: {
  children: React.ReactNode
}): React.ReactNode {
  return <>{children}</>
}
