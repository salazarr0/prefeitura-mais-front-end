import BarraDePesquisa from "../components/BarraDePesquisa";
import Denuncias from "../components/Denuncias";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";


import axios from "axios";
import SideBar from "../components/SideBar";
import { jwtDecode } from "jwt-decode";

function HomePage({ todasDenuncias, setTodasDenuncias, denuncias, setDenuncias }) {

    const [logado, setLogado] = useState(false);

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
            setLogado(true);
        }
    }, []);

     useEffect(() => {
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

            const paths = [
                { id: 1, path: "/", nome: "home", onClick: homeButton },
                { id: 2, path: "/", nome: "logout", onClick: logOut },
                { id: 3, path: "/perfil", nome: "meu perfil", onClick: perfilButton }
            ];

            if (isFuncionario) {
                paths.push({ id: 4, path: "/funcionario/dashboard", nome: "meu dashboard", onClick: () => navigate("/funcionario/dashboard") });
            }

            setPathsSidebar(paths);
        }
        else {
            setPathsSidebar([
                { id: 1, path: "/", nome: "home", onClick: homeButton },
                { id: 2, path: "/login", nome: "login", onClick: loginButton },
                { id: 3, path: "/registro", nome: "registrar", onClick: registerButton }
            ]);
        }
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

                <header className="flex items-center justify-between bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight">
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

                    <div className="flex gap-3">

                        <button
                            onClick={denunciaButton}
                            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                        >
                            postar denúncia
                        </button>

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