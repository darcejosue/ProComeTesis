'use client'

import React, { useState } from 'react';

interface Ingrediente {
  nombre: string;
  precio: number;
  unidadDeMedida: string;
  cantidadPorPlato: number;
}

interface Receta {
  nombre: string;
  ingredientes: Ingrediente[];
  preparacion: string;
}

const UnidadDeMedida = ['Gramos', 'Mililitros', 'Unidades'];

const FormularioReceta = () => {
  const [nombreReceta, setNombreReceta] = useState('');
  const [ingrediente, setIngrediente] = useState('');
  const [precioIngrediente, setPrecioIngrediente] = useState(0);
  const [unidadDeMedida, setUnidadDeMedida] = useState(UnidadDeMedida[0]);
  const [cantidadPorPlato, setCantidadPorPlato] = useState(0);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [preparacion, setPreparacion] = useState('');

  const agregarIngrediente = () => {
    const nuevoIngrediente: Ingrediente = {
      nombre: ingrediente,
      precio: precioIngrediente,
      unidadDeMedida,
      cantidadPorPlato,
    };
    setIngredientes([...ingredientes, nuevoIngrediente]);
    setIngrediente('');
    setPrecioIngrediente(0);
    setUnidadDeMedida(UnidadDeMedida[0]);
    setCantidadPorPlato(0);
  };

  const enviarReceta = () => {
    const receta: Receta = {
      nombre: nombreReceta,
      ingredientes,
      preparacion,
    };
    console.log(receta);
  };



  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Crear Receta</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreReceta">
            Nombre de la Receta
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nombreReceta"
            type="text"
            value={nombreReceta}
            onChange={(e) => setNombreReceta(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Ingredientes</h3>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingrediente">
                Ingrediente
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ingrediente"
                type="text"
                value={ingrediente}
                onChange={(e) => setIngrediente(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precioIngrediente">
                Precio Ingrediente
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="precioIngrediente"
                type="number"
                value={precioIngrediente}
                onChange={(e) => setPrecioIngrediente(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidadDeMedida">
                Unidad de Medida
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="unidadDeMedida"
                value={unidadDeMedida}
                onChange={(e) => setUnidadDeMedida(e.target.value)}
              >
                {UnidadDeMedida.map((unidad) => (
                  <option key={unidad} value={unidad}>
                    {unidad}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidadPorPlato">
                Cantidad por Plato
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cantidadPorPlato"
                type="number"
                value={cantidadPorPlato}
                onChange={(e) => setCantidadPorPlato(Number(e.target.value))}
              />
            </div>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={agregarIngrediente}
          >
            Añadir Ingrediente
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Ingredientes Agregados</h3>
          <ul>
            {ingredientes.map((ingrediente, index) => (
              <li key={index}>
                {ingrediente.nombre} ({ingrediente.cantidadPorPlato} {ingrediente.unidadDeMedida}) - ${ingrediente.precio}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preparacion">
            Preparación
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="preparacion"
            value={preparacion}
            onChange={(e) => setPreparacion(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={enviarReceta}
        >
          Enviar Receta
        </button>
      </form>
    </div>
  );
};

export default FormularioReceta;