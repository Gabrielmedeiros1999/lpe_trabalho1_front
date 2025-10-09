import { useClienteStore } from "./context/ClienteContext"

export default function Perfil() {
  const { cliente } = useClienteStore()

  if (!cliente?.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-white">Você precisa estar logado para ver o perfil.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Meu Perfil</h1>
      <div className="mb-4">
        <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-200">
          Nome
        </label>
        <input type="text" id="nome" value={cliente.nome} disabled className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"/>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
          Email
        </label>
        <input type="email" id="email" value={cliente.email} disabled className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"/>
      </div>
      <div className="mb-4">
        <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-200">
          Cidade
        </label>
        <input type="text" id="cidade" value={cliente.cidade} disabled className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"/>
      </div>
    </div>
  )
}
