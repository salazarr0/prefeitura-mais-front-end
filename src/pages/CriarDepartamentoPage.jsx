import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Clock, Calendar, UserCircle, UserPlus, ArrowLeft } from "lucide-react"


export default function CriarDepartamentoPage() {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [mensagem, setMenssagem] = useState();
    const [erroCampo, setErroCampo] = useState({});
    const [gerente_id, setGerente_id] = useState(0);
    const [usuarios, setUsuarios] = useState([]);
    const [departamentos, setDepartamentos] = useState([]);

    const [horario_funcionamentoInicio, setHorario_funcionamentoInicio] = useState("");
    const [horario_funcionamentoTermino, setHorario_funcionamentoTermino] = useState("");
    const [diaInicio, setDiaInicio] = useState("")
    const [diaTermino, setDiaTermino] = useState("")

    const [exibirFormGerente, setExibirFormGerente] = useState(false);
    const [novoGerenteNome, setNovoGerenteNome] = useState("");
    const [novoGerenteEmail, setNovoGerenteEmail] = useState("");
    const [novoGerenteSenha, setNovoGerenteSenha] = useState("");
    const [novoGerenteMensagem, setNovoGerenteMensagem] = useState("");
    const [novoGerenteLoading, setNovoGerenteLoading] = useState(false);

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const token = localStorage.getItem("token");
                const resUsuarios = await axios.get(
                    "https://prefeitura-mais-api-production.up.railway.app/usuarios", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setUsuarios(resUsuarios.data);

                const resDepartamentos = await axios.get(
                    "https://prefeitura-mais-api-production.up.railway.app/departamentos", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setDepartamentos(resDepartamentos.data);
            } catch (error) {
                console.log(error);
            }
        };

        carregarDados();
    },[]);

    const diasSem = [{ id: 1, dia: "Seg" }, { id: 2, dia: "Ter" }, { id: 3, dia: "Qua" }, { id: 4, dia: "Qui" }, { id: 5, dia: "Sex" }, { id: 6, dia: "Sáb" }, { id: 7, dia: "Dom" }];

    const validarFormulario = () => {
        let erros = {}

        if (!nome || nome.trim().length < 3) {
            erros.nome = "O nome deve ter no mínimo 3 caracteres.";
        }

        if (!endereco) {
            erros.endereco = "O endereço não pode estar vazio.";
        }
        if (endereco.trim().length < 5) {
            erros.endereco = "O endereço é muito curto.";
        }
        if (!gerente_id) {
            erros.gerente_id = "Selecione um gerente.";
        }

        if (horario_funcionamentoInicio > horario_funcionamentoTermino) {
            erros.horario_funcionamento = "O horário de início deve ser menor que o horário de término.";
        }

        setErroCampo(erros);

        return Object.keys(erros).length === 0;
    }

    const handleCriarDepartamento = async (e) => {
        e.preventDefault();
        setMenssagem("")

        if (!validarFormulario()) {
            return;
        }

        try {
            const horario = `${diaInicio} - ${diaTermino} ${horario_funcionamentoInicio}h-${horario_funcionamentoTermino}h`
            const token = localStorage.getItem("token");
            const dadosDoDepartamento = {
                nome: nome,
                horario_funcionamento: horario,
                endereco: endereco,
                gerente_id: gerente_id
            }
            const resposta = await axios.post("https://prefeitura-mais-api-production.up.railway.app/departamentos", dadosDoDepartamento, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })


            console.log("Denuncia postada com sucesso")
            navigate("/admin")

        } catch (error) {
            if (error.response) {
                const errData = error.response.data;
                const errMsg = typeof errData === 'string' ? errData : (errData.message || errData.erro || errData.error || "Erro de validação");
                setMenssagem(errMsg);
            } else {
                setMenssagem("Erro de conexão com o servidor")
            }
        }
    }

    const handleCriarNovoGerente = async (e) => {
        e.preventDefault();
        setNovoGerenteMensagem("");
        
        if (!novoGerenteNome || !novoGerenteEmail || !novoGerenteSenha) {
            setNovoGerenteMensagem("Preencha todos os campos do gerente.");
            return;
        }

        setNovoGerenteLoading(true);
        try {
            const resPost = await axios.post("https://prefeitura-mais-api-production.up.railway.app/usuarios", {
                nome: novoGerenteNome,
                email: novoGerenteEmail,
                senha: novoGerenteSenha,
                papel: "funcionario"
            });
            
            const token = localStorage.getItem("token");
            const { data } = await axios.get(
                "https://prefeitura-mais-api-production.up.railway.app/usuarios", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUsuarios(data);
            
            const novoUser = data.find(u => u.email === novoGerenteEmail);

            if (novoUser) {
                setGerente_id(novoUser.id);
            }
            
            setExibirFormGerente(false);
            setNovoGerenteNome("");
            setNovoGerenteEmail("");
            setNovoGerenteSenha("");
        } catch (error) {
            if (error.response) {
                const errData = error.response.data;
                const errMsg = typeof errData === 'string' ? errData : (errData.message || errData.erro || errData.error || "Erro ao criar gerente");
                setNovoGerenteMensagem(errMsg);
            } else {
                setNovoGerenteMensagem("Erro de conexão");
            }
        } finally {
            setNovoGerenteLoading(false);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">

                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center justify-center bg-transparent border-none shadow-none hover:shadow-none hover:-translate-y-0"
                        title="Voltar"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
                        Prefeitura Mais
                    </h1>

                    <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
                        Criar departamento
                    </h2>

                    <div className="flex flex-col gap-4">

                        <div>
                            <input
                                type="nome"
                                placeholder="Nome"
                                value={nome}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                onChange={(e) => setNome(e.target.value)}
                            />
                            {erroCampo.nome && <p className="text-red-500 text-sm mt-1">{erroCampo.nome}</p>}
                                          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-blue-500" />
                                Horário de Atendimento
                            </h3>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4" /> Dias da Semana
                                    </label>
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 border border-gray-100 rounded-xl">
                                        <select
                                            onChange={(e) => setDiaInicio(e.target.value)}
                                            className="flex-1 min-w-0 px-3 py-2 border-none bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                        >
                                            <option value="">De</option>
                                            {diasSem.map((dia) => (
                                                <option key={dia.id} value={dia.dia}>{dia.dia}</option>
                                            ))}
                                        </select>

                                        <span className="text-gray-400 font-semibold text-sm px-1">até</span>

                                        <select
                                            onChange={(e) => setDiaTermino(e.target.value)}
                                            className="flex-1 min-w-0 px-3 py-2 border-none bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                        >
                                            <option value="">Às</option>
                                            {diasSem.map((dia) => (
                                                <option key={dia.id} value={dia.dia}>{dia.dia}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                        <Clock className="w-4 h-4" /> Horário Diário
                                    </label>
                                    <div className="flex items-center gap-2 bg-gray-50 p-2 border border-gray-100 rounded-xl">
                                        <input
                                            type="time"
                                            min="08:00"
                                            max="17:00"
                                            className="flex-1 min-w-0 px-3 py-2 border-none bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                            onChange={(e) => setHorario_funcionamentoInicio(e.target.value)}
                                        />

                                        <span className="text-gray-400 font-semibold text-sm px-1">às</span>

                                        <input
                                            type="time"
                                            min="08:00"
                                            max="18:00"
                                            className="flex-1 min-w-0 px-3 py-2 border-none bg-white rounded-lg shadow-sm text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                            onChange={(e) => setHorario_funcionamentoTermino(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {erroCampo.horario_funcionamento && <p className="text-red-500 text-sm mt-3 text-center bg-red-50 py-1.5 rounded-md">{erroCampo.horario_funcionamento}</p>}
                        </div>            </div>

                        <div>
                            <input
                                type="endereco"
                                placeholder="Endereço"
                                value={endereco}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                onChange={(e) => setEndereco(e.target.value)}
                            />
                            {erroCampo.endereco && <p className="text-red-500 text-sm mt-1">{erroCampo.endereco}</p>}
                        </div>

                        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                            <h3 className="text-sm font-bold text-gray-800 mb-5 flex items-center gap-2">
                                <UserCircle className="w-5 h-5 text-blue-500" />
                                Gerência do Departamento
                            </h3>

                            <div className="space-y-5">
            
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
                                        Vincular Gerente Existente
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={gerente_id}
                                            onChange={(e) => setGerente_id(Number(e.target.value))}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all cursor-pointer appearance-none text-gray-700"
                                        >
                                            <option value="">Selecione um funcionário disponível...</option>
                                            {usuarios.map((usuario) => {
                                                const isVinculado = departamentos.some(dep => dep.gerente_id === usuario.id);
                                                if (usuario.papel === 'funcionario' && !isVinculado) {
                                                    return <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>;
                                                }
                                                return null;
                                            })}
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                        </div>
                                    </div>
                                    {erroCampo.gerente_id && <p className="text-red-500 text-sm mt-1">{erroCampo.gerente_id}</p>}
                                </div>

                                <div className="flex items-center">
                                    <div className="flex-1 border-t border-gray-200"></div>
                                    <span className="px-3 text-xs font-bold text-gray-400 uppercase tracking-widest">Ou</span>
                                    <div className="flex-1 border-t border-gray-200"></div>
                                </div>

                                <div className="bg-blue-50/30 border border-blue-100 rounded-xl p-4">
                                    <button
                                        type="button"
                                        onClick={() => setExibirFormGerente(!exibirFormGerente)}
                                        className="w-full flex items-center justify-center gap-2 text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors"
                                    >
                                        {exibirFormGerente ? (
                                            "Cancelar criação"
                                        ) : (
                                            <>
                                                <UserPlus className="w-4 h-4" />
                                                Cadastrar Novo Gerente
                                            </>
                                        )}
                                    </button>

                                    {exibirFormGerente && (
                                        <div className="mt-4 flex flex-col gap-3 pt-4 border-t border-blue-100">
                                            <input
                                                type="text"
                                                placeholder="Nome completo"
                                                value={novoGerenteNome}
                                                onChange={(e) => setNovoGerenteNome(e.target.value)}
                                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm"
                                            />
                                            <input
                                                type="email"
                                                placeholder="E-mail profissional"
                                                value={novoGerenteEmail}
                                                onChange={(e) => setNovoGerenteEmail(e.target.value)}
                                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm"
                                            />
                                            <input
                                                type="password"
                                                placeholder="Senha provisória"
                                                value={novoGerenteSenha}
                                                onChange={(e) => setNovoGerenteSenha(e.target.value)}
                                                className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white shadow-sm"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCriarNovoGerente}
                                                disabled={novoGerenteLoading}
                                                className="w-full py-2.5 mt-2 text-white text-sm font-bold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex justify-center items-center gap-2 shadow-md"
                                            >
                                                {novoGerenteLoading ? (
                                                    "Criando..."
                                                ) : (
                                                    <>
                                                        <UserPlus className="w-4 h-4" />
                                                        Salvar Novo Gerente
                                                    </>
                                                )}
                                            </button>
                                            {novoGerenteMensagem && (
                                                <p className="text-red-500 text-sm mt-1 text-center bg-red-50 py-1.5 rounded-md">{novoGerenteMensagem}</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCriarDepartamento}
                            className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            Criar Departamento
                        </button>

                        {mensagem && (
                            <div className="w-full p-3 text-sm text-center text-red-700 bg-red-100 border border-red-300 rounded-lg">
                                {mensagem}
                            </div>
                        )}

                    </div>

                </div>

            </div>
        </>
    )
}