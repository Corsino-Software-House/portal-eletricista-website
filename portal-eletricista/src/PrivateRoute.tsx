// src/components/PrivateRoute.tsx
import { Navigate, useLocation } from 'react-router-dom'

interface PrivateRouteProps {
  children: React.ReactNode
  tipo: 'cliente' | 'profissional' | 'admin' | Array<'cliente' | 'profissional' | 'admin'>
}

export default function PrivateRoute({ children, tipo }: PrivateRouteProps) {
  const location = useLocation()

  const tipos = Array.isArray(tipo) ? tipo : [tipo]

  const tokens = {
    cliente: sessionStorage.getItem('token'),
    profissional: sessionStorage.getItem('token_profissional'),
    admin: sessionStorage.getItem('token_admin'),
  }

  const tipoValido = tipos.find(t => tokens[t])

  if (!tipoValido) {
    const rotaLogin =
      tipos.includes('profissional')
        ? '/areadoprofissional/login'
        : tipos.includes('admin')
        ? '/admin/login'
        : '/areadocliente/login'

    return <Navigate to={rotaLogin} replace state={{ from: location }} />
  }

  return <>{children}</>
}
