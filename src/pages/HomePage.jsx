import BarraDePesquisa from "../components/BarraDePesquisa";
import Denuncias from "../components/Denuncias";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "../components/SideBar";
import { jwtDecode } from "jwt-decode";

function HomePage({ todasDenuncias, setTodasDenuncias, denuncias, setDenuncias }) {

    const [logado, setLogado] = useState(false);
    const [menuPerfilAberto, setMenuPerfilAberto] = useState(false);

    const [tipoPesquisa, setTipoPesquisa] = useState("denuncias");

    const [pathsSidebar, setPathsSidebar] = useState([]);

    const navigate = useNavigate();

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
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const decoded = jwtDecode(token);

                if (decoded.papel === "adm") {
                    navigate("/admin");
                    return;
                }

                setLogado(true);
            } catch (error) {
                console.error("Erro ao decodificar token", error);
                localStorage.removeItem("token");
                setLogado(false);
            }
        } else {
            setLogado(false);
        }
    }, [navigate]);

    useEffect(() => {
        const paths = [
            { id: 1, path: "/", nome: "home", onClick: homeButton },
            { id: 2, path: "/postar-denuncia", nome: "postar denúncia", onClick: denunciaButton }
        ];

        if (logado) {
            const token = localStorage.getItem("token");
            let isFuncionario = false;

            try {
                if (token) {
                    const decoded = jwtDecode(token);
                    if (decoded.papel === "funcionario") {
                        isFuncionario = true;
                    }
                }
            } catch (error) {
                console.error("Erro ao decodificar token", error);
            }

            if (isFuncionario) {
                paths.push({ id: 3, path: "/funcionario/dashboard", nome: "meu dashboard", onClick: () => navigate("/funcionario/dashboard") });
            }
        }

        setPathsSidebar(paths);
    }, [logado, navigate]);

    const denunciaButton = () => {
        navigate("/postar-denuncia");
    };

    const logOut = () => {
        localStorage.removeItem("token");
        setLogado(false);
        navigate("/");
    };

    const registerButton = () => {
        navigate("/registro");
    };

    const loginButton = () => {
        navigate("/login");
    };

    const perfilButton = () => {
        navigate("/perfil");
    };

    const homeButton = () => {
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">

            <div className="max-w-5xl mx-auto">

                <header className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight whitespace-nowrap">
                        Prefeitura Mais
                    </h1>

                    <SideBar pathsSidebar={pathsSidebar} />

                    <BarraDePesquisa
                        dados={
                            todasDenuncias
                        }
                        setResultado={
                            setDenuncias
                        }
                        tipoPesquisa={tipoPesquisa}
                    />

                    <div className="flex items-center justify-center gap-3 relative">

                        <button
                            onClick={denunciaButton}
                            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                        >
                            postar denúncia
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
                                {logado ? (
                                    <>
                                        <button
                                            onClick={perfilButton}
                                            className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                        >
                                            Meu perfil
                                        </button>

                                        <button
                                            onClick={logOut}
                                            className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                        >
                                            Sair
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={loginButton}
                                            className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                        >
                                            Login
                                        </button>

                                        <button
                                            onClick={registerButton}
                                            className="w-full text-left px-4 py-3 text-sm font-semibold text-gray-700 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                                        >
                                            Registrar
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                    </div>

                </header>

                <main className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                    <h1 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                        Denúncias
                    </h1>

                    <Denuncias denuncias={denuncias} />

                </main>

            </div>

        </div>
    );
}

export default HomePage;