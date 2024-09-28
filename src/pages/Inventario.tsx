'use client'

import SearchBar from '@/components/inventarioComponents/Buscador'
import FormularioInsumo from '@/components/inventarioComponents/NuevoInsumo'
import Table from '@/components/inventarioComponents/Table'
import React, { useState } from 'react'

export const Inventario = () => {
    
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <h1 className='text-center text-3xl text-black font-bold py-2'
            >Inventario de Insumos</h1>
            <SearchBar />
            <button
                onClick={()=>setVisible(!visible)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Nuevo insumo
            </button>
            {
                visible ? <FormularioInsumo/> : <h2></h2>
            }
            <Table />

            
        </div>
    )
}
