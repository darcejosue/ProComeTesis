
import React, {  useEffect, useState } from 'react';



interface Insumos {
  _id: string;
  stockName: string;
  stockDescription: string;
  stockCategory: number;
  stockUnitMesure: number;
  stockQuantity: number;
  stockPrice: number;
  stockSupplier: number;
}




 const Table = ({busqueda}) => {

  //const insumoData = await loadInsumos()
  const [insumos, setInsumos] = useState<Insumos[]>([]);
  
  useEffect(()=>{
    async function getInsumos(){
      const data = await fetch('http://localhost:4000/api/stock')
      const receta = await data.json();
      setInsumos(receta)
    }
    getInsumos()
  },[])

  const insumosFiltrados = insumos.filter((insumo)=>{
    return(
      (busqueda === '' || insumo.stockName.toLowerCase().includes( busqueda.toString().toLowerCase()))
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
                <tr key={insumo._id}>
                  <td className="border px-4 py-2">{insumo.stockName}</td>
                  <td className="border px-4 py-2">{insumo.stockCategory}</td>
                  <td className="border px-4 py-2">{insumo.stockUnitMesure}</td>
                  <td className="border px-4 py-2">{insumo.stockDescription}</td>
                  <td className="border px-4 py-2">{insumo.stockQuantity}</td>
                  <td className="border px-4 py-2">{insumo.stockPrice}</td>
                  <td className="border px-4 py-2">{insumo.stockSupplier.supplierName}</td>
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