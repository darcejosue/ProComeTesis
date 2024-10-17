'use'

import React, { useEffect, useState } from 'react';

interface Compra {
  fecha: string;
  producto: string;
  precio: number;
  proveedor: string;
}

const ReporteDeCompras = () => {
  const [compras, setCompras] = useState<Compra[]>([]);

  useEffect(()=>{
    async function getInsumos(){
      const data = await fetch('http://localhost:4000/api/stock')
      const compra = await data.json();
      setCompras(compra)
    }
    getInsumos()
  },[])

  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroProveedor, setFiltroProveedor] = useState('');

  const comprasFiltradas = compras.filter((compra) => {
    return (
      (filtroFecha === '' || compra.createdAt.includes(filtroFecha)) &&
      (filtroProveedor === '' || compra.stockSupplier.supplierName.toLowerCase().includes( filtroProveedor.toString().toLowerCase()))
    );
  });

  const convertDate = (date: Date) => {
    const mongoDate = new Date(date)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return mongoDate.toLocaleDateString('es-ES', options)
}

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Reporte de Compras</h1>
      <div className="flex flex-wrap justify-between mb-4">
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filtroFecha">
            Fecha:
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="filtroFecha"
            type="date"
            value={filtroFecha}
            onChange={(e) => setFiltroFecha(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 mb-4 md:mb-0">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="filtroProveedor">
            Proveedor:
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="filtroProveedor"
            type="text"
            value={filtroProveedor}
            onChange={(e) => setFiltroProveedor(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full table-auto mb-4">
        <thead>
          <tr>
            <th className="px-4 py-2 text-gray-700 text-sm font-bold">Fecha</th>
            <th className="px-4 py-2 text-gray-700 text-sm font-bold">Producto</th>
            <th className="px-4 py-2 text-gray-700 text-sm font-bold">Precio</th>
            <th className="px-4 py-2 text-gray-700 text-sm font-bold">Proveedor</th>
          </tr>
        </thead>
        <tbody>
          {comprasFiltradas.map((compra, index) => (
            <tr key={index}>
              <td className="px-4 py-2 text-gray-700 text-sm">{convertDate(compra.createdAt)}</td>
              <td className="px-4 py-2 text-gray-700 text-sm">{compra.stockName}</td>
              <td className="px-4 py-2 text-gray-700 text-sm">{compra.stockPrice}</td>
              <td className="px-4 py-2 text-gray-700 text-sm">{compra.stockSupplier.supplierName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteDeCompras;