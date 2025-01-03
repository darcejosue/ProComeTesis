
import React, { useEffect, useState } from 'react';
import PerdidaForm from '../global/FormularioPerdida';
import EditarInsumo from '../global/EditarInsumo';



interface Insumos {
  _id: string;
  stockName: string;
  stockDescription: string;
  stockCategory: number;
  stockUnitMesure: number;
  stockQuantity: number;
  stockPrice: number;
  stockSupplier: number;
  stockAlert: number;
}




const Table = ({ busqueda, setEditar, setPerdida }) => {

  //const insumoData = await loadInsumos()
  const [insumos, setInsumos] = useState<Insumos[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function getInsumos() {
      const data = await fetch('http://localhost:4000/api/stock')
      const receta = await data.json();
      setInsumos(receta)
    }
    getInsumos()
  }, [refresh])

  const insumosFiltrados = insumos.filter((insumo) => {
    return (
      (busqueda === '' || insumo.stockName.toLowerCase().includes(busqueda.toString().toLowerCase()))
    )
  })

  const pocoInsumo = insumos.filter((insumo) => {
    return (insumo.stockQuantity <= insumo.stockAlert)
  });


  return (
    <div className="flex h-screen">
      <main className="flex-1 p-4">
        <table className="table-auto w-full">
          <thead className=''>
            <tr >
              <th className="px-4 py-2 text-black">Nombre Insumo</th>
              <th className="px-4 py-2  text-black">Categoria</th>
              <th className="px-4 py-2  text-black">Unidad de Medida</th>
              <th className="px-4 py-2  text-black">Cantidad</th>
              <th className="px-4 py-2  text-black">Precio</th>
              <th className="px-4 py-2  text-black">Proveedor</th>
              <th className="px-4 py-2  text-black">Editar</th>
              <th className="px-4 py-2  text-black">Perdida de insumo</th>
            </tr>
          </thead>
          <tbody>
            {insumosFiltrados.map((insumo) => (
              <tr key={insumo._id}>
                <td className="border px-4 py-2">{insumo.stockName}</td>
                <td className="border px-4 py-2">{insumo.stockCategory}</td>
                <td className="border px-4 py-2">{insumo.stockUnitMesure}</td>
                <td className="border px-4 py-2">{insumo.stockQuantity.toFixed(1)}</td>
                <td className="border px-4 py-2">{insumo.stockPrice.toFixed(2)}</td>
                <td className="border px-4 py-2">{insumo.stockSupplier.supplierName}</td>
                <td className="border px-4 py-2">
                  <EditarInsumo id={insumo._id}
                    refresh={refresh}
                    setRefresh={setRefresh} />
                </td>
                <td className="border px-4 py-2">
                  <PerdidaForm
                    nombre={insumo.stockName}
                    unidad={insumo.stockUnitMesure}
                    precio={insumo.stockPrice}
                    cantidad={insumo.stockQuantity}
                    id={insumo._id}
                    refresh={refresh}
                    setRefresh={setRefresh} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <aside
        className='my-10'>
        {pocoInsumo.map((pocoInsumo) =>
          <div key={pocoInsumo._id}
            className='bg-yellow-300 p-4 my-3 rounded-md text-black'> Alerta: Queda {pocoInsumo.stockQuantity} {pocoInsumo.stockUnitMesure} de {pocoInsumo.stockName}</div>)}
      </aside>
    </div>
  );
};

export default Table;