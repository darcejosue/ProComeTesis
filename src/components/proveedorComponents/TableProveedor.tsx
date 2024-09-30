import React, { useState } from 'react';

interface Proveedor {
  id: number;
  nombre: string;
  telefono: string;
}

const ProveedoresTable = ({busqueda}) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([
    { id: 1, nombre: 'Proveedor 1', telefono: '123456789' },
    { id: 2, nombre: 'Proveedor 2', telefono: '987654321' },
  ]);

  const handleEliminar = (id: number) => {
    setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
  };

  const proveedoresFiltrados = proveedores.filter((proveedor)=>{
    return(
      (busqueda === '' || proveedor.nombre.includes(busqueda))
    )
  })

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Nombre de Proveedor</th>
            <th className="px-4 py-2">Telefono</th>
            <th className="px-4 py-2">Lista de compra</th>
            <th className="px-4 py-2">Editar</th>
            <th className="px-4 py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {proveedoresFiltrados.map((proveedor) => (
            <tr key={proveedor.id}>
              <td className="border px-4 py-2">{proveedor.nombre}</td>
              <td className="border px-4 py-2">{proveedor.telefono}</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Lista de compra
                </button>
              </td>
              <td className="border px-4 py-2">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Editar
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEliminar(proveedor.id)}
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

export default ProveedoresTable;