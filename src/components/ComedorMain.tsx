'use client'

import { Inventario } from "@/pages/Inventario";
import { MenuDiario } from "@/pages/MenuDiario";
import { Proveedores } from "@/pages/Proveedores";
import { Recetas } from "@/pages/Recetas";
import { Reportes } from "@/pages/Reportes";
import { useState } from "react";

const Comedor = () => {
    const [activeTab, setActiveTab] = useState(<Inventario/>);
  
    const tabs = [
      { name: 'Menu Diario', page: <MenuDiario/> },
      { name: 'Inventario', page: <Inventario/>  },
      { name: 'Recetas', page: <Recetas/> },
      { name: 'Proveedores', page: <Proveedores/> },
      { name: 'Reportes', page: <Reportes/> },
    ];
  
    return (
      <div className="flex h-screen ">
        <aside className="bg-gray-200 w-64 p-4 ">
          <ul>
            {tabs.map((tab) => (
              <li key={tab.name}>
                <button
                  className={`w-full p-2 ${activeTab === tab.name ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                  onClick={() => setActiveTab(tab.page)}
                >
                  {tab.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4">
          {activeTab}
        </main>
      </div>
    );
  };

export default Comedor;