
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  NotebookText,
  Search,
  Star,
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";


const menuItems = [
  {
    title: "Publicar Projetos",
    description:
      "Acesse sua conta agora para visualizar e gerenciar todos os seus projetos publicados. Tenha controle total sobre suas criações e veja como estão performando.",
    icon: <NotebookText size={32} />,
    path: "/agendamento"
  },
  {
    title: "Buscar Profissionais",
    description:
      "Encontre eletricistas qualificados próximos de você, filtrando por especialidade, localização e avaliações de outros clientes.",
    icon: <Search size={32} />,
    path: "/profissionais"
  },
  {
    title: "Avaliar Profissionais",
    description:
      "Compartilhe sua experiência com o profissional que realizou o serviço, ajudando outros usuários a fazerem boas escolhas.",
    icon: <Star size={32} />,
    path: "/avaliar"
  },
  {
    title: "Minha Conta",
    description:
      "Para ver suas informações detalhadas do cliente, por favor, acesse sua conta em nosso site. Lá você encontrará todos os seus dados e poderá gerenciar suas preferências facilmente.",
    icon: <User size={32} />,
    path: "/conta"
  },
  
];

const historicoChamados = [
  {
    title: "Concerto de tomada",
    description:
      "Reparo realizado em tomada com mau contato, incluindo substituição do espelho e verificação da fiação interna.",
    link: "/avaliacao"
  },
  {
    title: "Troca de Disjuntor",
    description:
      "Substituição de disjuntor danificado por um novo, compatível com a carga elétrica do circuito, garantindo mais segurança.",
    link: "/avaliacao"
  },
  {
    title: "Concerto de fio descapado",
    description:
      "Isolamento e reparo de fios expostos em circuito interno, prevenindo curtos-circuitos e possíveis choques elétricos.",
    link: "/avaliacao"
  }
];

const MenuCard = ({ title, description, icon, path }: any) => (
  <Link to={path} className="card menu-card">
    <div className="icon">{icon}</div>
    <h3>{title}</h3>
    <p>{description}</p>
  </Link>
);

const HistoricoCard = ({ title, description }: any) => (
  <div className="card historico-card">
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow next-arrow" onClick={onClick}>
      <ChevronRight size={28} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow prev-arrow" onClick={onClick}>
      <ChevronLeft size={28} />
    </div>
  );
};

const Dashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

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

      <h2 className="historico-title">Historico de Projetos</h2>
      <div className="carousel-wrapper">
        <Slider {...settings} className="historico-carousel">
          {historicoChamados.map((item, idx) => (
            <HistoricoCard key={idx} {...item} />
          ))}
        </Slider>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default Dashboard;
