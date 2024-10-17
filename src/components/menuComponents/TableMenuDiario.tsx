'use client'

import React, { useEffect, useState } from 'react';

interface Menu {
  _id: string;
  menuSaucer: string;
  menuPreparationDay: Date;
  menuMealtime: string;
  menuPortions: number;
}

const TableMenu = ({busqueda}) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [editing, setEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Menu | null>(null);

  useEffect(()=>{
    async function getInsumos(){
      const data = await fetch('http://localhost:4000/api/menu')
      const menu = await data.json();
      console.log(menu);
      setMenus(menu)
    }
    getInsumos()
  },[])

  
  const handleEdit = (menu: Menu) => {
    setEditing(true);
    setCurrentRecipe(menu);
  };

  const handleSave = (menu: Menu) => {
    const updatedRecipes = menus.map((r) => (r._id === menu._id ? menu : r));
    setMenus(updatedRecipes);
    setEditing(false);
    setCurrentRecipe(null);
  };

  const menuFiltrado = menus.filter((menu)=>{
    return(
      (busqueda === '' || menu.menuSaucer.toLowerCase().includes( busqueda.toString().toLowerCase()))
    )
  })

  const convertDate = (date: Date) => {
    const mongoDate = new Date(date)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return mongoDate.toLocaleDateString('es-ES', options)
}

  return (
    <div className="container mx-auto p-4">
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 p-2">Receta</th>
            <th className="border border-gray-400 p-2 px-2">Día a servir</th>
            <th className="border border-gray-400 p-2">Tiempo de comida</th>
            <th className="border border-gray-400 p-2">Porciones</th>
            {(<th className="border border-gray-400 p-2">Ver Receta</th>)}
          </tr>
        </thead>
        <tbody>
          {menuFiltrado.map((menu) => (
            <tr key={menu._id}>
              <td className="border border-gray-400 p-2">{menu.menuSaucer.recipeName}</td>
              <td className="border border-gray-400 p-2">{convertDate(menu.menuPreparationDay)}</td>
              <td className="border border-gray-400 p-2">{menu.menuMealtime}</td>
              <td className="border border-gray-400 p-2">{menu.menuPortions}</td>
              {(<td className="border border-gray-400 p-2">
                {editing && currentRecipe?._id === menu._id ? (
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleSave(menu)}
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEdit(menu)}
                  >
                    Ver Receta
                  </button>
                )}
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMenu;