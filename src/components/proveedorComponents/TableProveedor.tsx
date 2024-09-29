'use client'

import React, { useState } from 'react';

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
}

const TablaProveedores = () => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    { id: 1, nombre: 'Proveedor 1', telefono: '123456789' },
    { id: 2, nombre: 'Proveedor 2', telefono: '987654321' },
    { id: 3, nombre: 'Proveedor 3', telefono: '555555555' },
  ]);

  const eliminarProveedor = (id: number) => {
    setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
  };

  const editarProveedor = (id: number) => {
    const proveedor = proveedores.find((proveedor) => proveedor.id === id);
    if (proveedor) {
      // Aquí puedes agregar la lógica para editar el proveedor
      console.log('Editar proveedor:', proveedor);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Nombre de Proveedor</th>
            <th className="px-4 py-2">Teléfono</th>
            <th className="px-4 py-2">Editar</th>
            <th className="px-4 py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td className="border px-4 py-2">{proveedor.nombre}</td>
              <td className="border px-4 py-2">{proveedor.telefono}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => editarProveedor(proveedor.id)}
                >
                  Editar
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => eliminarProveedor(proveedor.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProveedores;