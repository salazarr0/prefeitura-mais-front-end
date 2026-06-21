import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import SideBar from "../components/SideBar"


function PostarDenunciaPage() {

    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [endereco_denuncia, setEndereco_denuncia] = useState("");
    const [tipo_denuncia_id, setTipo_denuncia_id] = useState(0);
    const [tipo_denuncia, setTipo_denuncia] = useState([]);
    const [menssagem, setMenssagem] = useState("");

    const pathsSidebar = [
        { id: 1, nome: "home", onClick: () => navigate("/") },
        { id: 2, nome: "postar denúncia", onClick: () => navigate("/postar-denuncia") }
    ];

    useEffect(() => {

        const carregarTipo_denuncia = async () => {
            try {

                const { data } = await axios.get(
                    "https://prefeitura-mais-api-production.up.railway.app/tipo-denuncia"
                );

                setTipo_denuncia(data);

            } catch (error) {
                console.log(error);
            }
        };

        carregarTipo_denuncia();
    }, []);

    const handlePostDenuncia = async (e) => {
        e.preventDefault();
        setMenssagem("")

        try {

            const token = localStorage.getItem("token");
            const dadosDaDenuncia = {
                titulo: titulo,
                descricao: descricao,
                endereco_denuncia: endereco_denuncia,
                tipo_denuncia_id: tipo_denuncia_id
            }
            const resposta = await axios.post(
                "https://prefeitura-mais-api-production.up.railway.app/denuncias",
                dadosDaDenuncia,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )

            console.log("Denuncia postada com sucesso")
            navigate("/")

        } catch (error) {
            if (error.response) {

                setMenssagem(error.response.data.menssagem || "Erro ao fazer login")

            } else {
                setMenssagem("Erro de conexão com o servidor")
            }
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">

                <SideBar pathsSidebar={pathsSidebar} />

                <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                    <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
                        Prefeitura Mais
                    </h1>

                    <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
                        Denuncie Aqui
                    </h2>

                    {menssagem && (
                        <div className="w-full mb-4 p-3 text-sm text-center text-red-700 bg-red-100 border border-red-300 rounded-lg">
                            {menssagem}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">

                        <input
                            type="titulo"
                            placeholder="Título"
                            value={titulo}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            onChange={(e) => setTitulo(e.target.value)}
                        />

                        <input
                            type="descricao"
                            placeholder="Descrição"
                            value={descricao}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            onChange={(e) => setDescricao(e.target.value)}
                        />

                        <input
                            type="endereco_denuncia"
                            placeholder="Endereço"
                            value={endereco_denuncia}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            onChange={(e) => setEndereco_denuncia(e.target.value)}
                        />

                        <select
                            onChange={(e) => setTipo_denuncia_id(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 cursor-pointer"
                        >
                            <option>Tipo da denuncia</option>

                            {tipo_denuncia.map((tipoDenuncia) => (
                                <option
                                    key={tipoDenuncia.id}
                                    value={tipoDenuncia.id}
                                >
                                    {tipoDenuncia.nome}
                                </option>
                            ))}
                        </select>

                        <button
                            onClick={handlePostDenuncia}
                            className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            Denunciar
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default PostarDenunciaPage