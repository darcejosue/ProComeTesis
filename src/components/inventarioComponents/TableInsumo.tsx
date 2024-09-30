'use client'

import { getData } from '@/controllers/InventarioCRUD';
import React, { useEffect, useState } from 'react';

interface Insumo {
  nombre: string;
  categoria: string;
  unidadDeMedida: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  proveedor: string;
}

const Table = ({busqueda}) => {
  const [insumos, setInsumos] = useState<Insumo[]>([
    {
      nombre: 'Cebollas',
      categoria: 'Verdura',
      unidadDeMedida: 'Libra',
      descripcion: 'Cebolla blanca',
      cantidad: 10,
      precio: 25,
      proveedor: 'Verduras Ordoñes',
    },
    {
      nombre: 'Carne de res',
      categoria: 'Carnes',
      unidadDeMedida: 'Libra',
      descripcion: 'Carne de res',
      cantidad: 40,
      precio: 145,
      proveedor: 'Carniceria Morales',
    },
  ]);

  const insumosFiltrados = insumos.filter((insumo)=>{
    return(
      (busqueda === '' || insumo.nombre.toLowerCase().includes( busqueda.toString().toLowerCase()))
    )
  })


  return (
    <div className="flex h-screen">
          <main className="flex-1 p-4">
          <table className="table-auto w-full">
            <thead className=''>
              <tr >
                <th className="px-4 py-2 text-black">Nombre Insumo</th>
                <th className="px-4 py-2  text-black">Categoria</th>
                <th className="px-4 py-2  text-black">Unidad de Medida</th>
                <th className="px-4 py-2  text-black">Descripcion</th>
                <th className="px-4 py-2  text-black">Cantidad</th>
                <th className="px-4 py-2  text-black">Precio</th>
                <th className="px-4 py-2  text-black">Proveedor</th>
                <th className="px-4 py-2  text-black">Editar</th>
                <th className="px-4 py-2  text-black">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {insumosFiltrados.map((insumo) => (
                <tr key={insumo.nombre}>
                  <td className="border px-4 py-2">{insumo.nombre}</td>
                  <td className="border px-4 py-2">{insumo.categoria}</td>
                  <td className="border px-4 py-2">{insumo.unidadDeMedida}</td>
                  <td className="border px-4 py-2">{insumo.descripcion}</td>
                  <td className="border px-4 py-2">{insumo.cantidad}</td>
                  <td className="border px-4 py-2">{insumo.precio}</td>
                  <td className="border px-4 py-2">{insumo.proveedor}</td>
                  <td className="border px-4 py-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      Editar
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </main>
    </div>
  );
};

export default Table;