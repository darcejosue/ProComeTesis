'use client'

import React, { useState } from 'react';

interface Proveedor {
  _id: number;
  supplierName: string;
  supplierTel: string;
}

const FormularioProveedor = ({setVisible}) => {
  const [proveedor, setProveedor] = useState<Proveedor[]>([]);

  const [enviado, setEnviado] = useState(false);
  const [noEnviado, setNoEnviado] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
    console.log(proveedor)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   try {
        await fetch('http://localhost:4000/api/supplier/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedor)
        })

        setTimeout(() => {
          setEnviado(false);
        }, 3000);
    } catch (error) {
      setTimeout(() => {
        setNoEnviado(false);
        console.log(error);
      }, 3000);
    }
    setVisible(false)
  };





  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-bold mb-4">Registro de Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplierName">
            Nombre Proveedor
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="supplierName"
            type="text"
            name="supplierName"
            value={proveedor.supplierName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="supplierTel">
            Teléfono
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="supplierTel"
            type="text"
            name="supplierTel"
            value={proveedor.supplierTel}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enviar
        </button>
      </form>
      {enviado && (
        <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">Proveedor registrado con éxito.</span>
        </div>
      )}
      {noEnviado && (
        <div className="mt-4 bg-green-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">Sucedio un problema en el regitro.</span>
        </div>
      )}
    </div>
  );
};

export default FormularioProveedor;