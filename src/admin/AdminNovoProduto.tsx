import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { PlataformaType } from "../utils/PlataformaType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  plataformaId: number
  ano: number
  preco: number
  foto: string
  tipo: string
  adminId: string  
  descricao: string
}

export default function AdminNovoProduto() {
  const [plataformas, setPlataformas] = useState<PlataformaType[]>([])
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getPlataformas() {
      const response = await fetch(`${apiUrl}/plataformas`)
      const dados = await response.json()
      setPlataformas(dados)
    }
    getPlataformas()
    setFocus("nome")
  }, [])

  const optionsPlataforma = plataformas.map(plataforma => (
    <option key={plataforma.id} value={plataforma.id}>{plataforma.nome}</option>
  ))

  async function incluirProduto(data: Inputs) {

    const novoProduto: Inputs = {
      nome: data.nome,
      plataformaId: Number(data.plataformaId),
      ano: Number(data.ano),
      foto: data.foto,
      preco: Number(data.preco),
      tipo: data.tipo,
      adminId: admin.id,
      descricao: data.descricao
    }

    const response = await fetch(`${apiUrl}/produtos`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify(novoProduto)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Produto cadastrado com sucesso")
      reset()
    } else {
     toast.error("Erro no cadastro do Produto...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Produtos
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirProduto)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome do Produto</label>
          <input type="text" id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("nome")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="plataformaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Plataforma</label>
            <select id="plataformaId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("plataformaId")}
            >
              {optionsPlataforma}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="ano" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Ano</label>
            <input type="number" id="ano"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("ano")}
            />
          </div>
        </div>
        <div className="grid gap-2 mb-3 md:grid-cols-1">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preço R$</label>
            <input type="number" id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("preco")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Descrição</label>
           <textarea id="descricao" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("descricao")}
           />
         </div>
         </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              URL da Foto</label>
            <input type="text" id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("foto")}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tipo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tipo</label>
            <select id="tipo"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("tipo")}
            >
              <option>Jogo</option>
              <option>Console</option>
              <option>Acessorio</option>
              <option>Decoracao</option>
            </select>
          </div>
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

