'use client'

import React, { useState } from 'react';

const categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3'];
const unidadesDeMedida = ['Unidad 1', 'Unidad 2', 'Unidad 3'];
const proveedores = ['Proveedor 1', 'Proveedor 2', 'Proveedor 3'];

const FormularioInsumo = () => {
  const [nombreInsumo, setNombreInsumo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [descripcion, setDescripcion] = useState('');
  const [unidadDeMedida, setUnidadDeMedida] = useState('');
  const [precio, setPrecio] = useState(0);
  const [proveedor, setProveedor] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      nombreInsumo,
      categoria,
      cantidad,
      descripcion,
      unidadDeMedida,
      precio,
      proveedor,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto mt-20 text-black">
      <h2 className="text-lg font-bold mb-4">Formulario de Insumo</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="nombreInsumo">
            Nombre de Insumo
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="text"
            id="nombreInsumo"
            value={nombreInsumo}
            onChange={(e) => setNombreInsumo(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="categoria">
            Categoria
          </label>
          <select
            className="p-2 rounded-lg border border-gray-300"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
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
          <label className="text-sm font-bold mb-2" htmlFor="cantidad">
            Cantidad
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="descripcion">
            Descripcion
          </label>
          <textarea
            className="p-2 rounded-lg border border-gray-300"
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="unidadDeMedida">
            Unidad de Medida
          </label>
          <select
            className="p-2 rounded-lg border border-gray-300"
            id="unidadDeMedida"
            value={unidadDeMedida}
            onChange={(e) => setUnidadDeMedida(e.target.value)}
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
          <label className="text-sm font-bold mb-2" htmlFor="precio">
            Precio
          </label>
          <input
            className="p-2 rounded-lg border border-gray-300"
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(parseInt(e.target.value, 10))}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="text-sm font-bold mb-2" htmlFor="proveedor">
            Proveedor
          </label>
          <select
            className="p-2 rounded-lg border border-gray-300"
            id="proveedor"
            value={proveedor}
            onChange={(e) => setProveedor(e.target.value)}
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((proveedor) => (
              <option key={proveedor} value={proveedor}>
                {proveedor}
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