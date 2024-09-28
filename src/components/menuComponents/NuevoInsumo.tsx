'use client'

import React, { useState } from 'react';

const comidas = ['Desayuno', 'Almuerzo', 'Cena'];

const FormularioInsumo = () => {
  const [receta, setReceta] = useState('');
  const [diaServir, setDiaServir] = useState('');
  const [tiempoComida, setTiempoComida] = useState('');
  const [porciones, setPorciones] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({receta,diaServir,tiempoComida,porciones});
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto mt-20 text-black">
      <h2 className="text-lg font-bold mb-4">Formulario Menu Diario</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="receta">
            Nombre de Receta
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="text"
            id="receta"
            value={receta}
            onChange={(e) => setReceta(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="diaServir">
            Dia que se va a servir
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            id="diaServir"
            value={diaServir}
            onChange={(e) => setDiaServir(e.target.value)}
          />
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="tiempoComida">
            En que tiempo de comida se servira?
          </label>
          <select
            className="p-2 rounded-lg border border-gray-300"
            id="tiempoComida"
            value={tiempoComida}
            onChange={(e) => setTiempoComida(e.target.value)}
          >
            <option value="">Seleccione </option>
            {comidas.map((comida) => (
              <option key={comida} value={comida}>
                {comida}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="porciones">
            Para cuantas personas
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            id="porciones"
            value={porciones}
            onChange={(e) => setPorciones(e.target.value)}
          />
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormularioInsumo;