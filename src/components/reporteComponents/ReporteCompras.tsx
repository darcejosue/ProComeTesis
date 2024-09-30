'use'

import React, { useState } from 'react';

interface Compra {
  fecha: string;
  producto: string;
  precio: number;
  proveedor: string;
}

const ReporteDeCompras = () => {
  const [compras, setCompras] = useState<Compra[]>([
    { fecha: '2022-01-01', producto: 'Producto 1', precio: 100, proveedor: 'Proveedor 1' },
    { fecha: '2022-01-02', producto: 'Producto 2', precio: 200, proveedor: 'Proveedor 2' },
    { fecha: '2022-01-03', producto: 'Producto 3', precio: 300, proveedor: 'Proveedor 1' },
  ]);

  const [filtroFecha, setFiltroFecha] = useState('');
  const [filtroProveedor, setFiltroProveedor] = useState('');

  const comprasFiltradas = compras.filter((compra) => {
    return (
      (filtroFecha === '' || compra.fecha.includes(filtroFecha)) &&
      (filtroProveedor === '' || compra.proveedor.includes(filtroProveedor))
    );
  });

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
              <td className="px-4 py-2 text-gray-700 text-sm">{compra.fecha}</td>
              <td className="px-4 py-2 text-gray-700 text-sm">{compra.producto}</td>
              <td className="px-4 py-2 text-gray-700 text-sm">{compra.precio}</td>
              <td className="px-4 py-2 text-gray-700 text-sm">{compra.proveedor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteDeCompras;