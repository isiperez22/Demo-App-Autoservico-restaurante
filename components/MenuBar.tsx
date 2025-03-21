import Link from 'next/link'
import { prisma } from '../src/lib/prisma'

async function getCatgerories() {
  return await prisma.category.findMany()
}

export default async function MenuBar() {

  const categories = await getCatgerories()

  return (
    <nav className='flex overflow-x-auto whitespace-nowrap mt-10 sm:text-xs lg:text-base scrollbar-hide'>
      {categories.map(category => (
        <Link
          className='snap-start px-4 py-2 mx-2 font-light text-center border-[1px] border-white uppercase rounded-3xl 
                  hover:bg-violet-700 transition-colors ease-in-out duration-300'
          key={category.id}
          href={`${category.name}`}
        >{category.name}</Link>
      ))}
    </nav>
  )
}
