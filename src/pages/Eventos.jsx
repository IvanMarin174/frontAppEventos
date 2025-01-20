import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Succes } from "../Components/Succes";
export const Eventos = () => {
    const [eventos, setEventos] = useState([]);
    const [id, setId] = useState('');
    const [mensajeE, setMensajeE] = useState(null);
    const handleDelete = async()=>{
        const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/Eventos/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    setMensajeE('Elimindo correctamente')
                } else {
                    const error = await response.json();
                    console.error('Error al cargar eventos:', error.message);
                }
            } catch (error) {
                console.error('Error de red o en el servidor:', error);
            }
    }
    useEffect(() => {
        const fetchEventos = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/Eventos/Usuario`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const result = await response.json();
                    console.log(result.$values);
                    setEventos(result.$values || []); // Asigna los valores al estado
                } else {
                    setEventos([])
                    const error = await response.json();
                    console.error('Error al cargar eventos:', error.message);
                }
            } catch (error) {
                setEventos([])
                console.error('Error de red o en el servidor:', error);
            }
        };

        fetchEventos();
    }, []);

    return (
        <>

            <div className="flex flex-col justify-center items-center p-5">
                <div className="text-center text-3xl p-5 text-blue-800">
                    <h1>Lista de Eventos</h1>
                </div>
                <div className="flex">
                    <Link
                        to="/eventos/crear"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Nuevo Evento
                    </Link>
                </div>
            </div>
            <div>
                {mensajeE && <Succes mensaje={mensajeE} />}
            </div>
            <>
                {
                    eventos.length > 0 ? (
                        <div className="p-5">
                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-amber-100 text-center">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">#</th>
                                            <th scope="col" className="px-6 py-3">Título</th>
                                            <th scope="col" className="px-6 py-3">Lugar</th>
                                            <th scope="col" className="px-6 py-3">Descripción</th>
                                            <th scope="col" className="px-6 py-3">Fecha</th>
                                            <th scope="col" className="px-6 py-3">Acción</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {eventos.map((evento, index) => (
                                            <tr
                                                key={index}
                                                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                            >
                                                <th
                                                    scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                >
                                                    {index + 1}
                                                </th>
                                                <td className="px-6 py-4">{evento.titulo}</td>
                                                <td className="px-6 py-4">{evento.lugar}</td>
                                                <td className="px-6 py-4">{evento.descripcion}</td>
                                                <td className="px-6 py-4">{evento.fecha}</td>
                                                <td className="px-6 py-4">
                                                    <Link
                                                        key={evento.id} 
                                                        to={`/eventos/edit/${evento.id}`}
                                                       
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Editar
                                                    </Link>
                                                   <form onSubmit={handleDelete}>
                                                   <button type="submit" onClick={() => setId(evento.id)} className="pl-3 font-medium text-red-600 dark:text-red-500 hover:underline">
                                                        Eliminar
                                                    </button>
                                                   </form>
                                                </td>
                                                
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="m-5 bg-gray-100 text-center p-5">
                            <h1>No hay eventos que mostrar</h1>
                        </div>
                        
                    )
                }
            </>

        </>
    );
};
