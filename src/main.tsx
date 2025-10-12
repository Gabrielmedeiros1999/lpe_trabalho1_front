import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasPropostas from './MinhasPropostas.tsx'
import Perfil from './Perfil.tsx'
import CadastroTrocas from './CadastroTrocas.tsx'
import CadCliente from './CadCliente.tsx'
import TrocasProdutos from './TrocasProdutos.tsx'


// ----------------- Rotas de Admin
import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';            
import AdminDashboard from './admin/AdminDashboard.tsx';    
import AdminProdutos from './admin/AdminProdutos.tsx';          
import AdminNovoProduto from './admin/AdminNovoProduto.tsx';          
import AdminPropostas from './admin/AdminPropostas.tsx';   
import AdminCadAdmin from './admin/AdminCadAdmin.tsx';   
import AdminNovoAdmin from './admin/AdminNovoAdmin.tsx';
import AdminClientes from './admin/AdminClientes.tsx';

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },     // rota /admin
      { path: "produtos", element: <AdminProdutos /> },     // rota /admin/carros
      { path: "produtos/novo", element: <AdminNovoProduto /> },  // ...
      { path: "propostas", element: <AdminPropostas /> },  // ...
      { path: "cadAdmin", element: <AdminCadAdmin /> },
      { path: "cadAdmin/novo", element: <AdminNovoAdmin /> },
      { path: "/admin/clientes", element: <AdminClientes /> },
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:produtoId', element: <Detalhes /> },
      { path: 'minhasPropostas', element: <MinhasPropostas /> },
      { path: 'perfil', element: <Perfil /> },
      { path: 'cadCliente', element: <CadCliente /> },
      { path: 'cadastrarTrocas', element: <CadastroTrocas /> },
      { path: 'trocasProdutos', element: <TrocasProdutos /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)