'use client'

import React, { useEffect, useState } from 'react';
import Receta from '../global/Receta';
import EstadoMenu from '../global/EstadoMenu';

interface Menu {
  _id: string;
  menuSaucer: string;
  menuPreparationDay: Date;
  menuMealtime: string;
  menuPortions: number;
  menuEstado: boolean;
}

const TableMenu = ({busqueda}) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [editing, setEditing] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState<Menu | null>(null);

  useEffect(()=>{
    async function getInsumos(){
      const data = await fetch('http://localhost:4000/api/menu')
      const menu = await data.json();
      //console.log(menu);
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
      (busqueda === '' || menu.menuPreparationDay.includes(busqueda))
    )
  })

  const convertDate = (date: Date) => {
    const mongoDate = new Date(date);
    const localDate = new Date(mongoDate.getTime() + (new Date()).getTimezoneOffset()*60000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return localDate.toLocaleDateString('es-US', options);
    //.toLocaleDateString('es-US', options)
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
            <th className="border border-gray-400 p-2">Estado</th>
          </tr>
        </thead>
        <tbody>
          {menuFiltrado.map((menu) => (
            <tr key={menu._id}>
              <td className="border border-gray-400 p-2">{menu.menuSaucer.recipeName}</td>
              <td className="border border-gray-400 p-2">{convertDate(menu.menuPreparationDay)}</td>
              <td className="border border-gray-400 p-2">{menu.menuMealtime}</td>
              <td className="border border-gray-400 p-2">{menu.menuPortions}</td>
              <td><Receta 
              receta={menu.menuSaucer.recipePreparation} 
              ingredientes={menu.menuSaucer.recipeIngredients}
              nombre={menu.menuSaucer.recipeName}/></td>
              
              <td><EstadoMenu id={menu._id} estadoMenu={menu.menuEstado} idReceta={menu.menuSaucer._id}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableMenu;