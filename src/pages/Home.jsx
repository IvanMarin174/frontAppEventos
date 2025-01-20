import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alerta } from "../Components/Alerta";


export const Home = () => {
    const [loading, setLoading] = useState(false);
    const [mensaje, setMensaje] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        const formData = {
            correo: email,
            password: password,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/Autenticacion/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();

                localStorage.setItem('token', result.token);
                navigate('/eventos');
            } else {
                const error = await response.json();
                setMensaje(error.message)
          
                console.error('Error en el inicio de sesión:', error.message);
                setLoading(false)
            }
        } catch (error) {
            setMensaje(error)
            
            console.error('Error de red o en el servidor:', error);
            setLoading(false)
        }
    }


    return (
        <>
            <div className='mx-auto  p-4'>
                
                   {mensaje && <Alerta mensaje={mensaje} />}
                
                <form className="max-w-sm mx-auto font-medium bg-slate-300  dark:bg-indigo-950 p-5" onSubmit={handleSubmit}>
                    <div className="mb-5 text-gray-900 dark:text-white text-center">
                        Inicia Sesion
                    </div>

                    <div className="mb-5">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="correo" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                    </div>
                    <div className="mb-5">
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tu password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
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