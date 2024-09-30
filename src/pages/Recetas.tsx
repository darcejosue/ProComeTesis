'use client'

import SearchBar from '@/components/global/Buscador'
import FormularioReceta from '@/components/recetasComponents/NuevoInsumo'
import TablaRecetas from '@/components/recetasComponents/TableReceta'
import React, { useState } from 'react'

export const Recetas = () => {
  const [visible, setVisible] = useState(false);
  const [busqueda, setBusqueda] = useState(''); 

  return (
    <div>
      <h1 className='text-center text-3xl text-black font-bold py-2'
      >Recetas</h1>
       <div className="parent">
            <div className="div1">
                <SearchBar setBusqueda={setBusqueda}/>

            </div>
            <div className="div2 py-5">
                <button
                    onClick={() => setVisible(!visible)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Nueva Receta
                </button>
            </div>
        </div>
        {
            visible ? <FormularioReceta/> : <h2></h2>
        }
      <TablaRecetas busqueda={busqueda}/>

    </div>
  )
}
