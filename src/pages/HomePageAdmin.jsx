import BarraDePesquisa from "../components/BarraDePesquisa";
import Denuncias from "../components/Denuncias";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Departamento from "../components/Departamento";

export default function HomePageAdmin({
    todasDenuncias,
    setTodasDenuncias,
    denuncias,
    setDenuncias,
    todosDepartamentos,
    setTodosDepartamentos,
    departamentos,
    setDepartamento
}) {

    const [logado, setLogado] = useState(false);

    const navigate = useNavigate();

    const [tipoPesquisa, setTipoPesquisa] = useState("denuncias");

    useEffect(() => {

        const carregarDenuncias = async () => {
            try {

                const { data } = await axios.get(
                    "https://prefeitura-mais-api-production.up.railway.app/denuncias"
                );

                setTodasDenuncias(data);
                setDenuncias(data);

            } catch (error) {
                console.log(error);
            }
        };

        carregarDenuncias();

    }, []);

    useEffect(() => {

        const carregarDepartamentos = async () => {
            try {

                const { data } = await axios.get(
                    "https://prefeitura-mais-api-production.up.railway.app/departamentos"
                );

                setTodosDepartamentos(data);
                setDepartamento(data);

            } catch (error) {
                console.log(error);
            }
        };

        carregarDepartamentos();

    }, []);



    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLogado(true)
        }
    }, [])

    const departamentoButton = () => {
        navigate('/admin/criar-departamento');
    }

    const logOut = () => {
        localStorage.removeItem("token")
        setLogado(false)
        navigate("/")
    }

    const perfilButton = () => {
        navigate("/perfil")
    }

    return (
        <>
            <div className=" min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-5xl mx-auto">

                    <header className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight whitespace-nowrap">Prefeitura Mais ADM</h1>

                        <BarraDePesquisa className="w-full lg:max-w-md"
                            dados={
                                tipoPesquisa === "denuncias"
                                    ? todasDenuncias
                                    : todosDepartamentos
                            }
                            setResultado={
                                tipoPesquisa === "denuncias"
                                    ? setDenuncias
                                    : setDepartamento
                            }
                            tipoPesquisa={tipoPesquisa}
                        />

                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full lg:w-auto">
                            <>
                                <button
                                    onClick={() => setTipoPesquisa("denuncias")}
                                    className={`px-4 py-2 rounded-lg ${tipoPesquisa === "denuncias"
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200"
                                        }`}
                                >
                                    Denúncias
                                </button>

                                <button
                                    onClick={() => setTipoPesquisa("departamentos")}
                                    className={`px-4 py-2 rounded-lg ${tipoPesquisa === "departamentos"
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200"
                                        }`}
                                >
                                    Departamentos
                                </button>
                                <button onClick={departamentoButton} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">Criar departamentos</button>
                                <button onClick={logOut} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">logout</button>
                                <button onClick={perfilButton} className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200">perfil</button>
                            </>
                        </div>

                    </header>

                </div>

                <main className="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    {tipoPesquisa === "denuncias" && (
                        <>
                            <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                                Denúncias
                            </h1>

                            <Denuncias denuncias={denuncias} />
                        </>
                    )}

                    {tipoPesquisa === "departamentos" && (
                        <>
                            <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                                Departamentos
                            </h1>

                            <Departamento departamentos={departamentos} />
                        </>
                    )}
                </main>


            </div>
        </>
    )
}
