import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router"

function LoginPage() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [menssagem, setMenssagem] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setMenssagem("")

        try {
            const resposta = await axios.post("https://prefeitura-mais-api-production.up.railway.app/usuarios/login", {
                email: email,
                senha: senha
            })

            localStorage.setItem("token", resposta.data.token)
            console.log("Login efetuado com sucesso")
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
                <h1>login</h1>
                <button className="border-2 border-gray-300 rounded-md cursor-pointer" onClick={() => navigate("/")}>Home</button>
                <input type="email"
                    placeholder="email"
                    value={email}
                    className="border-2 border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    placeholder="senha"
                    value={senha}
                    className="border-2 border-gray-300 rounded-md cursor-pointer"
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button onClick={handleLogin} className="border-2 border-green-300 rounded-md cursor-pointer">Login</button>
            </div>
        </>
    )
}

export default LoginPage