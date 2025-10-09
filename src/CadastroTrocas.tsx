import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

type Plataforma = {
  id: number
  nome: string
}

export default function CadastroProduto() {
  const navigate = useNavigate()
  const [plataformas, setPlataformas] = useState<Plataforma[]>([])

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    ano: "",
    foto: "",
    plataformaId: "",
    tipo: "Jogo"
  })

 

  useEffect(() => {
  
    async function fetchPlataformas() {
      try {
        const res = await fetch("http://localhost:3000/plataformas")
        const data = await res.json()
        setPlataformas(data)
      } catch (err) {
        console.error("Erro ao carregar plataformas", err)
      }
    }
    fetchPlataformas()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()

  if (!form.nome || !form.descricao || !form.foto || !form.plataformaId || !form.ano) {
    toast.error("Preencha todos os campos obrigatórios!")
    return
  }

  const apiUrl = import.meta.env.VITE_API_URL

  const data = {
    nome: form.nome,
    descricao: form.descricao,
    ano: Number(form.ano),
    foto: form.foto,
    tipo: form.tipo,
    plataformaId: Number(form.plataformaId),
  }

  console.log("Enviando produto:", data)

  const response = await fetch(`${apiUrl}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })

  if (response.ok) {
    toast.success("Produto cadastrado com sucesso!")
    navigate("/")
  } else {
    const erro = await response.text()
    console.error("Erro ao cadastrar produto:", erro)
    toast.error("Erro ao cadastrar produto")
  }
}


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-6">Cadastrar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nome" value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
        />
        <textarea placeholder="Descrição" value={form.descricao}
          onChange={e => setForm({ ...form, descricao: e.target.value })}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
        />
        <input type="number" placeholder="Ano" value={form.ano}
          onChange={e => setForm({ ...form, ano: e.target.value })}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
        />
        <input type="text" placeholder="URL da Foto" value={form.foto}
          onChange={e => setForm({ ...form, foto: e.target.value })}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
        />
        <select value={form.plataformaId} onChange={e => setForm({ ...form, plataformaId: e.target.value })}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white">
          <option value="">Selecione a Plataforma</option>
          {plataformas.map(p => (
            <option key={p.id} value={p.id}>
              {p.nome}
            </option>
          ))}
        </select>
        <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}
          className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white">
          <option value="Jogo">Jogo</option>
          <option value="Console">Console</option>
          <option value="Acessorio">Acessório</option>
          <option value="Decoracao">Decoração</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Salvar
        </button>
      </form>
    </div>
  )
}
