import CardDenuncia from "./cardDenuncia";

function Denuncias({ denuncias }) {

    if (!denuncias.length) {
        return (
            <p className="text-gray-500">
                Nenhuma denúncia encontrada.
            </p>
        );
    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {denuncias.map((denuncia) => (



                <CardDenuncia
                    key={denuncia.id}
                    titulo={denuncia.titulo}
                    descricao={denuncia.descricao}
                    status={denuncia.status}
                    endereco={denuncia.endereco}
                    usuario={denuncia.usuario?.nome || "Anônimo"}
                    tipo_denuncia={denuncia.tipo}
                />

            ))}

        </div>


    );
}

export default Denuncias;