function CardDenuncia({ titulo, descricao, endereco, status, usuario }) {

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 h-full flex flex-col">

            <div className="flex justify-between items-start mb-3">
                <h2 className="font-bold text-lg text-gray-800">{titulo}</h2>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">{status}</span>
            </div>
            <p className="text-gray-600 text-sm flex-grow">{descricao}</p>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <p className="text-sm text-gray-500">Denucia feita por: {usuario ? usuario : 'Anônimo'}</p>
                <p className="text-sm text-gray-500">{endereco}</p>
            </div>
        </div>
    )

}

export default CardDenuncia 