import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ComoFunciona from "./pages/comofunciona/ComoFunciona";
import AreaDoCliente from "./pages/areadocliente/AreaDoCliente";
import AreaDoProfissional from "./pages/areadoprofissional/AreaDoProfissional";
import Conta from "./pages/conta/Conta";
import Inicio from "./pages/inicio/Inicio";
import CadastroCliente from "./pages/cadastrodocliente/CadastroDoCliente";
import CadastroProfissional from "./pages/cadastrodoprofissional/CadastroDoProssional";
import CompletarPerfil from "./pages/cadastrodoprofissional/completarPerfil/completarPerfil";
import CompletarPerfilCliente from "./pages/cadastrodocliente/completarPerfil/completarPerfil";
import MenuCliente from "./pages/areadocliente/menu/Menu";
import MenuProfissional from "./pages/areadoprofissional/menu/Menu";
import RedirectCliente from "./pages/areadocliente/RedirectCliente";
import RedirectProfissional from "./pages/areadoprofissional/RedirectProfissional";
import EditarPerfil from "./pages/editarPerfil/EditarPerfil";
import PrivateRoute from "./PrivateRoute";
import ProfessionalSearch from "./pages/ProfessionalSearch/ProfessionalSearch";
import ProfessionalProfile from "./pages/perfildoprofissional/ProfessionalProfile";
import AlterarSenha from "./pages/alterarSenha/AlterarSenha";
import Agendamento from "./pages/postagemdoprojeto/PostagemDoProjeto";
import AvaliacaoProfissional from "./pages/avaliacao/AvaliacaoProfissional";
import Avaliar from "./pages/avaliar/AvaliarProfissional";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import ChamadosAgendados from "./pages/chamadosAgendados/chamdadosAgendados";
import BuscarTrabalhos from "./pages/buscarTrabalhos/buscarTrabalhos";
import MinhasAvaliacoes from "./pages/minhasAvaliacoes/minhasAvaliacoes";
import DetalhesDoChamado from "./pages/detalhesChamado/detalhesChamado";
import PlanosDeCreditos from "./pages/creditos/creditos";
import Dashboard from "./pages/dashboard/Dashboard";

const router = createBrowserRouter([
  { path: "/", element: <Inicio /> },
  { path: "/comofunciona", element: <ComoFunciona /> },
  { path: "/areadocliente", element: <RedirectCliente /> },
  { path: "/areadocliente/login", element: <AreaDoCliente /> },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/creditos", element: <PlanosDeCreditos /> },
  { path: "/dashboard", element: <Dashboard /> },

  {
    path: "/avaliar",
    element: (
      <PrivateRoute tipo="cliente">
        <Avaliar />
      </PrivateRoute>
    ),
  },

  {
    path: "/avaliacao/:id",
    element: (
      <PrivateRoute tipo="cliente">
        <AvaliacaoProfissional />
      </PrivateRoute>
    ),
  },

  {
    path: "/profissionais",
    element: (
      <PrivateRoute tipo="cliente">
        <ProfessionalSearch />
      </PrivateRoute>
    ),
  },

  {
    path: "/profissionais/:id",
    element: (
      <PrivateRoute tipo="cliente">
        <ProfessionalProfile />
      </PrivateRoute>
    ),
  },

  {
    path: "/agendamento",
    element: (
      <PrivateRoute tipo="cliente">
        <Agendamento />
      </PrivateRoute>
    ),
  },

  {
    path: "/areadocliente/menu",
    element: (
      <PrivateRoute tipo="cliente">
        <MenuCliente />
      </PrivateRoute>
    ),
  },

  { path: "/areadoprofissional", element: <RedirectProfissional /> },
  { path: "/areadoprofissional/login", element: <AreaDoProfissional /> },

  {
    path: "/areadoprofissional/menu",
    element: (
      <PrivateRoute tipo="profissional">
        <MenuProfissional />
      </PrivateRoute>
    ),
  },

  {
    path: "/areadoprofissional/chamados-agendados",
    element: (
      <PrivateRoute tipo="profissional">
        <ChamadosAgendados />
      </PrivateRoute>
    ),
  },

  {
    path: "/areadoprofissional/detalhes-chamado",
    element: (
      <PrivateRoute tipo="profissional">
        <DetalhesDoChamado />
      </PrivateRoute>
    ),
  },

  {
    path: "/areadoprofissional/buscar-trabalhos",
    element: (
      <PrivateRoute tipo="profissional">
        <BuscarTrabalhos />
      </PrivateRoute>
    ),
  },

  {
    path: "/areadoprofissional/minhas-avaliacoes",
    element: (
      <PrivateRoute tipo="profissional">
        <MinhasAvaliacoes />
      </PrivateRoute>
    ),
  },

  {
    path: "/areadoprofissional/completar-perfil",
    element: <CompletarPerfil />,
  },

  {
    path: "/areadocliente/completar-perfil",
    element: <CompletarPerfilCliente />,
  },

  {
    path: "/conta",
    element: (
      <PrivateRoute tipo={["cliente", "profissional"]}>
        <Conta />
      </PrivateRoute>
    ),
  },

  {
    path: "/conta/editar-perfil",
    element: (
      <PrivateRoute tipo={["cliente", "profissional"]}>
        <EditarPerfil />
      </PrivateRoute>
    ),
  },

  {
    path: "/conta/alterar-senha",
    element: (
      <PrivateRoute tipo={["cliente", "profissional"]}>
        <AlterarSenha />
      </PrivateRoute>
    ),
  },

  { path: "/cadastro-cliente", element: <CadastroCliente /> },
  { path: "/cadastro-profissional", element: <CadastroProfissional /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
