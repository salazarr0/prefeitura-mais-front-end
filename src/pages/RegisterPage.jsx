import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";


function RegisterPage() {

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const backButton = () => {

        navigate('/');
    }

    const loginButton = () => {

        navigate('/login');
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        setMensagem("")

        try {
            const reposta = await axios.post("https://prefeitura-mais-api-production.up.railway.app/usuarios/", {
                nome: nome,
                email: email,
                senha: senha
            })
            console.log("Registro efetuado com sucesso")
            navigate("/")

        } catch (error) {
            if (error.response) {
                setMensagem(error.response.data.mensagem || "Erro ao fazer registro")
            } else {
                setMensagem("Erro de conexão com o servidor")
            }
        }
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">

                    <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
                        Prefeitura Mais
                    </h1>

                    <div className="flex gap-3 mb-4">

                        <button
                            onClick={backButton}
                            className="flex-1 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                            Voltar
                        </button>

                        <button
                            onClick={loginButton}
                            className="flex-1 py-2 text-sm font-semibold text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                            Login
                        </button>

                    </div>

                    <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
                        Registrar
                    </h2>

                    {mensagem && (
                        <div className="w-full mb-4 p-3 text-sm text-center text-red-700 bg-red-100 border border-red-300 rounded-lg">
                            {mensagem}
                        </div>
                    )}

                    <div className="flex flex-col gap-4">

                        <input
                            type="text"
                            placeholder="Nome"
                            value={nome}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            value={email}
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
                            onClick={handleRegister}
                            className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                            Confirmar Registro
                        </button>

                    </div>

                </div>

            </div>
        </>
    )
}

export default RegisterPage