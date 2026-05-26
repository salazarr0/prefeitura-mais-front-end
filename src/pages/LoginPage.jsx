import axios from "axios"
import React, { useState } from "react"

function LoginPage() {

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
            <div>
                <h1>login</h1>

                <input type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    placeholder="senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </>
    )
}

export default LoginPage