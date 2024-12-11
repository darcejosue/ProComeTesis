'use'

import React, { useEffect, useState } from 'react';

interface Compra {
  fecha: string;
  producto: string;
  precio: number;
  proveedor: string;
}

const ReporteDePerdidas = () => {
  const [perdida, setPerdida] = useState([]);

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
  useEffect(() => {
    async function getPerdidas() {
      const data = await fetch('http://localhost:4000/api/perdida');
      const perdidaDatos = await data.json();
      setPerdida(perdidaDatos);
    }
    getPerdidas()
  }, [])

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-4">Reporte de Perdidas</h1>
      <tr>
          <thead className=''>
            <tr className='bg-slate-400'>
              <th className="px-4 py-2 text-black">Nombre Insumo</th>
              <th className="px-4 py-2  text-black">cantidad perdida</th>
              <th className="px-4 py-2  text-black">Fecha de perdida</th>
              <th className="px-4 py-2  text-black">Precio individual</th>
              <th className="px-4 py-2  text-black">Perdida total</th>
              <th className="px-4 py-2  text-black">Motivo de perdida</th>
            </tr>
          </thead>
          {perdida.map((perdidaElement) => (
          <tbody key={perdidaElement._id}>
            <td className="p-2 border border-gray-300">{perdidaElement.perdidaIngrediente}</td>
            <td className="p-2 border border-gray-300">{perdidaElement.perdidaCantidad} {perdidaElement.perdidaUnidad}</td>
            <td className="p-2 border border-gray-300">{convertDate(perdidaElement.perdidaDay)}</td>
            <td className="p-2 border border-gray-300">C${(perdidaElement.perdidaPrecio).toFixed(2)}</td>
            <td className="p-2 border border-gray-300 bg-red-500">C${(perdidaElement.perdidaPrecio * perdidaElement.perdidaCantidad).toFixed(2)}</td>
            <td className="p-2 border border-gray-300">{perdidaElement.perdidaMotivo}</td>
          </tbody>
      ))}
      </tr>
    </div>
  );
};

export default ReporteDePerdidas;