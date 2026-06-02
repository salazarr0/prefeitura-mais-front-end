import CardDepartamento from "./CardDepartamento";

export default function Departamento({ departamentos }) {

    if (!departamentos.length) {
        return (
            <p className="text-gray-500">
                Nenhum departamento encontrado.
            </p>
        );
    }

    return (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {departamentos.map((departamento) => (

                <CardDepartamento
                    key={departamento.id}
                    nome={departamento.nome}
                    horario_funcionamento={departamento.horario_funcionamento}
                    endereco={departamento.endereco}
                />

            ))}

        </div>

    );
}
