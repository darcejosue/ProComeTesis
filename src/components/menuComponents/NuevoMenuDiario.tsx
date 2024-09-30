'use client'

import React, { useState } from 'react';

interface FormValues {
  nombreReceta: string;
  diaServicio: Date;
  tiempoComida: string;
  porciones: number;
}

const tiempoComidaOptions = [
  { value: 'desayuno', label: 'Desayuno' },
  { value: 'almuerzo', label: 'Almuerzo' },
  { value: 'cena', label: 'Cena' },
];

const recetaOptions = [
  { value: 'receta 1', label: 'Tacos al pastor' },
  { value: 'receta 2', label: 'Ensalada de frutas' },
  { value: 'receta 3', label: 'Indio Viejo' },
];

const FormularioMenuDiario = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    nombreReceta: '',
    diaServicio: new Date(),
    tiempoComida: '',
    porciones: 0,
  });

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreReceta">
          Nombre Receta
        </label>
        <select
          id="nombreReceta"
          name="nombreReceta"
          value={formValues.nombreReceta}
          onChange={handleSelectChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Seleccione una opción</option>
          {recetaOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
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
          name="diaServicio"
          value={formValues.diaServicio.toISOString().split('T')[0]}
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
          name="tiempoComida"
          value={formValues.tiempoComida}
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
          name="porciones"
          value={formValues.porciones}
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