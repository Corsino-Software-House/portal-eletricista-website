import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComoFunciona from './pages/comofunciona/ComoFunciona';
import AreaDoCliente from './pages/areadocliente/AreaDoCliente';
import AreaDoProfissional from './pages/areadoprofissional/AreaDoProfissional';
import Conta from './pages/conta/Conta';
import Inicio from './pages/inicio/Inicio';
import CadastroCliente from './pages/cadastrodocliente/CadastroDoCliente';
import CadastroProfissional from './pages/cadastrodoprofissional/CadastroDoProssional';
import CompletarPerfil from './pages/cadastrodoprofissional/completarPerfil/completarPerfil';
import MenuCliente from './pages/areadocliente/menu/Menu';
import MenuProfissional from './pages/areadoprofissional/menu/Menu';
import RedirectCliente from './pages/areadocliente/RedirectCliente';
import RedirectProfissional from './pages/areadoprofissional/RedirectProfissional';
import EditarPerfil from './pages/editarPerfil/EditarPerfil';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  { path: '/', element: <Inicio /> },
  { path: '/comofunciona', element: <ComoFunciona /> },
  { path: '/areadocliente', element: <RedirectCliente /> },
  { path: '/areadocliente/login', element: <AreaDoCliente /> },

  {
    path: '/areadocliente/menu',
    element: (
      <PrivateRoute tipo="cliente">
        <MenuCliente />
      </PrivateRoute>
    ),
  },

  { path: '/areadoprofissional', element: <RedirectProfissional /> },
  { path: '/areadoprofissional/login', element: <AreaDoProfissional /> },

  {
    path: '/areadoprofissional/menu',
    element: (
      <PrivateRoute tipo="profissional">
        <MenuProfissional />
      </PrivateRoute>
    ),
  },

  {
    path: '/areadoprofissional/completar-perfil',
    element: (
      <PrivateRoute tipo="profissional">
        <CompletarPerfil />
      </PrivateRoute>
    ),
  },

  {
  path: '/conta',
  element: (
    <PrivateRoute tipo={['cliente', 'profissional']}>
      <Conta />
    </PrivateRoute>
  ),
},

 {
  path: '/conta/editar-perfil',
  element: (
    <PrivateRoute tipo={['cliente', 'profissional']}>
      <EditarPerfil />
    </PrivateRoute>
  ),
},

  { path: '/cadastro-cliente', element: <CadastroCliente /> },
  { path: '/cadastro-profissional', element: <CadastroProfissional /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
