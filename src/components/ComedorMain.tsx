'use client'

import { Inventario } from "@/pages/Inventario";
import { MenuDiario } from "@/pages/MenuDiario";
import { Proveedores } from "@/pages/Proveedores";
import { Recetas } from "@/pages/Recetas";
import { Reportes } from "@/pages/Reportes";
import { useState } from "react";
import LogoutButton from "./CerrarSesion";
import { Personal } from "@/pages/Personal";

const Comedor = () => {
  const [activeTab, setActiveTab] = useState(<Inventario />);

  const tabs = [
    { name: 'Menu Diario', page: <MenuDiario /> },
    { name: 'Inventario', page: <Inventario /> },
    { name: 'Recetas', page: <Recetas /> },
    { name: 'Proveedores', page: <Proveedores /> },
    { name: 'Reportes', page: <Reportes /> },
    { name: 'Personal', page: <Personal /> },
  ];

  return (
    <div className="flex h-screen ">
      <aside className="bg-gray-200 w-64 p-4 ">
        <ul>
          <li>
            <img src={"https://media.istockphoto.com/id/1153582583/es/vector/la-abuela-est%C3%A1-cocinando-lindo-estilo-conjunto-de-dise%C3%B1o-vectorial-vector.jpg?s=612x612&w=0&k=20&c=gZ1MIbyVQs9iV6CcvzyAygcTocR4cCFWaDyA0q4MIWU="}/>
          </li>
          {tabs.map((tab) => (
            <li key={tab.name}>
              <button
                className={'w-full p-2 py-4 mb-2 border-4 hover:bg-gray-400 '}
                onClick={() => setActiveTab(tab.page)}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <div className="parent">
          <div className="div1">
            {activeTab}
          </div>
          <div className="div2 ">
            <LogoutButton/>
          </div>
        </div>
      </main >
    </div >
  );
};

export default Comedor;