'use client'

import React, { useEffect, useState } from 'react';
import BuscadorIngrediente from './BusarIngrediente';

interface Ingrediente {
  _id:string
  stockName: string;
  stockPrice: number;
  stockUnitMesure: string;
  cantidadPorPlato: number;
}

interface Receta {
  _id: string;
  recipeName: string;
  recipeDescription: string;
  recipeIngredients: string[];
  recipePreparation: string;
  recipePrice: number;
}



//const UnidadDeMedida = ['Gramos', 'Mililitros', 'Unidades'];

const FormularioReceta = ({setVisible}) => {
  const [id, setId] = useState('')
  const [ingrediente, setIngrediente] = useState('');
  const [precioIngrediente, setPrecioIngrediente] = useState(0);
  const [unidadDeMedida, setUnidadDeMedida] = useState(0);
  const [cantidadPorPlato, setCantidadPorPlato] = useState(0);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [receta, setReceta] = useState<Receta[]>([]);


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setReceta({ ...receta, [name]: value });
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setReceta({ ...receta, [name]: value });
  };



  const agregarIngrediente = () => {
    const nuevoIngrediente: Ingrediente = {
      _id: id,
      stockName: ingrediente,
      stockPrice: precioIngrediente * cantidadPorPlato,
      stockUnitMesure:unidadDeMedida.toString(),
      cantidadPorPlato,
    };
    setIngredientes([...ingredientes, nuevoIngrediente]);
  };

  const enviarReceta = async() => {
    
    let totalReceta = 0;
    ingredientes.map((precio)=>{
      totalReceta += precio.stockPrice 
    })
    
    setReceta({ ...receta, 'recipeIngredients':ingredientes, 'recipePrice':totalReceta})
  
    
    try {
      await fetch('http://localhost:4000/api/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(receta)
        })
    } catch (error) {
      console.error(error)
      }
     console.log(receta)
     setVisible(false)

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
            name='recipeName'
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-bold mb-2">Ingredientes</h3>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ingrediente">
                Ingrediente
              </label>
              <BuscadorIngrediente 
               setId={setId}
               setIngredienteNombre={setIngrediente}
               setPrecio={setPrecioIngrediente}
               setUnidad = {setUnidadDeMedida}/>
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
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidadDeMedida">
                Unidad de Medida
              </label>
              <input  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="UnidadMedida"
                type="text"
                value={unidadDeMedida}/>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidadPorPlato">
                Cantidad por Plato
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="cantidadPorPlato"
                type="number"
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
            {ingredientes.map(ingrediente => (
              <li key={ingrediente._id}>
                {ingrediente.stockName} ({ingrediente.cantidadPorPlato}: {ingrediente.stockUnitMesure}) - ${ingrediente.stockPrice}
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
            name='recipePreparation'
            onChange={handleTextAreaChange}//setPreparacion(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="preparacion">
            Descripción
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name='recipeDescription'
            onChange={handleInputChange}//setPreparacion(e.target.value)}
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