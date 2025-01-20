import { useState } from "react"
import { Alerta } from "../Components/Alerta";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';
import { Link } from "react-router-dom";
import { Succes } from "../Components/Succes";
export const CrearEvento = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [lugar, setLugar] = useState('');
    const [fecha, setFecha] = useState('');
    const [mensajeE, setMensajeE] = useState(null);
    const [mensajeS, setMensajeS] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const token = localStorage.getItem('token');
        const formData = {
            titulo: titulo,
            descripcion: descripcion,
            lugar : lugar,
            fecha: fecha,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/Eventos/Usuario/Registrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                setMensajeS(result.message);             
            } else {
                const error = await response.json();
                setMensajeE(error.message)
          
                console.error('Error al crear evento:', error.message);
                setLoading(false)
            }
        } catch (error) {
            setMensajeE(error)
            
            console.error('Error de red o en el servidor:', error);
            setLoading(false)
        }
    }
    return (
        <>


            <div className='mx-auto mt-5'>

                {mensajeE && <Alerta mensaje={mensajeE} />}
                {mensajeS && <Succes mensaje={mensajeS} />}

                <div className="flex justify-center items-center">
                    <Link
                        to="/eventos"
                        className="focus:outline-none text-black dark:text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
                    >
                        Ver Eventos
                    </Link>
                </div>
                <form className="max-w-screen-sm mx-auto font-medium bg-slate-300   dark:bg-blue-950 p-10" onSubmit={handleSubmit} >
                    <div className="mb-5 text-gray-900 dark:text-white text-center">
                        Crea tu evento
                    </div>

                    <div className="mb-5">
                        <label for="titulo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Título</label>
                        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} type="text" id="email" name="titulo" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Título" required />
                    </div>
                    <div className="mb-5">

                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descripcion"></textarea>

                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lugar</label>
                        <textarea value={lugar} onChange={(e) => setLugar(e.target.value)} id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Dirección"></textarea>
                    </div>
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fecha</label>
                        <DatePicker
                            selected={fecha}
                            onChange={(date) => setFecha(date)}
                            locale={es}
                            className="p-2 border border-gray-300 rounded-md"
                            placeholderText="Selecciona una fecha"
                        />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        {
                            loading ? <>Cargando...</> : <p>Iniciar</p>
                        }
                    </button>
                </form>


            </div>
        </>
    )
}