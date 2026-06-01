import { useState, useEffect } from "react";

export default function BarraDePesquisa({ denuncias, setResultado }) {

    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {

        const filtradas = denuncias.filter((denuncia) =>
            denuncia.titulo
                .toLowerCase()
                .includes(pesquisa.toLowerCase())
        );

        setResultado(filtradas);

    }, [pesquisa, denuncias]);

    return (
        <div className="relative w-full max-w-md">

            <input
                type="text"
                placeholder="Pesquisar"
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />

        </div>
    );
}