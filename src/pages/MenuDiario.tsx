'use client'


import SearchBar from '@/components/global/Buscador'
import FormularioMenuDiario from '@/components/menuComponents/NuevoMenuDiario'
import TableMenu from '@/components/menuComponents/TableMenuDiario'
import React, { useState } from 'react'

export const MenuDiario = () => {
  const [visible, setVisible] = useState(false);
  const [busqueda, setBusqueda] = useState(''); 

  return (
    <div>
      <h1 className='text-center text-3xl text-black font-bold py-2'
            >Menu Diario</h1>
            <div className="parent">
            <div className="div1">
                <SearchBar setBusqueda={setBusqueda}/>

            </div>
            <div className="div2 py-5">
                <button
                    onClick={() => setVisible(!visible)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Nuevo Menu
                </button>
            </div>
        </div>
        {
            visible ? <FormularioMenuDiario /> : <h2></h2>
        }
        <TableMenu busqueda={busqueda}/>
    </div>
  )
}
