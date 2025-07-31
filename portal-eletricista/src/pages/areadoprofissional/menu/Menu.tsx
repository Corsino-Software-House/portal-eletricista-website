
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  Calendar,
  Search,
  Star,
  ChevronRight,
  ChevronLeft
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
    path: "/areadoprofissional/chamados-agendados"
  },
  {
    title: "Buscar Trabalhos",
    description:
      "Encontre novas oportunidades de serviço na sua região e candidate-se para realizar atendimentos como eletricista.",
    icon: <Search size={32} />,
    path: "/areadoprofissional/buscar-trabalhos"
  },
  {
    title: "Ver Avaliações",
    description:
      "Acompanhe o que os clientes estão dizendo sobre seus serviços e veja sua média de avaliações recebidas.",
    icon: <Star size={32} />,
    path: "/areadoprofissional/minhas-avaliacoes"
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

const HistoricoCard = ({ title, description, link }: any) => (
  <div className="card historico-card">
    <h4>{title}</h4>
    <p>{description}</p>
    <a href={link} className="avaliar-link">Ver Avaliallção</a>
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

      <h2 className="historico-title"> Chamados Realizados</h2>
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
