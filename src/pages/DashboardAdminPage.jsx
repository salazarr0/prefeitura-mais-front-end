import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Building2 } from "lucide-react";
import SideBar from "../components/SideBar";
import { ArrowLeft } from "lucide-react";

export default function DashboardAdminPage() {
    const navigate = useNavigate();
    const [departamentos, setDepartamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroBusca, setFiltroBusca] = useState("");

    const [pathsSidebar, setPathsSidebar] = useState([
        { id: 1, nome: "Home", onClick: () => navigate("/admin") },
        { id: 2, nome: "Meu Perfil", onClick: () => navigate("/perfil") },
        {
            id: 3, nome: "Sair", onClick: () => {
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    ]);

    const carregarDepartamentos = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login");
                return;
            }

            const { data } = await axios.get("https://prefeitura-mais-api-production.up.railway.app/departamentos");
            setDepartamentos(data);
        } catch (error) {
            console.error("Erro ao carregar departamentos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDepartamentos();
    }, [navigate]);

    const handleExcluir = async (id) => {
        if (!window.confirm("Tem certeza que deseja excluir este departamento?")) {
            return;
        }

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://prefeitura-mais-api-production.up.railway.app/departamentos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Departamento excluído com sucesso!");
            setDepartamentos(departamentos.filter(d => d.id !== id));
        } catch (error) {
            console.error("Erro ao excluir departamento", error);
            alert("Erro ao excluir departamento. Ele pode ter funcionários ou denúncias vinculadas.");
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-blue-600 font-semibold">Carregando Dashboard...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <SideBar pathsSidebar={pathsSidebar} />

            <div className="max-w-7xl mx-auto pl-0 md:pl-16">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors inline-flex items-center justify-center bg-transparent border-none shadow-none hover:shadow-none hover:-translate-y-0"
                    title="Voltar"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Dashboard Admin</h1>
                        <p className="text-gray-500 mt-1">Gerencie os departamentos da plataforma.</p>
                    </div>
                    <button
                        onClick={() => navigate("/admin/criar-departamento")}
                        className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all duration-200 whitespace-nowrap"
                    >
                        + Novo Departamento
                    </button>
                </header>

                <div className="grid grid-cols-1 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                            <Building2 size={28} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total de Departamentos</p>
                            <h3 className="text-2xl font-bold text-gray-800">{departamentos.length}</h3>
                        </div>
                    </div>
                </div>

                <main className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">Lista de Departamentos</h2>
                        </div>
                        <div className="flex w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Buscar departamento..."
                                className="w-full md:w-64 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                                value={filtroBusca}
                                onChange={(e) => setFiltroBusca(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-gray-600 text-sm">
                                    <th className="p-4 font-semibold border-b">ID</th>
                                    <th className="p-4 font-semibold border-b">Nome</th>
                                    <th className="p-4 font-semibold border-b">Endereço</th>
                                    <th className="p-4 font-semibold border-b">Horário</th>
                                    <th className="p-4 font-semibold border-b text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departamentos
                                    .filter(d => d.nome.toLowerCase().includes(filtroBusca.toLowerCase()))
                                    .length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-500">Nenhum departamento encontrado.</td>
                                    </tr>
                                ) : (
                                    departamentos
                                        .filter(d => d.nome.toLowerCase().includes(filtroBusca.toLowerCase()))
                                        .map(dep => (
                                            <tr key={dep.id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                                                <td className="p-4 text-sm text-gray-600">#{dep.id}</td>
                                                <td className="p-4 font-semibold text-gray-800">{dep.nome}</td>
                                                <td className="p-4 text-sm text-gray-600 truncate max-w-xs" title={dep.endereco}>
                                                    {dep.endereco}
                                                </td>
                                                <td className="p-4 text-sm text-gray-600">
                                                    {dep.horario_funcionamento}
                                                </td>
                                                <td className="p-4 flex gap-2 justify-center">
                                                    <button
                                                        onClick={() => navigate(`/admin/editar-departamento/${dep.id}`)}
                                                        className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold rounded transition-colors"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleExcluir(dep.id)}
                                                        className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded transition-colors"
                                                    >
                                                        Excluir
                                                    </button>
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
