'use client'

import { useEffect, useState } from 'react';

interface Plato {
  nombre: string;
  precio: number;
  porciones: number;
  fecha: string;
}

const ReporteComida = () => {
  const [platos, setPlatos] = useState<Plato[]>([]);

  useEffect(()=>{
    async function getInsumos(){
      const data = await fetch('http://localhost:4000/api/menu')
      const plato = await data.json();
      setPlatos(plato)
    }
    getInsumos()
  },[])

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


  const [fechaSeleccionada, setFechaSeleccionada] = useState<string>('');

  const platosFiltrados = platos.filter((plato) => {
    if (fechaSeleccionada === '') {
      return true;
    }
    return plato.menuPreparationDay === fechaSeleccionada;
  });

  const totalGanancias = platosFiltrados.reduce((acumulado, plato) => {
    return acumulado + ((plato.menuSaucer.recipePrice * 0.2) * plato.menuPortions );
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
        {Array.from(new Set(platos.map((plato) => plato.menuPreparationDay))).map((fecha) => (
          <option key={fecha} value={fecha}>{convertDate(fecha)}</option>
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
            <tr key={plato._id}>
              <td className="p-2 border border-gray-300">{plato.menuSaucer.recipeName}</td>
              <td className="p-2 border border-gray-300">C${(plato.menuSaucer.recipePrice).toFixed(2)}</td>
              <td className="p-2 border border-gray-300">{plato.menuPortions}</td>
              <td className="p-2 border border-gray-300">{convertDate(plato.menuPreparationDay)}</td>
              <td className="p-2 border border-gray-300">C${((plato.menuSaucer.recipePrice * 0.2) * plato.menuPortions ).toFixed(2)}</td>
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