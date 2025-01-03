import React, { useEffect, useState } from 'react';

const AlertaInsumo = ({insumos, elementosMenores, handleToggle2}) => {

    
    const [isOpen, setIsOpen] = useState(false);
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
        handleToggle2();
        console.log(elementosMenores);
    };

   
    const pocoInsumo = insumos.filter(( elementos) => {
        return (elementos.stockQuantity <= 0)
      });

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-1 py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleToggle}
            >
                Verificar Insumos
            </button>
            {isOpen && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center"
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            handleToggle();
                        }
                    }}
                >
                    <div
                        className="bg-white rounded-lg shadow-md p-10 max-w-lg mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>No hay suficiente inventario en los siguientes ingredientes: </h2>
                        
                        {pocoInsumo.map((insumo) => <li key={insumo._id}>{insumo.stockName} se requieren {elementosMenores} y solo hay {insumo.stockQuantity}</li>)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlertaInsumo;