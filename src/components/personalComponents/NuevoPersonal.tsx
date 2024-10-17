'use client'

import React, {  useState } from 'react';

interface Personal {
  _id: string;
  personalNombre: string;
  personalCargo: string;
  personalHorario: string;
  personalTel: string;
  personalVacacionesS: Date;
  personalVacacionesE: Date;
  personalSalary: number;
}

const PersonalManagement = () => {
  const [newPersonal, setNewPersonal] = useState<Personal[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPersonal({ ...newPersonal, [e.target.name]: e.target.value });
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPersonal({ ...newPersonal, [name]: new Date(value) });
  };

  const [vista, setVista] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch('http://localhost:4000/api/personal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newPersonal)
        })
    } catch (error) {
      console.error(error)
    }
   console.log(newPersonal)
  };


  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Gestión de Personal</h1>
      <button onClick={() => setVista(!vista)}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mb-9'>
        Añadir empleado
      </button>
      {vista ?
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Empleado</label>
            <input
              type="text"
              name="personalNombre"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Cargo</label>
            <input
              type="text"
              name="personalCargo"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Horario</label>
            <input
              type="text"
              name="personalHorario"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Teléfono</label>
            <input
              type="text"
              name="personalTel"
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Vacaciones Salida</label>
            <input
              type="date"
              name="personalVacacionesS"
              onChange={handleDateChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Vacaciones Entrada</label>
            <input
              type="date"
              name="personalVacacionesE"
              onChange={handleDateChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-lg font-bold mb-2">Salario</label>
            <input
              type="number"
              name="personalSalary"
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
      
    </div>
  );
};

export default PersonalManagement;