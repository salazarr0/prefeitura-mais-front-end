import axios from "axios"
import { useState, useEffect } from "react"
import CardDenuncia from "../components/cardDenuncia"
import { useNavigate } from "react-router"


export default function PerfilPage() {
    const [nome, setnome] = useState("")
    const [email, setEmail] = useState("")
    const [papel, setPapel] = useState("")
    const [denuncias, setDenuncias] = useState([])
    const navigate = useNavigate();

    const perfil = async () => {
        try {
            const token = localStorage.getItem("token")
            const { data } = await axios.get('https://prefeitura-mais-api-production.up.railway.app/usuarios/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log(data)
            setnome(data.nome || "")
            setEmail(data.email || "")
            setPapel(data.papel || "")
            setDenuncias(data.denuncias || [])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        perfil();
    }, []);

    if (email === "admin@prefeitura.gov.br") {
        return (
            <div>
                <h1>Nome: {nome} <img src="https://cdn-icons-png.flaticon.com/128/7542/7542190.png" className="w-8 h-8"></img></h1>
                <h1>Email: {email}</h1>
                <h1>Papel: {papel}</h1>

                <h3>Minhas Denuncias</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {denuncias.map((denuncia) => (
                        <CardDenuncia
                            key={denuncia.id}
                            titulo={denuncia.titulo}
                            descricao={denuncia.descricao}
                            status={denuncia.status}
                            endereco={denuncia.endereco}
                            tipo_denuncia={denuncia.tipo}
                        />

                    ))}

                </div>
            </div>
        )
    }

    const backButton = () => {
        navigate("/")
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <button onClick={backButton}>Voltar</button>
                <div>
                    <h1>Nome: {nome}</h1>
                    <h1>Email: {email}</h1>
                    <h1>Papel: {papel}</h1>

                    <h3>Minhas Denuncias</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {denuncias.map((denuncia) => (
                            <CardDenuncia
                                key={denuncia.id}
                                titulo={denuncia.titulo}
                                descricao={denuncia.descricao}
                                status={denuncia.status}
                                endereco={denuncia.endereco}
                                tipo_denuncia={denuncia.tipo}
                            />

                        ))}

                    </div>
                </div>
            </div>
        </div>
    )
}
