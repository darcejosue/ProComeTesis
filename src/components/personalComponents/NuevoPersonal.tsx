'use client'

import React, { useState } from 'react';

const PersonalManagement = () => {
  const [personal, setPersonal] = useState([]);
  const [newPersonal, setNewPersonal] = useState({
    nombre: '',
    cargo: '',
    horario: '',
    telefono: '',
    vacacionesSalida: '',
    vacacionesEntrada: '',
    salario: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPersonal({ ...newPersonal, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    setNewPersonal({ ...newPersonal, [type]: e.target.value });
  };

  const [vista, setVista]= useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPersonal([...personal, newPersonal]);
    setNewPersonal({
      nombre: '',
      cargo: '',
      horario: '',
      telefono: '',
      vacacionesSalida: '',
      vacacionesEntrada: '',
      salario: '',
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gestión de Personal</h1>
        <button onClick={()=>setVista(!vista)}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-9'>
            Añadir empleado
        </button>
    { vista ?
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">Empleado</label>
          <input
            type="text"
            name="personal"
            value={newPersonal.nombre}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">Cargo</label>
          <input
            type="text"
            name="cargo"
            value={newPersonal.cargo}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">Horario</label>
          <input
            type="text"
            name="horario"
            value={newPersonal.horario}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={newPersonal.telefono}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">Vacaciones Salida</label>
          <input
            type="date"
            name="vacacionesSalida"
            value={newPersonal.vacacionesSalida}
            onChange={(e) => handleDateChange(e, 'vacacionesSalida')}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">Vacaciones Entrada</label>
          <input
            type="date"
            name="vacacionesEntrada"
            value={newPersonal.vacacionesEntrada}
            onChange={(e) => handleDateChange(e, 'vacacionesEntrada')}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-lg font-bold mb-2">Salario</label>
          <input
            type="number"
            name="salario"
            value={newPersonal.salario}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Agregar
        </button>
      </form>
    :
    <h2></h2>
}
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border border-gray-300">Empleado</th>
            <th className="p-2 border border-gray-300">Cargo</th>
            <th className="p-2 border border-gray-300">Horario</th>
            <th className="p-2 border border-gray-300">Teléfono</th>
            <th className="p-2 border border-gray-300">Vacaciones Salida</th>
            <th className="p-2 border border-gray-300">Vacaciones Entrada</th>
            <th className="p-2 border border-gray-300">Salario</th>
          </tr>
        </thead>
        <tbody>
          {personal.map((item, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300">{item.nombre}</td>
              <td className="p-2 border border-gray-300">{item.cargo}</td>
              <td className="p-2 border border-gray-300">{item.horario}</td>
              <td className="p-2 border border-gray-300">{item.telefono}</td>
              <td className="p-2 border border-gray-300">{item.vacacionesSalida}</td>
              <td className="p-2 border border-gray-300">{item.vacacionesEntrada}</td>
              <td className="p-2 border border-gray-300">{item.salario}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalManagement;