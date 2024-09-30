'use client'

import React, { useState } from 'react';

interface Receta {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string[];
  precio: number;
  preparacion: string;
}

const preparacionTacos: string = "Marinado de la carne: \
Comienza por cortar la carne en trozos pequeños. Tradicionalmente, los tacos al pastor se hacen con cerdo, pero también puedes usar pollo o res.\
Prepara una mezcla de especias para marinar la carne. Puedes usar achiote, comino, orégano, pimienta negra, ajo en polvo y sal al gusto.\
Mezcla la carne con las especias y deja marinar durante al menos 1 hora (o idealmente, toda la noche) en el refrigerador.\
Preparación de la cebolla y la chiltoma:\
Corta la cebolla en rodajas finas.\
La chiltoma (o piña) también se corta en rodajas. Si no tienes chiltoma, puedes usar piña fresca o enlatada.\
Cocción de la carne:\
Calienta una sartén grande o plancha a fuego medio-alto.\
Agrega la carne marinada y cocina hasta que esté bien dorada y cocida por dentro. Si tienes acceso a un trompo vertical (como en las taquerías), ¡sería aún mejor!\
Durante la cocción, puedes agregar un poco de cebolla para darle más sabor.\
Montaje de los tacos:\
Calienta las tortillas de maíz. Puedes hacerlo en una sartén o en el microondas.\
Coloca un poco de carne asada en cada tortilla caliente.\
Agrega rodajas de chiltoma (o piña) para ese toque dulce característico.\
Añade cebolla picada y cilantro fresco al gusto.\
Si te gusta el picante, agrega salsa de chile guajillo o tu salsa favorita. \
Servir"

const initialRecetas: Receta[] = [
  { id: 1, nombre: 'Tacos al pastor', descripcion: 'Tacos hechos al estilo Mexicano', ingredientes: ['Carne de res','Chiltoma','Cebolla', 'Tortillas'], precio: 10, preparacion: preparacionTacos },
  { id: 2, nombre: 'Ensalada de frutas', descripcion: 'Ensalada de frutas frescas', ingredientes: ['Carne de res','Chiltoma','Cebolla', 'Tortillas'], precio: 20, preparacion: 'Preparacion 2' },
  { id: 3, nombre: 'Pasta con salsa de tomates', descripcion: 'Pasta Italiana con salsa de tomates', ingredientes: ['Carne de res','Chiltoma','Cebolla', 'Tortillas'], precio: 30, preparacion: 'Preparacion 3' },
];

const TablaRecetas = ({busqueda}) => {
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

  const recetaFiltrados = recetas.filter((receta)=>{
    return(
      (busqueda === '' || receta.nombre.toLowerCase().includes( busqueda.toString().toLowerCase()))
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
          <p className="text-gray-600">{selectedReceta.ingredientes.map((ingrediente)=>
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