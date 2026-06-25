import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function DenunciaDetalhesPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [denuncia, setDenuncia] = useState(null);
    const [comentarios, setComentarios] = useState([]);
    const [novoComentario, setNovoComentario] = useState("");
    const [loading, setLoading] = useState(true);

    const carregarDetalhes = async () => {
        try {
            const { data } = await axios.get("https://prefeitura-mais-api-production.up.railway.app/denuncias");
            const d = data.find((item) => item.id === Number(id));
            setDenuncia(d || null);
        } catch (error) {
            console.log(error);
        }
    };

    const carregarComentarios = async () => {
        try {
            const { data } = await axios.get(`https://prefeitura-mais-api-production.up.railway.app/comentarios/${id}`);
            setComentarios(data || []);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            await carregarDetalhes();
            await carregarComentarios();
            setLoading(false);
        };
        fetchAll();
    }, [id]);

    const postarComentario = async (e) => {
        e.preventDefault();
        if (!novoComentario.trim()) return;

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `https://prefeitura-mais-api-production.up.railway.app/comentarios/${id}`,
                { texto: novoComentario },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setNovoComentario("");
            await carregarComentarios();
        } catch (error) {
            console.log("Erro ao postar comentário", error);
            alert("Erro ao postar comentário. Tem certeza que está logado?");
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Carregando detalhes...</div>;
    }

    if (!denuncia) {
        return <div className="p-8 text-center text-red-600">Denúncia não encontrada.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors inline-flex items-center justify-center bg-transparent border-none shadow-none hover:shadow-none hover:-translate-y-0"
                    title="Voltar"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="mb-8 border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start">
                        <h2 className="text-3xl font-extrabold text-blue-800">{denuncia.titulo}</h2>
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full border 
                            ${denuncia.status === 'Resolvido' ? 'bg-green-100 text-green-700 border-green-200' : 
                              denuncia.status === 'Em análise' ? 'bg-indigo-100 text-indigo-700 border-indigo-200' : 
                              'bg-yellow-100 text-yellow-700 border-yellow-200'}`}
                        >
                            {denuncia.status}
                        </span>
                    </div>
                    <p className="mt-4 text-gray-700 text-lg">{denuncia.descricao}</p>
                    <div className="mt-4 flex gap-4 text-sm text-gray-500 font-medium">
                        <p> {denuncia.endereco}</p>
                        <p> {denuncia.tipo ? denuncia.tipo.join(", ") : ""}</p>
                        <p> {denuncia.votos || 0} Confirmações</p>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Comentários e Atualizações</h3>
                    <div className="space-y-4">
                        {comentarios.length > 0 ? (
                            comentarios.map((c) => (
                                <div key={c.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-bold text-gray-800">
                                            {c.nome_usuario} 
                                            {c.tipo_usuario !== 'cidadao' && (
                                                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                                    {c.tipo_usuario}
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(c.data).toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700">{c.texto}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 italic">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Adicionar um Comentário</h4>
                    <form onSubmit={postarComentario} className="flex flex-col gap-3">
                        <textarea
                            value={novoComentario}
                            onChange={(e) => setNovoComentario(e.target.value)}
                            placeholder="Escreva seu comentário ou atualização sobre este problema..."
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                            rows="4"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={!novoComentario.trim()}
                            className="self-end px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm"
                        >
                            Comentar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
