'use client'

import ReporteDeCompras from '@/components/reporteComponents/ReporteCompras'
import React from 'react'

export const Reportes = () => {
  return (
    <div>
      <h1 className='text-center text-3xl text-black font-bold py-2'
            >Reportes</h1>
      <ReporteDeCompras/>
    </div>
  )
}
