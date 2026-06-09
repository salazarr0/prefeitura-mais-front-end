import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AlertCircle, CheckCircle, Clock, Activity } from "lucide-react";
import SideBar from "../components/SideBar";

export default function DashboardPage() {
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);
    const [departamento, setDepartamento] = useState(null);
    const [estatisticas, setEstatisticas] = useState(null);
    const [fila, setFila] = useState([]);
    const [loading, setLoading] = useState(true);

    const [pathsSidebar, setPathsSidebar] = useState([
        { id: 1, nome: "Voltar para Home", onClick: () => navigate("/") },
        { id: 2, nome: "Meu Perfil", onClick: () => navigate("/perfil") },
        {
            id: 3, nome: "Sair", onClick: () => {
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    ]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }
                setLogado(true);

                
                const { data: userData } = await axios.get('https://prefeitura-mais-api-production.up.railway.app/usuarios/me', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (userData.papel !== 'funcionario') {
                    
                    navigate("/");
                    return;
                }

                if (!userData.departamento) {
                    console.error("Funcionário não vinculado a um departamento.");
                    setLoading(false);
                    return;
                }

                setDepartamento(userData.departamento);
                
                
                const depId = userData.departamento.id;

                const [statsRes, filaRes] = await Promise.all([
                    axios.get(`https://prefeitura-mais-api-production.up.railway.app/denuncias/estatisticas/${depId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get(`https://prefeitura-mais-api-production.up.railway.app/denuncias/fila/${depId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                setEstatisticas(statsRes.data);
                setFila(filaRes.data);
            } catch (error) {
                console.error("Erro ao carregar dashboard", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleAtualizarStatus = async (id, novoStatus) => {
        try {
            const token = localStorage.getItem("token");
            await axios.patch(`https://prefeitura-mais-api-production.up.railway.app/denuncias/${id}`, {
                status: novoStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            
            setFila(fila.map(d => d.id === id ? { ...d, status: novoStatus } : d));
            
            
            if (departamento) {
                const statsRes = await axios.get(`https://prefeitura-mais-api-production.up.railway.app/denuncias/estatisticas/${departamento.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEstatisticas(statsRes.data);
            }
        } catch (error) {
            console.error("Erro ao atualizar status", error);
            alert("Erro ao atualizar status");
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-semibold">Carregando Dashboard...</div>;
    }

    if (!departamento) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center">
                <SideBar pathsSidebar={pathsSidebar} />
                <h2 className="text-2xl font-bold text-red-600 mt-20">Acesso Negado ou Departamento não vinculado</h2>
                <p className="mt-4 text-gray-600">Você precisa estar vinculado a um departamento como gerente ou funcionário para ver este dashboard.</p>
            </div>
        );
    }


    const getContagemStatus = (status) => {
        if (!estatisticas || !estatisticas.denuncias_por_status) return 0;
        const s = estatisticas.denuncias_por_status.find(item => item.status === status);
        return s ? s.contagem : 0;
    };

    const pendentes = getContagemStatus("Pendente");
    const emAnalise = getContagemStatus("Em análise");
    const resolvidas = getContagemStatus("Resolvido");
    
    
    const prioridadeAlta = fila.filter(d => d.prioridade === 3 && d.status !== 'Resolvido').length;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <SideBar pathsSidebar={pathsSidebar} />
            
            <div className="max-w-7xl mx-auto pl-0 md:pl-16">
                <header className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard de Atendimento</h1>
                    <p className="text-gray-500 mt-1">Departamento: <span className="font-semibold text-blue-600">{departamento.nome}</span></p>
                </header>

                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                            <AlertCircle size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Prioridade Alta</p>
                            <h3 className="text-2xl font-bold text-gray-800">{prioridadeAlta}</h3>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
                            <Clock size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pendentes</p>
                            <h3 className="text-2xl font-bold text-gray-800">{pendentes}</h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Activity size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Em Análise</p>
                            <h3 className="text-2xl font-bold text-gray-800">{emAnalise}</h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                            <CheckCircle size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Resolvidas</p>
                            <h3 className="text-2xl font-bold text-gray-800">{resolvidas}</h3>
                        </div>
                    </div>
                </div>

                <main className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">Fila de Denúncias</h2>
                        <p className="text-sm text-gray-500 mt-1">Denúncias ordenadas por prioridade.</p>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm">
                                    <th className="p-4 font-semibold border-b">ID</th>
                                    <th className="p-4 font-semibold border-b">Título & Tipo</th>
                                    <th className="p-4 font-semibold border-b">Endereço</th>
                                    <th className="p-4 font-semibold border-b">Prioridade</th>
                                    <th className="p-4 font-semibold border-b">Status</th>
                                    <th className="p-4 font-semibold border-b">Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fila.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-500">Nenhuma denúncia na fila. Bom trabalho!</td>
                                    </tr>
                                ) : (
                                    fila.map(denuncia => (
                                        <tr key={denuncia.id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                                            <td className="p-4 text-sm text-gray-600">#{denuncia.id}</td>
                                            <td className="p-4">
                                                <p className="font-semibold text-gray-800">{denuncia.titulo}</p>
                                                <p className="text-xs text-gray-500">{denuncia.tipo_denuncia}</p>
                                            </td>
                                            <td className="p-4 text-sm text-gray-600 max-w-xs truncate" title={denuncia.endereco_denuncia}>
                                                {denuncia.endereco_denuncia}
                                            </td>
                                            <td className="p-4">
                                                {denuncia.prioridade === 3 && <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Alta</span>}
                                                {denuncia.prioridade === 2 && <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Média</span>}
                                                {denuncia.prioridade === 1 && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Baixa</span>}
                                                {(!denuncia.prioridade || denuncia.prioridade < 1 || denuncia.prioridade > 3) && <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">N/D</span>}
                                            </td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                                    denuncia.status === 'Resolvido' ? 'bg-green-100 text-green-700' :
                                                    denuncia.status === 'Em análise' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                    {denuncia.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <select 
                                                    className="bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                    value={denuncia.status}
                                                    onChange={(e) => handleAtualizarStatus(denuncia.id, e.target.value)}
                                                >
                                                    <option value="Pendente">Pendente</option>
                                                    <option value="Em análise">Em análise</option>
                                                    <option value="Resolvido">Resolvido</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>
        </div>
    );
}
