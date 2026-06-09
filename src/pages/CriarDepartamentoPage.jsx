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
            <div className="flex flex-col items-center justify-center h-screen">
                <h1>Criar departamento</h1>
                <button className="border-2 border-gray-300 rounded-md cursor-pointer" onClick={() => navigate("/admin")}>Home</button>
                <input type="nome"
                    placeholder="nome"
                    value={nome}
                    className="border-2 border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => setNome(e.target.value)}
                />
                {erroCampo.nome && <p className="text-red-500 text-sm mt-1">{erroCampo.nome}</p>}

                <div className="flex">
                    <p>Das: </p>

                    <input
                        type="time"
                        min="08:00"
                        max="17:00"
                        className="border-2 border-gray-300 rounded-md cursor-pointer"
                        onChange={(e) => setHorario_funcionamentoInicio(e.target.value)}
                    />
                    <p> até as: </p>
                    <input
                        type="time"
                        min="08:00"
                        max="18:00"
                        className="border-2 border-gray-300 rounded-md cursor-pointer"
                        onChange={(e) => setHorario_funcionamentoTermino(e.target.value)}
                    />
                </div>
                {erroCampo.horario_funcionamento && <p className="text-red-500 text-sm mt-1">{erroCampo.horario_funcionamento}</p>}

                <div className="flex">
                    <p>De: </p>
                    <select
                        onChange={(e) => setDiaInicio(e.target.value)}
                    >
                        <option value="">Selecionar dia</option>
                        {diasSem.map((dia) => (
                            <option key={dia.id} value={dia.dia}>{dia.dia}</option>
                        ))}
                    </select>
                    <p> à: </p>
                    <select
                        onChange={(e) => setDiaTermino(e.target.value)}
                    >
                        <option value="">Selecionar dia</option>
                        {diasSem.map((dia) => (
                            <option key={dia.id} value={dia.dia}>{dia.dia}</option>
                        ))}
                    </select>
                </div>
                <input type="endereco"
                    placeholder="Endereço"
                    value={endereco}
                    className="border-2 border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => setEndereco(e.target.value)}
                />
                {erroCampo.endereco && <p className="text-red-500 text-sm mt-1">{erroCampo.endereco}</p>}


                <select
                    onChange={(e) => setGerente_id(Number(e.target.value))}
                >
                    <option value="">Selecionar gerente</option>
                    {usuarios.map((usuario) => (
                        usuario.papel == 'funcionario' && <option key={usuario.id} value={usuario.id}>{usuario.nome}</option>
                    ))}
                </select>
                {erroCampo.gerente_id && <p className="text-red-500 text-sm mt-1">{erroCampo.gerente_id}</p>}
                <button onClick={handleCriarDepartamento} className="border-2 border-green-300 rounded-md cursor-pointer">Criar Departamento</button>
                {mensagem && (
                    <div className="w-64 p-3 text-sm text-center text-red-700 bg-red-100 border border-red-400 rounded-md">
                        {mensagem}
                    </div>)}
            </div>
        </>
    )
}
