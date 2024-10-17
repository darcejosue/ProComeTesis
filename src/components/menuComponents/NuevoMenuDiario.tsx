'use client'

import React, { useEffect, useState } from 'react';

interface FormValues {
  menuSaucer: object;
  menuPreparationDay: Date;
  menuMealtime: string;
  menuPortions: number;
}
interface Recetas{
  _id: string;
  recipeName: string;
}

const tiempoComidaOptions = [
  { value: 'desayuno', label: 'Desayuno' },
  { value: 'almuerzo', label: 'Almuerzo' },
  { value: 'cena', label: 'Cena' },
];


const FormularioMenuDiario = () => {
  const [formValues, setFormValues] = useState<FormValues[]>([]);
  const [receta, setReceta] = useState<Recetas[]>([])

  useEffect(()=>{
    async function recetaList() {
      const data = await fetch('http://localhost:4000/api/recipe')
      const recetaData = await data.json()
      setReceta(recetaData)
    }
    recetaList()
  },[])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: new Date(value) });
  };

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await fetch('http://localhost:4000/api/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValues)
      })
     console.log(formValues)

  } catch (error) {
    console.error(error)
  }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreReceta">
          Nombre Receta
        </label>
        <select
          id="nombreReceta"
          name="menuSaucer"
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione una opción</option>
          {receta.map((option) => (
            <option key={option._id} value={option._id}>
              {option.recipeName}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="diaServicio">
          Día que se va a servir
        </label>
        <input
          type="date"
          id="diaServicio"
          name="menuPreparationDay"
          onChange={handleDateChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiempoComida">
          Tiempo de comida
        </label>
        <select
          id="tiempoComida"
          name="menuMealtime"
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione una opción</option>
          {tiempoComidaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="porciones">
          Porciones
        </label>
        <input
          type="number"
          id="porciones"
          name="menuPortions"
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Enviar
      </button>
    </form>
  );
};

export default FormularioMenuDiario;