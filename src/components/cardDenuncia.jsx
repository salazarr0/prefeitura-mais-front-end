function CardDenuncia({titulo, descricao, endereco, status, usuario}){

    return (
        <div className="w-full p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col gap-2">
            <div className="flex flex-col text-lg font-bold text-gray-800">
                <span className="text-sm font-bold text-gray-800">{titulo}</span>
                <span className="text-sm text-gray-600">{descricao}</span>
                <span className="text-sm text-gray-600">{status}</span>
                <span className="text-sm text-gray-600">Denucia feita por: {usuario? usuario: 'Anônimo'}</span>
                <div className="mt-2 pt-2 border-t border-gray-100">
                    <span className="text-xs font-medium text-gray-800">{endereco}</span>
                </div>

            </div>
        </div>
    )

}

export default CardDenuncia 