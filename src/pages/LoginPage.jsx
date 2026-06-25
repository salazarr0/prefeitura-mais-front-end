import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"
import { jwtDecode } from "jwt-decode";
import { ArrowLeft } from "lucide-react";



export default function LoginPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMensagem("")

        try {
            const resposta = await axios.post("https://prefeitura-mais-api-production.up.railway.app/usuarios/login", {
                email: email,
                senha: senha
            })

            localStorage.setItem("token", resposta.data)
            const token = localStorage.getItem("token")
            const userPayload = jwtDecode(token)
            console.log("Login efetuado com sucesso")
            const path = userPayload.papel == 'adm' ? '/admin' : '/'
            navigate(path)

        } catch (error) {
            if (error.response) {

                console.log(error.response.data)

                const mensagemBackend = error.response.data
                setMensagem(mensagemBackend)


            } else {
                setMensagem("Erro de conexão com o servidor")
            }
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                    <button
                        onClick={() => navigate(-1)}
                        className="absolute top-6 left-6 text-gray-400 hover:text-blue-600 transition-colors cursor-pointer"
                        title="Voltar"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
                        Prefeitura Mais
                    </h1>

                    {mensagem && (
                        <div className="w-full mb-4 p-3 text-sm text-center text-red-700 bg-red-100 border border-red-300 rounded-lg">
                            {mensagem}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button
                            onClick={handleLogin}
                            className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            Login
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}