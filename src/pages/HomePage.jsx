import BarraDePesquisa from "../components/BarraDePesquisa";
import Denuncias from "../components/Denuncias";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";


import axios from "axios";

function HomePage({ todasDenuncias, setTodasDenuncias, denuncias, setDenuncias }) {

    const [logado, setLogado] = useState(false);

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


    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">

            <div className="max-w-5xl mx-auto">

                <header className="flex items-center justify-between bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 tracking-tight">
                        Prefeitura Mais
                    </h1>

                    <BarraDePesquisa
                        denuncias={todasDenuncias}
                        setResultado={setDenuncias}
                    />

                    <div className="flex gap-3">

                        {logado ? (
                            <>
                                <button
                                    onClick={denunciaButton}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    postar denúncia
                                </button>

                                <button
                                    onClick={logOut}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    logout
                                </button>

                                <button onClick={perfilButton}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                                    perfil
                                </button>

                            </>
                        ) : (
                            <>
                                <button
                                    onClick={registerButton}
                                    className="px-4 py-2 text-sm font-semibold text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
                                >
                                    registrar
                                </button>

                                <button
                                    onClick={loginButton}
                                    className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    login
                                </button>
                            </>
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