import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";


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

                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative">
                    <button
                        onClick={backButton}
                        className="absolute top-6 left-6 p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors flex items-center justify-center bg-transparent border-none shadow-none hover:shadow-none hover:-translate-y-0"
                        title="Voltar"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>

                    <h1 className="text-3xl font-extrabold text-blue-700 text-center mb-6">
                        Prefeitura Mais
                    </h1>

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
                            className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer mb-4"
                        >
                            Confirmar Registro
                        </button>

                        <div className="flex justify-center border-t border-gray-100 pt-4">
                            <button
                                onClick={loginButton}
                                className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors bg-transparent border-none shadow-none hover:shadow-none hover:-translate-y-0 cursor-pointer"
                            >
                                Já tem uma conta? Faça Login
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

export default RegisterPage