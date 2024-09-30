'use client'

import { useState } from 'react';

interface Plato {
  nombre: string;
  precio: number;
  porciones: number;
  fecha: string;
}

const ReporteComida = () => {
  const [platos, setPlatos] = useState<Plato[]>([
    { nombre: 'Ensalada de frutas', precio: 105, porciones: 35, fecha: '2024-09-30' },
    { nombre: 'Tacos al pastor', precio: 125, porciones: 32, fecha: '2024-09-30' },
    { nombre: 'Pasta con salsa de tomate', precio: 110, porciones: 35, fecha: '2024-09-30' },
    { nombre: 'Ensalada de frutas', precio: 105, porciones: 35, fecha: '2024-09-29' },
    { nombre: 'Pescado frito', precio: 150, porciones: 35, fecha: '2024-09-29' },
  ]);

  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');

  const platosFiltrados = platos.filter((plato) => {
    if (fechaSeleccionada === '') {
      return true;
    }
    return plato.fecha === fechaSeleccionada;
  });

  const totalGanancias = platosFiltrados.reduce((acumulado, plato) => {
    return acumulado + (plato.precio * plato.porciones * 1.4);
  }, 0);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Reporte de comidas</h1>
      <select
        className="block w-full p-2 mb-4 border border-gray-300 rounded"
        value={fechaSeleccionada}
        onChange={(e) => setFechaSeleccionada(e.target.value)}
      >
        <option value="">Seleccione una fecha</option>
        {Array.from(new Set(platos.map((plato) => plato.fecha))).map((fecha) => (
          <option key={fecha} value={fecha}>{fecha}</option>
        ))}
      </select>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Nombre</th>
            <th className="p-2 border border-gray-300">Precio</th>
            <th className="p-2 border border-gray-300">Porciones</th>
            <th className="p-2 border border-gray-300">Fecha</th>
            <th className="p-2 border border-gray-300">Total</th>
          </tr>
        </thead>
        <tbody>
          {platosFiltrados.map((plato) => (
            <tr key={plato.nombre}>
              <td className="p-2 border border-gray-300">{plato.nombre}</td>
              <td className="p-2 border border-gray-300">C${plato.precio}</td>
              <td className="p-2 border border-gray-300">{plato.porciones}</td>
              <td className="p-2 border border-gray-300">{plato.fecha}</td>
              <td className="p-2 border border-gray-300">C${(plato.precio * plato.porciones * 1.4).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="p-2 border border-gray-300 text-right">Total ganancias:</td>
            <td className="p-2 border border-gray-300">C${totalGanancias.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ReporteComida;