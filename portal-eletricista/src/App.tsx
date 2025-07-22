import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComoFunciona from './pages/comofunciona/ComoFunciona';
import AreaDoCliente from './pages/areadocliente/AreaDoCliente';
import AreaDoProfissional from './pages/areadoprofissional/AreaDoProfissional';
import Conta from './pages/conta/Conta';
import Inicio from './pages/inicio/Inicio';

const router = createBrowserRouter([
  { path: '/', element: <Inicio /> },
  { path: '/comofunciona', element: <ComoFunciona /> },
  { path: '/areadocliente', element: <AreaDoCliente /> },
  { path: '/areadoprofissional', element: <AreaDoProfissional /> },
  { path: '/conta', element: <Conta /> },
]);

function App() {
  return <RouterProvider router={router} />;
  
}

export default App;
