'use client'

import React, { useEffect, useState } from 'react';

interface Receta {
  _id: string;
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: string[];
  recipePreparation: string;
  recipePrice: number;
}



const TablaRecetas = ({busqueda}) => {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [showIngredientes, setShowIngredientes] = useState(false);
  const [showPreparacion, setShowPreparacion] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null);

  useEffect(()=>{
    async function getInsumos(){
      const data = await fetch('http://localhost:4000/api/recipe')
      const recipe = await data.json();
      setRecetas(recipe)
    }
    getInsumos()
  },[])

  const handleEliminar = (_id: string) => {
    setRecetas(recetas.filter((receta) => receta._id !== _id));
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

  const recetaFiltrados = recetas.filter((receta)=>{
    return(
      (busqueda === '' || receta.recipeName.toLowerCase().includes( busqueda.toString().toLowerCase()))
    )
  })

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
          {recetaFiltrados.map((receta) => (
            <tr key={receta._id}>
              <td className="border px-4 py-2">{receta.recipeName}</td>
              <td className="border px-4 py-2">{receta.recipeDescription}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleIngredientes(receta)}
                >
                  Ver Ingredientes
                </button>
              </td>
              <td className="border px-4 py-2">{receta.recipePrice}</td>
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
                  onClick={() => handleEliminar(receta._id)}
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
          <h2 className="text-lg font-bold">Ingredientes de {selectedReceta.recipeName}</h2>
          <p className="text-gray-600">{selectedReceta.recipeIngredients.map((ingrediente)=>
            (<li key={ingrediente}>{ingrediente}</li>))}</p>
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
          <h2 className="text-lg font-bold">Preparacion de {selectedReceta.recipeName}</h2>
          <p className="text-gray-600">{selectedReceta.recipePreparation}</p>
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