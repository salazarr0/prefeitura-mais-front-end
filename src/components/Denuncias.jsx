import axios from "axios"
import { useEffect, useState } from "react"
import CardDenuncia from "./cardDenuncia"

function Denuncias() {

    const [denuncias, setDenuncias] = useState([])

    useEffect(() => {

        const pegarDenuncias = async () => {
            try {
                const { data } = await axios.get("https://prefeitura-mais-api-production.up.railway.app/denuncias")
                setDenuncias(data)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }

        pegarDenuncias();
    }, [])

    return (
        <>
            <ul>
                {denuncias.map(denuncia => (
                    <li key={denuncia.id}>
                        <CardDenuncia
                            denuncia={denuncia.titulo}
                            descricao={denuncia.descricao}
                            endereco_denuncia={denuncia.endereco_denuncia}
                        />
                    </li>
                ))}
            </ul>

        </>
    )

}

export default Denuncias
