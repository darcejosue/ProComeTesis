'use client'

import React, { useState } from 'react';

interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string;
  precio: number;
  preparacion: string;
}

const initialRecetas: Receta[] = [
  { id: 1, nombre: 'Receta 1', descripcion: 'Descripcion 1', ingredientes: 'Ingredientes 1', precio: 10, preparacion: 'Preparacion 1' },
  { id: 2, nombre: 'Receta 2', descripcion: 'Descripcion 2', ingredientes: 'Ingredientes 2', precio: 20, preparacion: 'Preparacion 2' },
  { id: 3, nombre: 'Receta 3', descripcion: 'Descripcion 3', ingredientes: 'Ingredientes 3', precio: 30, preparacion: 'Preparacion 3' },
];

const TablaRecetas = () => {
  const [recetas, setRecetas] = useState(initialRecetas);
  const [showIngredientes, setShowIngredientes] = useState(false);
  const [showPreparacion, setShowPreparacion] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);

  const handleEliminar = (id: number) => {
    setRecetas(recetas.filter((receta) => receta.id !== id));
  };

  const handleEditar = (receta: Receta) => {
    // Aqui puedes agregar la logica para editar la receta
    console.log(receta);
  };

  const handleIngredientes = (receta: Receta) => {
    setSelectedReceta(receta);
    setShowIngredientes(true);
  };

  const handlePreparacion = (receta: Receta) => {
    setSelectedReceta(receta);
    setShowPreparacion(true);
  };

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre Receta</th>
            <th className="px-4 py-2">Descripcion</th>
            <th className="px-4 py-2">Ingredientes</th>
            <th className="px-4 py-2">Precio por plato</th>
            <th className="px-4 py-2">Preparacion</th>
            <th className="px-4 py-2">Editar</th>
            <th className="px-4 py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {recetas.map((receta) => (
            <tr key={receta.id}>
              <td className="border px-4 py-2">{receta.nombre}</td>
              <td className="border px-4 py-2">{receta.descripcion}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleIngredientes(receta)}
                >
                  Ver Ingredientes
                </button>
              </td>
              <td className="border px-4 py-2">{receta.precio}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handlePreparacion(receta)}
                >
                  Ver Preparacion
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEditar(receta)}
                >
                  Editar
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEliminar(receta.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showIngredientes && selectedReceta && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Ingredientes de {selectedReceta.nombre}</h2>
          <p className="text-gray-600">{selectedReceta.ingredientes}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowIngredientes(false)}
          >
            Cerrar
          </button>
        </div>
      )}
      {showPreparacion && selectedReceta && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Preparacion de {selectedReceta.nombre}</h2>
          <p className="text-gray-600">{selectedReceta.preparacion}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowPreparacion(false)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default TablaRecetas;