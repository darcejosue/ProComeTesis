'use client'


import SearchBar from '@/components/global/Buscador'
import TableMenu from '@/components/menuComponents/TableMenuDiario'
import React from 'react'

export const MenuDiario = () => {
  return (
    <div>
      <h1 className='text-center text-3xl text-black font-bold py-2'
            >Menu Diario</h1>
        <SearchBar/>
        <TableMenu/>
    </div>
  )
}
