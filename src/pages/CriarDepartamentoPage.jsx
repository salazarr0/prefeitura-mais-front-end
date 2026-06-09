import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"


export default function CriarDepartamentoPage() {

    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [mensagem, setMenssagem] = useState();
    const [erroCampo, setErroCampo] = useState({});
    const [gerente_id, setGerente_id] = useState(0);
    const [usuarios, setUsuarios] = useState([]);

    const [horario_funcionamentoInicio, setHorario_funcionamentoInicio] = useState("");
    const [horario_funcionamentoTermino, setHorario_funcionamentoTermino] = useState("");
    const [diaInicio, setDiaInicio] = useState("")
    const [diaTermino, setDiaTermino] = useState("")

    useEffect(() => {

        const carregarUsuarios = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get(
                    "https://prefeitura-mais-api-production.up.railway.app/usuarios", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setUsuarios(data)
            } catch (error) {
                console.log(error);
            }
        };

        carregarUsuarios();
    }, []);

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

                setMenssagem(error.response.data || "Erro ao fazer login")

            } else {
                setMenssagem("Erro de conexão com o servidor")
            }
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

                <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                    <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
                        Prefeitura Mais
                    </h1>

                    <button
                        className="w-full mb-4 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate("/admin")}
                    >
                        Home
                    </button>

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
                        </div>

                        <div>
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">

                                <p className="text-sm font-semibold text-gray-600">Das:</p>

                                <input
                                    type="time"
                                    min="08:00"
                                    max="17:00"
                                    className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                    onChange={(e) => setHorario_funcionamentoInicio(e.target.value)}
                                />

                                <p className="text-sm font-semibold text-gray-600">até as:</p>

                                <input
                                    type="time"
                                    min="08:00"
                                    max="18:00"
                                    className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                                    onChange={(e) => setHorario_funcionamentoTermino(e.target.value)}
                                />

                            </div>

                            {erroCampo.horario_funcionamento && <p className="text-red-500 text-sm mt-1">{erroCampo.horario_funcionamento}</p>}
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl p-4">

                            <p className="text-sm font-semibold text-gray-600">De:</p>

                            <select
                                onChange={(e) => setDiaInicio(e.target.value)}
                                className="w-full md:flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            >
                                <option value="">Selecionar dia</option>
                                {diasSem.map((dia) => (
                                    <option key={dia.id} value={dia.dia}>{dia.dia}</option>
                                ))}
                            </select>

                            <p className="text-sm font-semibold text-gray-600">à:</p>

                            <select
                                onChange={(e) => setDiaTermino(e.target.value)}
                                className="w-full md:flex-1 px-4 py-2 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            >
                                <option value="">Selecionar dia</option>
                                {diasSem.map((dia) => (
                                    <option key={dia.id} value={dia.dia}>{dia.dia}</option>
                                ))}
                            </select>

                        </div>

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

                        <div>
                            <select
                                onChange={(e) => setGerente_id(Number(e.target.value))}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                            >
                                <option value="">Selecionar gerente</option>
                                {usuarios.map((usuario) => (
                                    usuario.papel == 'funcionario' && <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                                ))}
                            </select>
                            {erroCampo.gerente_id && <p className="text-red-500 text-sm mt-1">{erroCampo.gerente_id}</p>}
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