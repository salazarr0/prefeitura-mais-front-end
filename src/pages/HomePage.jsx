import Denuncias from "../components/Denuncias";
import { useNavigate } from "react-router";

function HomePage() {

    const navigate = useNavigate();

    const registerButton = () => {

        navigate('/registro');
    }

    const loginButton = () => {

        navigate('/login');
    }

    const denunciaButton = () => {

        navigate('/postar-denuncia');
    }




    return (
        <>
            <div className=" min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-5xl mx-auto">

                    <header className="flex items-center justify-between bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight">Prefeitura Mais</h1>

                        <div className="flex gap-3">
                            <button onClick={registerButton} className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">registrar</button>
                            <button onClick={loginButton} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">login</button>
                            <button onClick={denunciaButton} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">postar denuncia</button>
                        </div>

                    </header>

                </div>

                <main className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Denuncias</h1>

                    <Denuncias />

                </main>


            </div>
        </>
    )
}

export default HomePage;