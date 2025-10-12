import { TiDeleteOutline } from "react-icons/ti"
import type { ClienteType } from "../../utils/ClienteType"

type ItemClienteProps = {
  cliente: ClienteType
  clientes: ClienteType[]
  setClientes: React.Dispatch<React.SetStateAction<ClienteType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCliente({ cliente, clientes, setClientes }: ItemClienteProps) {
  async function excluirCliente() {
    if (!confirm(`Deseja excluir o cliente ${cliente.nome}?`)) return

    try {
      const response = await fetch(`${apiUrl}/clientes/${cliente.id}`, {
        method: "DELETE",
         headers: {
            "Content-type": "application/json"
          },
      })

      if (response.status == 200) {
        const atualizados = clientes.filter(c => c.id !== cliente.id)
        setClientes(atualizados)
        alert("Cliente excluído com sucesso!")
      } else {
        alert("Erro ao excluir cliente.")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-6 py-4">{cliente.nome}</td>
      <td className="px-6 py-4">{cliente.email}</td>
      <td className="px-6 py-4">{cliente.cidade}</td>
      <td className="px-6 py-4 text-left ">
        <TiDeleteOutline
          className="text-3xl text-red-600 inline-block cursor-pointer"
          title="Excluir Cliente"
          onClick={excluirCliente}
        />
      </td>
    </tr>
  )
}
