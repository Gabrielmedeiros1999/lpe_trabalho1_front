import { useEffect, useState } from "react"
import ItemProdutoCliente from "./components/ItemProdutoCliente"
import type { ProdutoType } from "./utils/ProdutoType"
import { useClienteStore } from "./context/ClienteContext" 

const apiUrl = import.meta.env.VITE_API_URL

export default function TrocasProdutos() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
  const { cliente } = useClienteStore() 

  useEffect(() => {
    async function getProdutos() {
      if (!cliente?.id) return

      try {
        const res = await fetch(`${apiUrl}/produtos?clienteId=${cliente.id}`)
        const data = await res.json()
        setProdutos(data)
      } catch (error) {
        console.error("Erro ao carregar produtos:", error)
      }
    }

    getProdutos()
  }, [cliente])

  return (
    <div className="m-4 mt-24">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Meus Produtos
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Foto</th>
              <th scope="col" className="px-6 py-3">Nome do Produto</th>
              <th scope="col" className="px-6 py-3">Plataforma</th>
              <th scope="col" className="px-6 py-3">Ano</th>
              <th scope="col" className="px-6 py-3">Preço R$</th>
              <th scope="col" className="px-6 py-3 text-center">Ações</th>
            </tr>
          </thead>

          <tbody>
            {produtos.map((produto) => (
              <ItemProdutoCliente
                key={produto.id}
                produto={produto}
                produtos={produtos}
                setProdutos={setProdutos}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
