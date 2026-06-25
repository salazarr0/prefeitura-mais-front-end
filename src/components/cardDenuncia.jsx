import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { MapPin, Tag, User, ThumbsUp, ArrowRight, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

function CardDenuncia({ id, titulo, descricao, endereco, status, usuario, tipo_denuncia, votosIniciais = 0 }) {

    const [contador, setContador] = useState(votosIniciais);
    const [confirmado, setConfirmado] = useState(false);
    const navigate = useNavigate();

    const StatusIcon = status === "Resolvido" ? CheckCircle2 : status === "Em análise" ? Clock : AlertTriangle;

    const corStatus = status === "Resolvido"
        ? "bg-green-50 text-green-700 border-green-200"
        : status === "Em análise"
            ? "bg-blue-50 text-blue-700 border-blue-200"
            : "bg-yellow-50 text-yellow-700 border-yellow-200";

    useEffect(() => {
        const fetchStatus = async () => {
            if (!id) return;
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(`https://prefeitura-mais-api-production.up.railway.app/confirmacoes/${id}/status`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                });
                setContador(data.count);
            } catch (error) {
                console.log("Erro ao carregar status da denúncia", error);
            }
        };
        fetchStatus();
    }, [id]);

    const handleConfirmar = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Você precisa estar logado para confirmar um problema.");
                return;
            }

            const { data } = await axios.post(`https://prefeitura-mais-api-production.up.railway.app/confirmacoes/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setConfirmado(data.confirmed);
            if (data.confirmed) {
                setContador(prev => prev + 1);
            } else {
                setContador(prev => prev - 1);
            }
        } catch (error) {
            console.log("Erro ao confirmar problema", error);
            alert("Erro ao confirmar problema.");
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 h-full flex flex-col group cursor-default">
            <div className="flex justify-between items-start gap-4 mb-4">
                <h2 className="font-extrabold text-lg text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">{titulo}</h2>
                <span className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-full whitespace-nowrap border ${corStatus}`}>
                    <StatusIcon className="w-3.5 h-3.5" />
                    {status}
                </span>
            </div>
            
            <p className="text-gray-600 text-sm flex-grow line-clamp-3 mb-5 leading-relaxed">{descricao}</p>

            <div className="space-y-2.5 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-5">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="font-semibold truncate text-gray-700">{usuario ? usuario : 'Anônimo'}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Tag className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate">{tipo_denuncia}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="truncate" title={endereco}>{endereco}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleConfirmar}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all cursor-pointer font-bold text-sm border shadow-sm active:scale-95 ${
                            confirmado
                            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-blue-300 hover:text-blue-600'
                        }`}
                    >
                        <ThumbsUp className={`w-4 h-4 transition-colors ${confirmado ? 'fill-green-600 text-green-600' : ''}`} />
                        {confirmado ? 'Apoiado' : 'Apoiar'}
                    </button>
                    <span className="flex items-center gap-1.5 text-sm font-bold text-gray-500 bg-gray-100 px-2.5 py-2 rounded-lg border border-gray-200" title="Total de apoios">
                        {contador}
                    </span>
                </div>
                
                <button
                    onClick={() => navigate(`/denuncias/${id}`)}
                    className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-bold transition-colors cursor-pointer group/btn"
                >
                    Ver Mais
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}

export default CardDenuncia;