import type {  PlataformaType } from "./PlataformaType"

export type ProdutoType = {
    id: number
    nome: string
    descricao: string
    ano: number
    preco: number
    destaque: boolean
    foto: string
    createdAt: Date
    updatedAt: Date
    tipo: string
    plataformaId: number
    plataforma: PlataformaType
}