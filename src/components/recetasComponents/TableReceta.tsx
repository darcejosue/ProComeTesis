'use client'

import React, { useEffect, useState } from 'react';
import Receta from '../global/Receta';
import EliminarReceta from '../global/EliminarReceta';

interface Receta {
  _id: string;
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: string[];
  recipePreparation: string;
  recipePrice: number;
}



const TablaRecetas = ({ busqueda }) => {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [showIngredientes, setShowIngredientes] = useState(false);
  const [showPreparacion, setShowPreparacion] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState('');
  const [dataIngredientes, setDataIngredientes] = useState([])
  const [dataPreparacion, setDataPreparacion] = useState('')
  const [eliminar, setEliminar] = useState(false);

  useEffect(() => {
    async function getInsumos() {
      const data = await fetch('http://localhost:4000/api/recipe')
      const recipe = await data.json();
      setRecetas(recipe)
    }
    getInsumos()
  }, [])

  const handleEliminar = (_id: string) => {
    setRecetas(recetas.filter((receta) => receta._id !== _id));
  };

  const handleEditar = (receta: Receta) => {
    // Aqui puedes agregar la logica para editar la receta
    console.log(receta);

  };

  const handleIngredientes = (receta: [], name: string) => {
    const data = receta.map((r) => r)
    console.log(data);
    setDataIngredientes(data)
    setShowIngredientes(true);
    setSelectedReceta(name);
  };

  const handlePreparacion = (receta: string, name: string) => {
    setSelectedReceta(name);
    setDataPreparacion(receta);
    setShowPreparacion(true);
    console.log(receta);
  };

  const recetaFiltrados = recetas.filter((receta) => {
    return (
      (busqueda === '' || receta.recipeName.toLowerCase().includes(busqueda.toString().toLowerCase()))
    )
  })

  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Nombre Receta</th>
            <th className="px-4 py-2">Descripcion</th>
            <th className="px-4 py-2">Precio por plato</th>
            <th className="px-4 py-2">Preparación</th>
            <th className="px-4 py-2">Editar</th>
          </tr>
        </thead>
        <tbody>
          {recetaFiltrados.map((receta) => (
            <tr key={receta._id}>
              <td className="border px-4 py-2">{receta.recipeName}</td>
              <td className="border px-4 py-2">{receta.recipeDescription}</td>
              
              <td className="border px-4 py-2">C${receta.recipePrice.toFixed(2)}</td>
              <td className="border px-4 py-2">
                <Receta 
                  ingredientes={receta.recipeIngredients}
                  receta={receta.recipePreparation}
                  nombre={receta.recipeName} 
                  />
              </td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleEditar(receta)}
                >
                  Editar
                </button>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
      {showIngredientes && dataIngredientes && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Ingredientes de {selectedReceta}</h2>
          <p className="text-gray-600">{dataIngredientes.map((ingrediente) =>
            (<li key={ingrediente}>{ingrediente.stockName}: {ingrediente.cantidadPorPlato} {ingrediente.stockUnitMesure} por plato</li>))}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowIngredientes(false)}
          >
            Cerrar
          </button>
        </div>
      )}
      {showPreparacion && dataPreparacion && (
        <div className="mt-4">
          <h2 className="text-lg font-bold">Preparacion de {selectedReceta}</h2>
          <p className="text-gray-600">{dataPreparacion}</p>
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