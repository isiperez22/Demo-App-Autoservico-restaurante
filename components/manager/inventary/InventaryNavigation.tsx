import Link from 'next/link'
import React from 'react'

type ProductNavigationProps = {
  page: number
  totalPage: number
}

export default function InventaryNavigation({ page, totalPage }: ProductNavigationProps) {
  const pages = Array.from({length: totalPage}, (_,i) => i + 1)

  return (
    <nav className='flex justify-center py-10'>
      {page > 1 && (
        <Link
          href={`/manager/dashboard/inventary?page=${page - 1}`}
          className='bg-white py-1 px-3 text-xl text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9'
        >
          &laquo;
        </Link>
      )}
      {
        pages.map(currentPage => (
          <Link
            key={currentPage}
            href={`/manager/dashboard/inventary?page=${currentPage}`}
            className={`${currentPage === page && 'font-bold' } bg-white py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9`}
          >
            {currentPage}
          </Link>
        ))
      }
      {
        page < totalPage && (
          <Link
            href={`/manager/dashboard/inventary?page=${page + 1}`}
            className='bg-white py-1 px-3 text-xl text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-9'
          >
            &raquo;
          </Link>
        )
      }

    </nav>
  )
}
