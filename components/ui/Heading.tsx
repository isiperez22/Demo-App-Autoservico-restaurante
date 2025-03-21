import React from 'react'

import { ReactNode } from 'react';

export default function Heading({ children }: { children: ReactNode }) {
  return (
    <h1 className='text-black text-3xl font-black uppercase text-center mt-10'>
      {children}
    </h1>
  )
}
