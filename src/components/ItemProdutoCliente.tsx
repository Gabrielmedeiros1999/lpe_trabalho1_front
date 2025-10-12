import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar, FaStar } from "react-icons/fa"
import type { ProdutoType } from "../utils/ProdutoType"
import { useClienteStore } from "../context/ClienteContext"

type listaProdutoProps = {
  produto: ProdutoType;
  produtos: ProdutoType[];
  setProdutos: React.Dispatch<React.SetStateAction<ProdutoType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemProdutoCliente({ produto, produtos, setProdutos }: listaProdutoProps) {
  const { cliente } = useClienteStore()

  async function excluirProduto() {
    if (!cliente) {
      alert("Você precisa estar logado");
      return;
    }

    if (confirm(`Confirma a exclusão do produto "${produto.nome}"?`)) {
      const response = await fetch(`${apiUrl}/produtos/${produto.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cliente.token}` // 👈 IMPORTANTE
        },
      })

      if (response.ok) {
        const produtosAtualizados = produtos.filter(x => x.id !== produto.id)
        setProdutos(produtosAtualizados)
        alert("Produto excluído com sucesso")
      } else {
        const erro = await response.text()
        alert(`Erro ao excluir produto: ${erro || response.status}`)
      }
    }
  }

  async function alterarDestaque() {
    if (!cliente) {
      alert("Você precisa estar logado");
      return;
    }

    const response = await fetch(`${apiUrl}/produtos/destacar/${produto.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cliente.token}` // 👈 IMPORTANTE
      },
    })

    if (response.ok) {
      const produtosAtualizados = produtos.map(x =>
        x.id === produto.id ? { ...x, destaque: !x.destaque } : x
      )
      setProdutos(produtosAtualizados)
    } else {
      const erro = await response.text()
      alert(`Erro ao alterar destaque: ${erro || response.status}`)
    }
  }

  return (
    <tr key={produto.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={produto.foto} alt={`Foto do ${produto.nome}`} style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 text-white ${produto.destaque ? "font-extrabold" : ""}`}>{produto.nome}</td>
      <td className="px-6 py-4 text-white">{produto.plataforma?.nome}</td>
      <td className="px-6 py-4 text-white">{produto.ano}</td>
      <td className="px-6 py-4 text-white">
        {produto.preco
          ? Number(produto.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })
          : "—"}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir"
          onClick={excluirProduto}
        />
        &nbsp;
        {produto.destaque ? (
          <FaStar
            className="text-3xl text-yellow-600 inline-block cursor-pointer"
            title="Remover destaque"
            onClick={alterarDestaque}
          />
        ) : (
          <FaRegStar
            className="text-3xl text-yellow-600 inline-block cursor-pointer"
            title="Destacar"
            onClick={alterarDestaque}
          />
        )}
      </td>
    </tr>
  )
}
