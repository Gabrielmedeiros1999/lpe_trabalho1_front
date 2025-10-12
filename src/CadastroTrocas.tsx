import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useClienteStore } from "./context/ClienteContext"
import { useForm } from "react-hook-form"
import type { PlataformaType } from "./utils/PlataformaType"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  plataformaId: number
  ano: number
  foto: string
  tipo: string
  clienteId: string  
  descricao: string
}

export default function CadastroTroca() {
  const navigate = useNavigate()
  const [plataformas, setPlataformas] = useState<PlataformaType[]>([])
  const { cliente } = useClienteStore()

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

    const novoTroca: Inputs = {
      nome: data.nome,
      plataformaId: Number(data.plataformaId),
      ano: Number(data.ano),
      foto: data.foto,
      tipo: data.tipo,
      clienteId: cliente.id,
      descricao: data.descricao
    }



  const response = await fetch(`${apiUrl}/produtos`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json"
    },
    body: JSON.stringify(novoTroca)
  })

  if (response.status == 201) {
    toast.success("Produto cadastrado com sucesso!")
    reset()
    navigate("/")
  } else {
    toast.error("Erro ao cadastrar produto")
  }
}


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Cadastrar Produto</h1>
      <form onSubmit={handleSubmit(incluirProduto)} className="space-y-4">
        <input type="text"  id="nome" placeholder="Nome" 
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" required
          {...register("nome")}
        />
        <textarea placeholder="Descrição" id="descricao" 
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" required
          {...register("descricao")}
        />
        <input type="number" placeholder="Ano" id="ano"
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" required
           {...register("ano")}
        />
        <input type="text" placeholder="URL da Foto" id="foto" 
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" required
           {...register("foto")}
        />
        <select id="plataformaId"
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" required
          {...register("plataformaId")}
          >
         {optionsPlataforma}
        </select>
        <select id="tipo"
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" required
          {...register("tipo")}
          >
          <option>Jogo</option>
          <option>Console</option>
          <option>Acessório</option>
          <option>Decoração</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </div>
  )
}
