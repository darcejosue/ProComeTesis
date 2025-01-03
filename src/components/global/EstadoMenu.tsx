import React, { useEffect, useState } from 'react';

const EstadoMenu = ({ id, estadoMenu, idReceta }) => {

    const [estado, setEstado] = useState('Pendiente');
    const [color, setColor] = useState('blue');
    const [menu, setMenu] = useState([]);
    const [restarInsumos, setRestarInsumos] = useState([]);
    const [temporalInsumos, setTemporalInsumos] = useState([]);

    useEffect(() => {
        if (estadoMenu) {
            setEstado('Preparado');
            setColor('red');
        }
        async function getMenu() {
            const data = await fetch('http://localhost:4000/api/menu/' + id);
            const menuData = await data.json();
            setMenu(menuData)
            const dataReceta = await fetch('http://localhost:4000/api/recipe/' + idReceta);
            const recetaData = await dataReceta.json();
            setRestarInsumos(recetaData.recipeIngredients);
            setTemporalInsumos(recetaData.recipeIngredients);
            //setIngrediente(ingredienteData);
        }
        getMenu()
    }, [id, estadoMenu, idReceta])


    const validatorStocks = (ingredienteDatos, index) => {
        try {
            const ingredienteData = ingredienteDatos;
            let validador = false;
            //const datoValidar = 0;

            const validarCantidad = Number(ingredienteData.stockQuantity) - (Number(menu.menuPortions) * Number(restarInsumos[index].cantidadPorPlato) /** */);
            const cantidadRequerida = (Number(menu.menuPortions) * Number(restarInsumos[index].cantidadPorPlato) /** */);
            //console.log(ingredienteData.stockQuantity = ingredienteData.stockQuantity - restarInsumos[index].ingredientQuantity)
            if (validarCantidad <= 0) {
                alert("No hay insumo: " + restarInsumos[index].stockName + " hay solo " + ingredienteData.stockQuantity+ " "+ temporalInsumos[index].stockUnitMesure  + " y se necesita: " + cantidadRequerida+ " "+ temporalInsumos[index].stockUnitMesure );
                //setElementosMenores(elementosMenores =>[...elementosMenores, Number(ingredienteData.stockQuantity) ]);
                return validador;
            }
            //console.log(restarInsumos[index].stockName +" si hay insumos: quedan: " + validarCantidad + " luego de: "+ Number(menu.menuPortions) + " porciones y habian "+Number(ingredienteData.stockQuantity) );
            validador = true;
            return validador;
        } catch (error) {
            console.error(error)
        }
    }

    const updateStocks = async (temporalInsumos) => {

        try {
            for (let index = 0; index < temporalInsumos.length; index++) {
                const data = await fetch('http://localhost:4000/api/stock/' + temporalInsumos[index]._id);
                const stockData = await data.json();

                temporalInsumos[index].stockPrice = stockData.stockPrice;

                await fetch('http://localhost:4000/api/stock/' + temporalInsumos[index]._id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(temporalInsumos[index])
                });

            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleToggle = async () => {
        try {
            let checkSave = false;
            for (let index = 0; index < restarInsumos.length; index++) {
                const data = await fetch('http://localhost:4000/api/stock/' + restarInsumos[index]._id)
                const ingredienteData = await data.json();
                const permiso = validatorStocks(ingredienteData, index);


                if (!permiso) {
                    checkSave = true;
                } else {
                    const validarCantidad = Number(ingredienteData.stockQuantity) - (Number(menu.menuPortions) * Number(restarInsumos[index].cantidadPorPlato) /** */);
                    temporalInsumos[index].stockQuantity = validarCantidad;
                    const cantidadRequerida = (Number(menu.menuPortions) * Number(restarInsumos[index].cantidadPorPlato) /** */);
                    console.log("todo esta bien con: " + temporalInsumos[index].stockName + " "+ temporalInsumos[index].stockUnitMesure +" habian " + ingredienteData.stockQuantity + " y ahora hay: " + validarCantidad+ " "+ temporalInsumos[index].stockUnitMesure  + " se usaron: " + cantidadRequerida);

                }
            }
            if (checkSave) {
                console.log("no hay insumos")

            } else {

                updateStocks(temporalInsumos);

                // console.log(temporalInsumos)
                menu.menuEstado = true;
                await fetch('http://localhost:4000/api/menu/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(menu)
                });

                setColor('red');
                setEstado('Preparado');
            }




        } catch (error) {
            console.error(error)
        }

    };


    return (
        <div>

            <button
                className={`bg-${color}-500 hover:bg-${color}-700 text-white font-bold my-1 py-4 px-4 rounded focus:outline-none focus:shadow-outline`}
                onClick={handleToggle}
                disabled={estadoMenu}
            >
                {estado}
            </button> 
        </div>
    );
};

export default EstadoMenu;