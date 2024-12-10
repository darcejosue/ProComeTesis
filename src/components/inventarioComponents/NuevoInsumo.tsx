'use client'

import React, { useEffect, useState } from 'react';

const categorias = ["Verdura","Fruta","Grano","Carne","Lacteos", "Otros"];
const unidadesDeMedida = ["gr","lb","ltr","onz","unidad"];

interface Proveedor{
  _id: string;
  supplierName: string;
}

interface Insumos {
  _id: string;
  stockName: string;
  stockDescription: string;
  stockCategory: number;
  stockUnitMesure: number;
  stockQuantity: number;
  stockPrice: number;
  stockSupplier: object;
}

const FormularioInsumo = ({setVisible}) => {
  const [proveedorLista, setProveedorLista] = useState<Proveedor[]>([]);
  const [insumoSave, setInumoSave] = useState<Insumos[]>([])

  useEffect(()=>{
    async function getProveedorName(){
      const data = await fetch('http://localhost:4000/api/supplier')
      const proveedorData = await data.json();
      setProveedorLista(proveedorData);
    }
    getProveedorName()
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInumoSave({ ...insumoSave, [e.target.name]: e.target.value });
  };

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInumoSave({ ...insumoSave, [e.target.name]: e.target.value });
  };

 

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:4000/api/stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(insumoSave)
      })

  } catch (error) {
    console.error(error)
  }
    alert("Producto guardado");
    setVisible(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto mt-20 text-black">
      <h2 className="text-lg font-bold mb-4">Formulario de Insumo</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="stockName">
            Nombre de Insumo
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="text"
            name="stockName"
            value={insumoSave.stockName}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="stockCategory">
            Categoria
          </label>
          <select
            className="p-2 rounded-lg border border-gray-300"
            name="stockCategory"
            value={insumoSave.stockCategory}
            onChange={handleChangeSelect}
          >
            <option value="">Seleccione una categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="stockQuantity">
            Cantidad
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="number"
            name="stockQuantity"
            value={insumoSave.stockQuantity}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="stockDescription">
            Descripcion
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            name="stockDescription"
            value={insumoSave.stockDescription}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="stockUnitMesure">
            Unidad de Medida
          </label>
          <select
            className="p-2 rounded-lg border border-gray-300"
            name="stockUnitMesure"
            value={insumoSave.stockUnitMesure}
            onChange={handleChangeSelect}
          >
            <option value="">Seleccione una unidad de medida</option>
            {unidadesDeMedida.map((unidad) => (
              <option key={unidad} value={unidad}>
                {unidad}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="stockPrice">
            Precio
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="number"
            name="stockPrice"
            value={insumoSave.stockPrice}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="supplierName">
            Proveedor
          </label>
          <select
            className="p-2 rounded-lg border border-gray-300"
            name="stockSupplier"
            value={setInumoSave.stockSupplier}
            onChange={handleChangeSelect}
          >
            <option value="">Seleccione un proveedor</option>
            {proveedorLista.map((proveedor) => (
              <option key={proveedor._id} value={proveedor._id}>
                {proveedor.supplierName}
              </option>
            ))}
          </select>
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