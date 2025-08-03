import { Link } from "react-router-dom";
import {
  Calendar,
  Search,
  Star,
  User,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";

const menuItems = [
  {
    title: "Chamados Agendados",
    description:
      "Visualize todos os serviços que você já agendou, com detalhes como data, horário, cliente e status do atendimento.",
    icon: <Calendar size={32} />,
    path: "/areadoprofissional/chamados-agendados",
  },
  {
    title: "Buscar Trabalhos",
    description:
      "Encontre novas oportunidades de serviço na sua região e candidate-se para realizar atendimentos como eletricista.",
    icon: <Search size={32} />,
    path: "/areadoprofissional/buscar-trabalhos",
  },
  {
    title: "Ver Avaliações",
    description:
      "Acompanhe o que os clientes estão dizendo sobre seus serviços e veja sua média de avaliações recebidas.",
    icon: <Star size={32} />,
    path: "/areadoprofissional/minhas-avaliacoes",
  },
  {
    title: "Minha Conta",
    description:
      "Para ver suas informações detalhadas do profissional, por favor, acesse sua conta em nosso site. Lá você encontrará todos os seus dados e poderá gerenciar suas preferências facilmente.",
    icon: <User size={32} />,
    path: "/conta",
  },
];

const MenuCard = ({ title, description, icon, path }: any) => (
  <Link to={path} className="card menu-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </Link>
);

const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="dashboard-container">
        <h2 className="menu-title">Menu</h2>
        <div className="menu-grid">
          {menuItems.map((item, idx) => (
            <MenuCard key={idx} {...item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
