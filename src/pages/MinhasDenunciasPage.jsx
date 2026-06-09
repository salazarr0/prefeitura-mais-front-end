import axios from "axios";
import { useState, useEffect } from "react";
import CardDenuncia from "../components/cardDenuncia";
import { useNavigate } from "react-router";

export default function MinhasDenunciasPage() {
    const [denuncias, setDenuncias] = useState([]);
    const navigate = useNavigate();

    const [filtroStatus, setFiltroStatus] = useState("Todos");
    
    const denunciasFiltradas = filtroStatus === "Todos"
        ? denuncias
        : denuncias.filter((denuncia) => denuncia.status === filtroStatus);

    const carregarMinhasDenuncias = async () => {
        try {
            const token = localStorage.getItem("token");
            const { data } = await axios.get('https://prefeitura-mais-api-production.up.railway.app/usuarios/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setDenuncias(data.denuncias || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        carregarMinhasDenuncias();
    }, []);

    const backButton = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={backButton}
                    className="mb-6 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer shadow-sm"
                >
                    Voltar
                </button>

                <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-2xl font-extrabold text-blue-700 mb-4 border-b border-gray-200 pb-4">
                        Minhas Denúncias
                    </h3>

                    <div className="flex flex-wrap gap-2 my-4">
                        {["Todos", "Pendente", "Em análise", "Resolvido"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFiltroStatus(status)}
                                className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all border cursor-pointer ${filtroStatus === status
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {denunciasFiltradas.length > 0 ? (
                            denunciasFiltradas.map((denuncia) => (
                                <CardDenuncia
                                    key={denuncia.id}
                                    id={denuncia.id}
                                    titulo={denuncia.titulo}
                                    descricao={denuncia.descricao}
                                    status={denuncia.status}
                                    endereco={denuncia.endereco}
                                    tipo_denuncia={denuncia.tipo}
                                    votosIniciais={denuncia.votos || 0}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">Nenhuma denúncia encontrada para este filtro.</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}
