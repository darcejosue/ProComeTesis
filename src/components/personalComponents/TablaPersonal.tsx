import React, { useEffect, useState } from 'react'

interface Personal {
    _id: string;
    personalNombre: string;
    personalCargo: string;
    personalHorario: string;
    personalTel: string;
    personalVacacionesS: Date;
    personalVacacionesE: Date;
    personalSalary: number;
}

export const TablaPersonal = () => {



    const [personal, setPersonal] = useState<Personal[]>([]);

    useEffect(() => {
        async function getInsumos() {
            const data = await fetch('http://localhost:4000/api/personal')
            const personal = await data.json();
            setPersonal(personal)
        }
        getInsumos()
    }, [])

    const convertDate = (date: Date) => {
        const mongoDate = new Date(date)
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        return mongoDate.toLocaleDateString('es-ES', options)
    }

    return (
        <div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="p-2 border border-gray-300">Empleado</th>
                        <th className="p-2 border border-gray-300">Cargo</th>
                        <th className="p-2 border border-gray-300">Horario</th>
                        <th className="p-2 border border-gray-300">Teléfono</th>
                        <th className="p-2 border border-gray-300">Vacaciones Salida</th>
                        <th className="p-2 border border-gray-300">Vacaciones Entrada</th>
                        <th className="p-2 border border-gray-300">Salario</th>
                    </tr>
                </thead>
                <tbody>
                    {personal.map((item) => (
                        <tr key={item._id}>
                            <td className="p-2 border border-gray-300">{item.personalNombre}</td>
                            <td className="p-2 border border-gray-300">{item.personalCargo}</td>
                            <td className="p-2 border border-gray-300">{item.personalHorario}</td>
                            <td className="p-2 border border-gray-300">{item.personalTel}</td>
                            <td className="p-2 border border-gray-300">{convertDate(item.personalVacacionesS)}</td>
                            <td className="p-2 border border-gray-300">{convertDate(item.personalVacacionesE)}</td>
                            <td className="p-2 border border-gray-300">{item.personalSalary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
