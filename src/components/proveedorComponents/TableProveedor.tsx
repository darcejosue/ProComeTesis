import React, { useEffect, useState } from 'react';

interface Proveedor {
  _id: number;
  supplierName: string;
  supplierTel: string;
}

const ProveedoresTable = ({busqueda, visibleList, setVisibleList}) => {
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  useEffect(()=>{
    async function getInsumos(){
      const data = await fetch('http://localhost:4000/api/supplier')
      const proveedor = await data.json();
      setProveedores(proveedor)
    }
    getInsumos()
  },[])

  const handleEliminar = (id: number) => {
    setProveedores(proveedores.filter((proveedor) => proveedor._id !== id));
  };

  const proveedoresFiltrados = proveedores.filter((proveedor)=>{
    return(
      (busqueda === '' || proveedor.supplierName.toLowerCase().includes( busqueda.toString().toLowerCase()))
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
            <tr key={proveedor._id}>
              <td className="border px-4 py-2">{proveedor.supplierName}</td>
              <td className="border px-4 py-2">{proveedor.supplierTel}</td>
              <td className="border px-4 py-2">
                <button 
                onClick={()=>setVisibleList(!visibleList)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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
                  onClick={() => handleEliminar(proveedor._id)}
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