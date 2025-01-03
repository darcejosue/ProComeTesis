import React, {  useState } from 'react';

const EliminarReceta = ({ id, nombre, eliminar, setEliminar }) => {

   const [idReceta, setIdReceta] = useState(id);
   const [nombreReceta, setNombreReceta] = useState(nombre);

    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleDelete = async () => {
        try {
            await fetch('http://localhost:4000/api/recipe/'+idReceta, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              })
          } catch (error) {
            console.error(error)
            }
            handleToggle();
            setEliminar(!eliminar);
    };

    return (
        <div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold my-1 py-4 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleToggle}
            >
                Eliminar
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
                        <h1 className='font-bold'>¿Quiere eliminar {nombre}?</h1>
                        <br />
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold mx-10 my-1 py-4 px-8 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleDelete}>Si</button>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold mx-10 my-1 py-4 px-8 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleToggle}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EliminarReceta;