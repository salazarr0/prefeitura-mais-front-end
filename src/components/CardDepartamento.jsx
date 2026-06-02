export default function CardDepartamento({ nome, horario_funcionamento, endereco}) {

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 h-full flex flex-col">

            <div className="flex justify-between items-start mb-3">
                <h2 className="font-bold text-lg text-gray-800">{nome}</h2>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <span className="text-sm text-gray-500">Horário de funcionamento: {horario_funcionamento}</span>
                <p className="text-sm text-gray-500">{endereco}</p>
            </div>
        </div>
    )

}