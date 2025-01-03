'use client'

import SearchBar from '@/components/global/Buscador'
import FormularioInsumo from '@/components/inventarioComponents/NuevoInsumo'
import Table from '@/components/inventarioComponents/TableInsumo'
import React, { useState } from 'react'

export const Inventario = () => {

    const [visible, setVisible] = useState(false);
    const [busqueda, setBusqueda] = useState(''); 
    const [editar, setEditar] = useState('');
    const [perdida, setPerdida] = useState('');
    return (
        <div>
            <h1 className='text-center text-3xl text-black font-bold py-2'
            >Inventario de Insumos</h1>
            <div className="parent">
                <div className="div1">
                    <SearchBar  setBusqueda={setBusqueda}/>

                </div>
                <div className="div2 py-5">
                    <button
                        onClick={() => setVisible(!visible)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Nuevo insumo
                    </button>
                </div>
                
               
                
            </div>
            {
                visible ? <FormularioInsumo setVisible={setVisible}/> : <h2></h2>
            }

            {
                visible ? <h2></h2>:
                <div >
                    <Table busqueda={busqueda} setEditar={setEditar} setPerdida={setPerdida}/>
                 </div>
            }            


        </div>
    )
}
