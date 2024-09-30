'use client'

import React, { useState, useEffect } from 'react';
import { LineChart, XAxis, YAxis, Line, Tooltip, Legend } from 'recharts';

interface Gasto {
  fecha: string;
  proveedor: string;
  nombre: string;
  cantidad: number;
  precio: number;
}

interface Filtro {
  fecha: string;
  proveedor: string;
  nombre: string;
}

const ReporteGasto = () => {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [filtro, setFiltro] = useState<Filtro>({ fecha: '', proveedor: '', nombre: '' });
  const [datosGrafica, setDatosGrafica] = useState<any[]>([]);

  useEffect(() => {
    const gastosIniciales: Gasto[] = [
      { fecha: '2022-01-01', proveedor: 'Proveedor 1', nombre: 'Insumo 1', cantidad: 10, precio: 100 },
      { fecha: '2022-01-02', proveedor: 'Proveedor 1', nombre: 'Insumo 2', cantidad: 20, precio: 200 },
      { fecha: '2022-01-03', proveedor: 'Proveedor 2', nombre: 'Insumo 1', cantidad: 30, precio: 300 },
      { fecha: '2022-01-04', proveedor: 'Proveedor 2', nombre: 'Insumo 2', cantidad: 40, precio: 400 },
    ];
    setGastos(gastosIniciales);
  }, []);

  useEffect(() => {
    const datosGrafica = gastos
      .filter((gasto) => {
        if (filtro.fecha && gasto.fecha !== filtro.fecha) return false;
        if (filtro.proveedor && gasto.proveedor !== filtro.proveedor) return false;
        if (filtro.nombre && gasto.nombre !== filtro.nombre) return false;
        return true;
      })
      .map((gasto) => ({ name: gasto.fecha, cantidad: gasto.cantidad, precio: gasto.precio }));
    setDatosGrafica(datosGrafica);
  }, [gastos, filtro]);

  const handleFiltro = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reporte de Gasto de Insumos</h1>
      <div className="flex flex-wrap justify-between mb-4">
        <input
          type="date"
          name="fecha"
          value={filtro.fecha}
          onChange={handleFiltro}
          className="w-full md:w-1/3 p-2 pl-10 text-sm text-gray-700"
          placeholder="Fecha"
        />
        <input
          type="text"
          name="proveedor"
          value={filtro.proveedor}
          onChange={handleFiltro}
          className="w-full md:w-1/3 p-2 pl-10 text-sm text-gray-700"
          placeholder="Proveedor"
        />
        <input
          type="text"
          name="nombre"
          value={filtro.nombre}
          onChange={handleFiltro}
          className="w-full md:w-1/3 p-2 pl-10 text-sm text-gray-700"
          placeholder="Nombre"
        />
      </div>
      <LineChart width={800} height={400} data={datosGrafica}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="cantidad" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="precio" stroke="#82ca9d" />
      </LineChart>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Proveedor</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Cantidad</th>
            <th className="px-4 py-2">Precio</th>
          </tr>
        </thead>
        <tbody>
          {gastos
            .filter((gasto) => {
              if (filtro.fecha && gasto.fecha !== filtro.fecha) return false;
              if (filtro.proveedor && gasto.proveedor !== filtro.proveedor) return false;
              if (filtro.nombre && gasto.nombre !== filtro.nombre) return false;
              return true;
            })
            .map((gasto) => (
              <tr key={gasto.fecha + gasto.proveedor + gasto.nombre}>
                <td className="px-4 py-2">{gasto.fecha}</td>
                <td className="px-4 py-2">{gasto.proveedor}</td>
                <td className="px-4 py-2">{gasto.nombre}</td>
                <td className="px-4 py-2">{gasto.cantidad}</td>
                <td className="px-4 py-2">{gasto.precio}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReporteGasto;