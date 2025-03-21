'use client'
import { signOut } from "next-auth/react";
import Link from 'next/link'
import { usePathname } from "next/navigation"

export default function SideBar() {

  const pathname = usePathname()

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <aside className="md:w-80 md:h-screen bg-white">
        <h1 className='text-3xl font-black text-center p-5'>
          Viva la <span className='text-violet-800'>Gastronomia</span>
        </h1>
        <nav className='mt-5'>
          <div className='flex flex-col uppercase font-bold'>
            <div className={`border-b-[1px] p-3 ${pathname == '/manager/dashboard' ? 'bg-violet-400' : ''}`}>
              <Link
                href={`/manager/dashboard`}
                className='mx-10'
              >
                Gestionar ordenes
              </Link>
            </div>

            <div className={`border-b-[1px] p-3 ${pathname == '/manager/dashboard/inventary' ? 'bg-violet-400' : ''}`}>
              <Link
                href={`/manager/dashboard/inventary`}
                className='mx-10'
              >
                Gestionar inventario
              </Link>
            </div>
            <div className={`border-b-[1px] p-3 ${pathname == '/manager/dashboard/user' ? 'bg-violet-400' : ''}`}>
              <Link
                href={`/manager/dashboard/user`}
                className='mx-10'
              >
                Gestionar usuarios
              </Link>
            </div>
            <div className={`border-b-[1px] p-3`}>
              <button
                className="mx-10 uppercase"
                onClick={handleSignOut}>
                Salir de la sesion
              </button>
            </div>

          </div>
        </nav>
      </aside>
    </>
  )
}
