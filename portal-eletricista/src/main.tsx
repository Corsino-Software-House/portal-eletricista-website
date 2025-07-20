import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ComoFunciona from './pages/comoFunciona.tsx';
import AreaDoCliente from './pages/AreaDoCliente.tsx';
import AreaDoProfissional from './pages/AreaDoProfissional.tsx';
import Conta from './pages/Conta.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/comofunciona",
    element: <ComoFunciona />,
  },
  {
    path: "/areadocliente",
    element: <AreaDoCliente />,
  },
  {
    path: "/areadoprofissional",
    element: <AreaDoProfissional />,
  },
  {
    path: "/conta",
    element: <Conta />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
