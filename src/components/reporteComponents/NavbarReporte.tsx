'use client'

import { useState } from 'react';
import ReporteDeCompras from './ReporteCompras';
import ReporteComida from './ReporteGananciaMenu';

interface NavButton {
  id: number;
  label: string;
  content: JSX.Element;
}

const navButtons: NavButton[] = [
  { id: 1, label: 'Reporte de Compras', content: <ReporteDeCompras/> },
  { id: 2, label: 'Reporte de Ganancia Comida', content: <ReporteComida/> },
];

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(navButtons[0]);

  const handleButtonClick = (button: NavButton) => {
    setActiveButton(button);
  };

  return (
    <div className="flex flex-col h-screen">
      <nav className="flex justify-around bg-blue-500 p-4 text-white">
        {navButtons.map((button) => (
          <button
            key={button.id}
            className={`px-4 py-2 ${activeButton.id === button.id ? 'bg-blue-700' : ''}`}
            onClick={() => handleButtonClick(button)}
          >
            {button.label}
          </button>
        ))}
      </nav>
      <div className="flex-1 p-4 bg-gray-100 overflow-y-auto">
        <p>{activeButton.content}</p>
      </div>
    </div>
  );
};

export default Navbar;