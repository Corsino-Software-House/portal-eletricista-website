import { useNavigate } from 'react-router-dom'
import './styles.css'

export default function ContaOpcoes() {
  const navigate = useNavigate()

  const handleLogout = () => {
    if (localStorage.getItem("tipo") === "profissional") {
        localStorage.clear()
        sessionStorage.clear()
        navigate('/areadoprofissional/login')
    } else{
        localStorage.clear()
        sessionStorage.clear()
        navigate('/areadocliente/login')
    }
    
  }

  return (
    <section className="conta-opcoes">
      <h2>Ações da Conta</h2>
      <div className="opcoes-lista">
        <button onClick={() => navigate('/conta/editar-perfil')}>
          Editar Perfil
        </button>
        <button onClick={() => navigate('/conta/alterar-senha')}>
          Alterar Senha
        </button>
        <button className="sair" onClick={handleLogout}>
          Sair da Conta
        </button>
      </div>
    </section>
  )
}
