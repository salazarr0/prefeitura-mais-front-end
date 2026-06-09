import { useState } from "react"

function CardDenuncia({ titulo, descricao, endereco, status, usuario, tipo_denuncia, votosIniciais = 0 }) {

    const [contador, setContador] = useState(votosIniciais)
    const [confirmado, setConfirmado] = useState(false)

    const handleConfirmar = () => {
        if (confirmado) {
            setContador(contador - 1)
            setConfirmado(false)
        } else {
            setContador(contador + 1)
            setConfirmado(true)
        }
    }


    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 p-5 h-full flex flex-col">

            <div className="flex justify-between items-start mb-3">
                <h2 className="font-bold text-lg text-gray-800">{titulo}</h2>
                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700">{status}</span>
            </div>
            <p className="text-gray-600 text-sm flex-grow">{descricao}</p>

            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                <p className="text-sm text-gray-500">Denucia feita por: {usuario ? usuario : 'Anônimo'}</p>
                <p className="text-sm text-gray-500">Categoria: {tipo_denuncia}</p>
                <p className="text-sm text-gray-500">{endereco}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <button
                        onClick={handleConfirmar}
                        className={`px-4 py-2 rounded-lg transition-colors cursor-pointer font-medium text-sm border ${confirmado
                            ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100'
                            : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
                            }`}
                    >
                        {confirmado ? 'Confirmado ✓' : 'Confirmar Problema'}
                    </button>
                <span className="text-sm font-semibold text-gray-600 bg-gray-50 px-3 py-1 rounded-full border border-gray-150">
                    {contador} {contador === 1 ? 'apoio' : 'apoios'}
                </span>

            </div>


        </div>
    )

}

export default CardDenuncia