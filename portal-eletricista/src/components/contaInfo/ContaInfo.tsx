import './styles.css'
import { useEffect, useState } from 'react'
import { infoCliente, infoProfissional } from '../../services/account.service'

export default function ContaInfo() {
  const [usuario, setUsuario] = useState<{
    nome: string
    email: string
    fotoUrl: string
  } | null>(null)

  const [loading, setLoading] = useState(true)
  const [erro, setErro] = useState("")

  useEffect(() => {
    const carregarDados = async () => {
      const email = localStorage.getItem('email')
      const tipoUsuario = localStorage.getItem('tipo')

      if (!email || !tipoUsuario) {
        setErro("Dados de autenticação ausentes")
        setLoading(false)
        return
      }

      try {
        let dados

        if (tipoUsuario === 'cliente') {
          dados = await infoCliente(email)
        } else if (tipoUsuario === 'profissional') {
          dados = await infoProfissional(email)
        } else {
          throw new Error("Tipo de usuário inválido")
        }

        setUsuario(dados)
      } catch (e) {
        setErro("Erro ao carregar informações do usuário")
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  if (loading) return <div className="spinner-container"><div className="spinner" /></div>
  if (erro) return <p>{erro}</p>
  if (!usuario) return null

  return (
    <section className="conta-info">
      <h2>Informações Pessoais</h2>
      <div className="info-conteudo">
        <img className="foto-perfil" src={usuario.fotoUrl} alt="Foto de perfil" />
        <div className="info-detalhes">
          <div><strong>Nome:</strong> {usuario.nome}</div>
          <div><strong>Email:</strong> {usuario.email}</div>
        </div>
      </div>
    </section>
  )
}
