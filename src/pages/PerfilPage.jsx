import axios from "axios"
import { useState, useEffect } from "react"
import CardDenuncia from "../components/cardDenuncia"
import { useNavigate } from "react-router"


export default function PerfilPage() {
    const [nome, setnome] = useState("")
    const [email, setEmail] = useState("")
    const [papel, setPapel] = useState("")
    const [estatisticas, setEstatisticas] = useState({ total: 0, pendente: 0, emAnalise: 0, resolvido: 0 });
    const navigate = useNavigate();

    const perfil = async () => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axios.get('https://prefeitura-mais-api-production.up.railway.app/usuarios/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(data)
            setnome(data.nome || "")
            setEmail(data.email || "")
            setPapel(data.papel || "")
            if (data.estatisticas) {
                setEstatisticas(data.estatisticas);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        perfil();
    }, []);

    if (email === "admin@prefeitura.gov.br") {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-5xl mx-auto">

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                        <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
                            <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700">
                                Meu Perfil
                            </h1>

                            <img
                                src="https://cdn-icons-png.flaticon.com/128/7542/7542190.png"
                                className="w-8 h-8"
                            ></img>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                <h1 className="text-sm text-gray-500 font-semibold mb-1">Nome</h1>
                                <p className="text-gray-800 font-bold">{nome}</p>
                            </div>

                            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                <h1 className="text-sm text-gray-500 font-semibold mb-1">Email</h1>
                                <p className="text-gray-800 font-bold break-words">{email}</p>
                            </div>

                            <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                                <h1 className="text-sm text-gray-500 font-semibold mb-1">Papel</h1>
                                <p className="text-gray-800 font-bold">{papel}</p>
                            </div>

                        </div>

                    </section>

                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                            Minhas Estatísticas
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-center border border-blue-100">
                                <p className="text-3xl font-extrabold">{estatisticas.total}</p>
                                <p className="text-sm font-semibold">Total Criadas</p>
                            </div>
                            <div className="bg-yellow-50 text-yellow-700 p-4 rounded-xl text-center border border-yellow-100">
                                <p className="text-3xl font-extrabold">{estatisticas.pendente}</p>
                                <p className="text-sm font-semibold">Pendentes</p>
                            </div>
                            <div className="bg-indigo-50 text-indigo-700 p-4 rounded-xl text-center border border-indigo-100">
                                <p className="text-3xl font-extrabold">{estatisticas.emAnalise}</p>
                                <p className="text-sm font-semibold">Em Análise</p>
                            </div>
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center border border-green-100">
                                <p className="text-3xl font-extrabold">{estatisticas.resolvido}</p>
                                <p className="text-sm font-semibold">Resolvidas</p>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                             <button
                                onClick={() => navigate("/minhas-denuncias")}
                                className="px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                             >
                                 Ver Minhas Denúncias Detalhadas
                             </button>
                        </div>
                    </section>

                </div>
            </div>
        )
    }

    const backButton = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">

                <button
                    onClick={backButton}
                    className="mb-6 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer shadow-sm"
                >
                    Voltar
                </button>

                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">

                    <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 border-b border-gray-200 pb-4 mb-4">
                        Meu Perfil
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                            <h1 className="text-sm text-gray-500 font-semibold mb-1">Nome</h1>
                            <p className="text-gray-800 font-bold">{nome}</p>
                        </div>

                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                            <h1 className="text-sm text-gray-500 font-semibold mb-1">Email</h1>
                            <p className="text-gray-800 font-bold break-words">{email}</p>
                        </div>

                        <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl">
                            <h1 className="text-sm text-gray-500 font-semibold mb-1">Papel</h1>
                            <p className="text-gray-800 font-bold">{papel}</p>
                        </div>

                    </div>

                </section>

                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                        Minhas Estatísticas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div className="bg-blue-50 text-blue-700 p-4 rounded-xl text-center border border-blue-100">
                            <p className="text-3xl font-extrabold">{estatisticas.total}</p>
                            <p className="text-sm font-semibold">Total Criadas</p>
                        </div>
                        <div className="bg-yellow-50 text-yellow-700 p-4 rounded-xl text-center border border-yellow-100">
                            <p className="text-3xl font-extrabold">{estatisticas.pendente}</p>
                            <p className="text-sm font-semibold">Pendentes</p>
                        </div>
                        <div className="bg-indigo-50 text-indigo-700 p-4 rounded-xl text-center border border-indigo-100">
                            <p className="text-3xl font-extrabold">{estatisticas.emAnalise}</p>
                            <p className="text-sm font-semibold">Em Análise</p>
                        </div>
                        <div className="bg-green-50 text-green-700 p-4 rounded-xl text-center border border-green-100">
                            <p className="text-3xl font-extrabold">{estatisticas.resolvido}</p>
                            <p className="text-sm font-semibold">Resolvidas</p>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                            <button
                            onClick={() => navigate("/minhas-denuncias")}
                            className="px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
                            >
                                Ver Minhas Denúncias Detalhadas
                            </button>
                    </div>
                </section>

            </div>
        </div>
    )
}