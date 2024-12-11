import React, { useState } from 'react';

interface PerdidaForm {
    perdidaIngrediente: string;
    perdidaCantidad: number;
    perdidaUnidad: string;
    perdidaDay: Date;
    perdidaPrecio: number;
    perdidaMotivo: string;
}



const PerdidaForm = ({ nombre, unidad, precio }) => {
    const [insumo, setInsumo] = useState(nombre);
    const [unidadInsumo, setUnidadInsumo] = useState(unidad);
    const [precioInsumo, setPrecioInsumo] = useState(precio);
    const [formData, setFormData] = useState<PerdidaForm>({
        perdidaIngrediente: nombre,
        perdidaCantidad: 0,
        perdidaUnidad: unidad,
        perdidaDay: Date.now(),
        perdidaPrecio: precio,
        perdidaMotivo: '',
    });

    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
        setIsOpen(!isOpen);
        try {
            await fetch('http://localhost:4000/api/perdida', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
            })
      
        } catch (error) {
          console.error(error)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleToggle}
            >
                Perdida de insumo
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
                        <h2 className="text-lg font-bold mb-4">Registro de Pérdida</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombreInsumo">
                                    Nombre de Insumo: {insumo}
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precioIndividual">
                                    Precio Individual: C$ {precioInsumo}
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unidad">
                                    Unidad: {unidadInsumo}
                                </label>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perdidaCantidad">
                                    Cantidad de Pérdida
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="perdidaCantidad"
                                    name="perdidaCantidad"
                                    type="number"
                                    value={formData.perdidaCantidad}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perdidaDay">
                                    Fecha de Pérdida
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="perdidaDay"
                                    name="perdidaDay"
                                    type="date"
                                    value={formData.perdidaDay}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="perdidaMotivo">
                                    Motivo de Pérdida
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full h-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="perdidaMotivo"
                                    name="perdidaMotivo"
                                    type="text"
                                    value={formData.perdidaMotivo}
                                    onChange={handleChange}
                                />
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Guardar
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PerdidaForm;