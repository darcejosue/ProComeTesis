'use client'

import { useState } from 'react';

interface TableItem {
  insumo: string;
  precio: number;
  cantidad: number;
  total: number;
  fecha: string;
}

const initialTableItems: TableItem[] = [
  { insumo: 'Cebolla', precio: 25, cantidad: 10, total: 250, fecha: '2024-08-01' },
  { insumo: 'Chiltomas', precio: 15, cantidad: 40, total: 600, fecha: '2024-08-01' },
];

const ListaCompras = () => {
  const [tableItems, setTableItems] = useState(initialTableItems);
  const [newItem, setNewItem] = useState({
    insumo: '',
    precio: 0,
    cantidad: 0,
    total: 0,
    fecha: '',
  });



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-lg font-bold mb-4">Lista de Compra Verduras Ordoñes</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Insumo</th>
            <th className="border border-gray-400 p-2">Precio</th>
            <th className="border border-gray-400 p-2">Cantidad</th>
            <th className="border border-gray-400 p-2">Total</th>
            <th className="border border-gray-400 p-2">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {tableItems.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-400 p-2">{item.insumo}</td>
              <td className="border border-gray-400 p-2">{item.precio}</td>
              <td className="border border-gray-400 p-2">{item.cantidad}</td>
              <td className="border border-gray-400 p-2">{item.total}</td>
              <td className="border border-gray-400 p-2">{item.fecha}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};

export default ListaCompras;