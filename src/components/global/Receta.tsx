import React, { useState } from 'react';

const Receta = ({ ingredientes, receta, nombre }) => {

    const [recetaShow, setRecetaShow] = useState(receta);
    const [ingredientesShow, setIngredientesShow] = useState(ingredientes);

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-1 py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleToggle}
            >
                Ver receta
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
                        <h2 className="text-lg font-bold mb-4">Preparacion de {nombre}</h2>
                        <hr />
                        <h3 className='font-bold'>Ingredientes: </h3>
                        <p className="text-gray-600">{ingredientesShow.map((ingrediente) =>
                            (<li key={ingrediente._id}>{ingrediente.stockName}: {ingrediente.cantidadPorPlato} {ingrediente.stockUnitMesure} por plato</li>))}</p>
                        <br/>
                        <h2 className='font-bold'>Preparación:</h2>
                        <hr/>
                        <p>{receta}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Receta;