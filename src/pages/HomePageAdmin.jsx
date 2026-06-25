import BarraDePesquisa from "../components/BarraDePesquisa";
import Denuncias from "../components/Denuncias";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import Departamento from "../components/Departamento";
import SideBar from "../components/SideBar";

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
    const [menuPerfilAberto, setMenuPerfilAberto] = useState(false);

    const navigate = useNavigate();

    const [tipoPesquisa, setTipoPesquisa] = useState("denuncias");

    const [pathsSidebar, setPathsSidebar] = useState([]);

    const dashboardAdminButton = () => {
        navigate('/admin/dashboard');
    }

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
        setPathsSidebar([
            { id: 1, nome: "Denúncias", onClick: () => setTipoPesquisa("denuncias") },
            { id: 2, nome: "Departamentos", onClick: () => setTipoPesquisa("departamentos") },
            { id: 3, nome: "Dashboard Admin", onClick: dashboardAdminButton }
        ])

    }, [tipoPesquisa]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setLogado(true)
        }
    }, [])

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
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-5xl mx-auto">

                    <header className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight whitespace-nowrap">
                            Prefeitura Mais ADM
                        </h1>

                        <SideBar pathsSidebar={pathsSidebar} />

                        <BarraDePesquisa
                            className="w-full lg:max-w-md"
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

                        <div className="flex items-center justify-center gap-3 relative">

                            <button
                                onClick={dashboardAdminButton}
                                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-200"
                            >
                                Dashboard Admin
                            </button>

                            <button
                                onClick={() => setMenuPerfilAberto(!menuPerfilAberto)}
                                className="w-11 h-11 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                                <img
                                    src="https://cdn-icons-png.flaticon.com/128/1250/1250689.png"
                                    className="w-6 h-6"
                                />
                            </button>

                            {menuPerfilAberto && (
                                <div className="absolute right-0 top-14 w-48 bg-white border border-gray-100 rounded-xl shadow-lg p-2 z-50">
                                    <button
                                        onClick={perfilButton}
                                        className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                    >
                                        Meu Perfil
                                    </button>

                                    <button
                                        onClick={logOut}
                                        className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                    >
                                        Sair
                                    </button>
                                </div>
                            )}

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