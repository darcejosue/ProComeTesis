'use client'

import SearchBar from '@/components/global/Buscador'
import ListaCompras from '@/components/proveedorComponents/ListaCompras'
import FormularioProveedor from '@/components/proveedorComponents/NuevoInsumo'
import ProveedoresTable from '@/components/proveedorComponents/TableProveedor'
import React, { useState } from 'react'

export const Proveedores = () => {
  const [visible, setVisible] = useState(false);
  const [visibleList, setVisibleList] = useState(false);
  const [busqueda, setBusqueda] = useState(''); 
  return (
    <div>
      <h1 className='text-center text-3xl text-black font-bold py-2'
            >Proveedores</h1>
        <div className="parent">
            <div className="div1">
                <SearchBar setBusqueda={setBusqueda}/>

            </div>
            <div className="div2 py-5">
                <button
                    onClick={() => setVisible(!visible)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Nuevo Proveedor
                </button>
            </div>
        </div>
        {
          visibleList ? <ListaCompras/>: <h2></h2>
        }
        {
            visible ? <FormularioProveedor /> : <h2></h2>
        }
      <ProveedoresTable busqueda={busqueda} visibleList={visibleList} setVisibleList={setVisibleList}/>
    </div>
  )
}
