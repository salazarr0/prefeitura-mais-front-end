import { useState, useEffect } from "react";

export default function BarraDePesquisa({
    dados,
    setResultado,
    tipoPesquisa
}) {

    const [pesquisa, setPesquisa] = useState("");

    useEffect(() => {

        if (!dados) return;

        const filtrados = dados.filter((item) => {

            if (tipoPesquisa === "denuncias") {
                return item.titulo
                    ?.toLowerCase()
                    .includes(pesquisa.toLowerCase());
            }

            if (tipoPesquisa === "departamentos") {
                return item.nome
                    ?.toLowerCase()
                    .includes(pesquisa.toLowerCase());
            }

            return true;
        });

        setResultado(filtrados);

    }, [pesquisa, dados, tipoPesquisa, setResultado]);

    return (
        <div className="relative w-full max-w-md">

            <input
                type="text"
                placeholder={
                    tipoPesquisa === "denuncias"
                        ? "Pesquisar denúncia..."
                        : "Pesquisar departamento..."
                }
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />

        </div>
    );
}