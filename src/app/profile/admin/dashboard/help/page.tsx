import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

export default async function HelpAdminPage () {
  const session = await getServerSession()

  if (session?.user?.email !== 'admin@gmail.com') {
    return redirect('/profile/user')
  }

  return <div>HelpAdminPage</div>
}
