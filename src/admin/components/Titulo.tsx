import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
import { useAdminStore } from "../context/AdminContext"

export function Titulo() {
  const { admin } = useAdminStore()

  return (
    <nav className="bg-zinc-400 border-zinc-200 dark:bg-zinc-900 flex flex-wrap justify-between fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link to="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./jogo.png" className="h-16" alt="Jogo" />
          <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            Revenda Jogo: Admin
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold text-white">
        <FiUsers className="mr-2" />
        {admin.nome}
      </div>
    </nav>
  )
}