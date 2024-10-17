import React, { useEffect, useState } from 'react';

interface Ingrediente {
  _id:string
  stockName: string;
  stockPrice: number;
  stockUnitMesure: string;
  cantidadPorPlato: number;
}


const BuscadorIngrediente = ({setId, setIngredienteNombre, setPrecio, setUnidad}) => {
    const [query, setQuery] = useState('');
    const [resultados, setResultados] = useState<Ingrediente[]>([]);
    const [ingrediente, setIngrediente] = useState<Ingrediente[]>([])

    useEffect(()=>{
        async function ingredienteList() {
          const data = await fetch('http://localhost:4000/api/stock')
          const ingredienteData = await data.json()
          setIngrediente(ingredienteData)
        }
        ingredienteList()
      },[])

    const manejarCambio = (e:React.ChangeEvent<HTMLInputElement>) => {
        
        const valor = e.target.value;
        setQuery(valor);

        const filtrados = ingrediente.filter((dato)=>
          dato.stockName.toLowerCase().includes(valor.toLowerCase()) 
    );
        setResultados(filtrados);
    };


    const manejarClick = (_id:string,nombre:string,precio:number,unitMedida:string) => {
        setQuery(nombre);
        setResultados([]);
        setId(_id)
        setIngredienteNombre(nombre)
        setPrecio(precio)
        setUnidad(unitMedida)

    };

    return (
        <div>
            <input
                type="text"
                placeholder="Buscar..."
                value={query}
                onChange={manejarCambio}
            />
            <ul>
                {resultados.map(resultado => (
                    <li key={resultado._id} onClick={() => 
                    manejarClick(resultado._id,resultado.stockName,
                     resultado.stockPrice, resultado.stockUnitMesure)}>
                        {resultado.stockName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BuscadorIngrediente;