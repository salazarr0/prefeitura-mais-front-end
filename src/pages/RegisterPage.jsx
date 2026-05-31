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
            <div className="flex flex-col items-center justify-center h-screen ">
                <button onClick={backButton} className="border-2 border-gray-300">Voltar</button>
                <button onClick={loginButton} className="border-2 border-gray-300">Login</button>
                <h1>Registrar</h1>

                <input type="text"
                    placeholder="nome"
                    value={nome}
                    className="border-2 border-gray-300"
                    onChange={(e) => setNome(e.target.value)}
                />

                <input type="email"
                    placeholder="email"
                    className="border-2 border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    placeholder="senha"
                    value={senha}
                    className="border-2 border-gray-300"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button onClick={handleRegister} className="border-2 border-gray-300 rounded-md cursor-pointer">Confirmar Registro</button>


            </div>
        </>
    )
}

export default RegisterPage