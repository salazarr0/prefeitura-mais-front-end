import axios from "axios"
import { useEffect, useState } from "react"
import CardDenuncia from "./cardDenuncia"

function Denuncias() {

    const [denuncias, setDenuncias] = useState([])

    useEffect(() => {

        const pegarDenuncias = async () => {
            try {
                const resposta = await axios.get("https://prefeitura-mais-api-production.up.railway.app/denuncias")
                setDenuncias(resposta.data)
                console.log(resposta.data)
            } catch (error) {
                console.log(error)
            }
        }

        pegarDenuncias();
    }, [])


    return (
        <>

            <h1>Denuncias</h1>

            {denuncias.map((denuncia) => (
                <CardDenuncia key={denuncia.id} denuncia={denuncia.titulo}
                    descricao={denuncia.descricao}
                    endereco_denuncia={denuncia.endereco_denuncia}
                />
            ))}
        </>
    )

}

export default Denuncias
