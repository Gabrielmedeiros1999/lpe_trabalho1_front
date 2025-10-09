import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

type graficoPlataformaType = {
  plataforma: string
  num: number
}

type graficoClienteType = {
  cidade: string
  num: number
}

type geralDadosType = {
  clientes: number
  produtos: number
  propostas: number
}

export default function AdminDashboard() {
  const [produtosPlataforma, setProdutosPlataforma] = useState<graficoPlataformaType[]>([])
  const [clientesCidade, setClientesCidade] = useState<graficoClienteType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoPlataforma() {
      const response = await fetch(`${apiUrl}/dashboard/produtosPlataforma`)
      const dados = await response.json()
      setProdutosPlataforma(dados)
    }
    getDadosGraficoPlataforma()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/clientesCidade`)
      const dados = await response.json()
      setClientesCidade(dados)
    }
    getDadosGraficoCliente()

  }, [])

  const listaProdutosPlataforma = produtosPlataforma.map(item => (
    { x: item.plataforma, y: item.num }
  ))

  const listaClientesCidade = clientesCidade.map(item => (
    { x: item.cidade, y: item.num }
  ))

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-red-900 dark:text-red-300">
            {dados.produtos}</span>
          <p className="font-bold mt-2 text-center">Nº Produtos</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-5 rounded dark:bg-green-900 dark:text-green-300">
            {dados.propostas}</span>
          <p className="font-bold mt-2 text-center">Nº Propostas</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaProdutosPlataforma}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Produtos", "por Plataforma"]}
          />
        </svg>

        <svg viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={400}
            height={400}
            data={listaClientesCidade}
            innerRadius={50}
            labelRadius={80}
            theme={VictoryTheme.clean}
            style={{
              labels: {
                fontSize: 10,
                fill: "#fff",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#f00",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={200}
            y={200}
            text={["Clientes", "por Cidade"]}
          />
        </svg>

      </div>
    </div>
  )
}