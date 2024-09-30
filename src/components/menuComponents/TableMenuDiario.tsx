'use client'

import React, { useState } from 'react';

interface Recipe {
  id: number;
  receta: string;
  diaAServir: string;
  tiempoDeComida: string;
  porciones: number;
}

const initialRecipes: Recipe[] = [
  { id: 1, receta: 'Tacos al pastor', diaAServir: 'Lunes', tiempoDeComida: 'Comida', porciones: 4 },
  { id: 2, receta: 'Ensalada de frutas', diaAServir: 'Martes', tiempoDeComida: 'Desayuno', porciones: 2 },
  { id: 3, receta: 'Pasta con salsa de tomate', diaAServir: 'Miércoles', tiempoDeComida: 'Cena', porciones: 3 },
];

const TableMenu = ({busqueda}) => {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [editing, setEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);

  const handleEdit = (recipe: Recipe) => {
    setEditing(true);
    setCurrentRecipe(recipe);
  };

  const handleSave = (recipe: Recipe) => {
    const updatedRecipes = recipes.map((r) => (r.id === recipe.id ? recipe : r));
    setRecipes(updatedRecipes);
    setEditing(false);
    setCurrentRecipe(null);
  };

  const menuFiltrado = initialRecipes.filter((recipe)=>{
    return(
      (busqueda === '' || recipe.receta.includes(busqueda))
    )
  })

  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Receta</th>
            <th className="border border-gray-400 p-2">Día a servir</th>
            <th className="border border-gray-400 p-2">Tiempo de comida</th>
            <th className="border border-gray-400 p-2">Porciones</th>
            <th className="border border-gray-400 p-2">Editar</th>
          </tr>
        </thead>
        <tbody>
          {menuFiltrado.map((recipe) => (
            <tr key={recipe.id}>
              <td className="border border-gray-400 p-2">{recipe.receta}</td>
              <td className="border border-gray-400 p-2">{recipe.diaAServir}</td>
              <td className="border border-gray-400 p-2">{recipe.tiempoDeComida}</td>
              <td className="border border-gray-400 p-2">{recipe.porciones}</td>
              <td className="border border-gray-400 p-2">
                {editing && currentRecipe?.id === recipe.id ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSave(recipe)}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEdit(recipe)}
                  >
                    Editar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMenu;