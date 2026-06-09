import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"


function PostarDenunciaPage() {

    const navigate = useNavigate();
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [endereco_denuncia, setEndereco_denuncia] = useState("");
    const [tipo_denuncia_id, setTipo_denuncia_id] = useState(0);
    const [tipo_denuncia, setTipo_denuncia] = useState([]);
    const [menssagem, setMenssagem] = useState("");

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
            const resposta = await axios.post("https://prefeitura-mais-api-production.up.railway.app/denuncias", dadosDaDenuncia, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })


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
            <div className="flex flex-col items-center justify-center h-screen">
                <h1>Denucie Aqui</h1>
                <button className="border-2 border-gray-300 rounded-md cursor-pointer" onClick={() => navigate("/")}>Home</button>
                <input type="titulo"
                    placeholder="titulo"
                    value={titulo}
                    className="border-2 border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <input type="descricao"
                    placeholder="descricao"
                    value={descricao}
                    className="border-2 border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => setDescricao(e.target.value)}
                />
                <input type="endereco_denuncia"
                    placeholder="Endereço"
                    value={endereco_denuncia}
                    className="border-2 border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => setEndereco_denuncia(e.target.value)}
                />
            
                <select
                    onChange={(e) => setTipo_denuncia_id(e.target.value)}
                >
                    <option>Tipo da denuncia</option>
                    {tipo_denuncia.map((tipoDenuncia) => (
                        <option key={tipoDenuncia.id} value={tipoDenuncia.id}>{tipoDenuncia.nome}</option>
                    ))}
                </select>
                <button onClick={handlePostDenuncia} className="border-2 border-green-300 rounded-md cursor-pointer">Denunciar</button>
            </div>
        </>
    )
}

export default PostarDenunciaPage