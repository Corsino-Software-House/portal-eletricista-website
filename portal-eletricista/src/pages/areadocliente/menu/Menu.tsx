import React from "react";
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


const menuItems = [
  {
    title: "Agendar Chamado",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ipsum id dui volutpat iaculis nec ac ipsum.",
    icon: <Calendar size={32} />,
    path: "/agendar"
  },
  {
    title: "Buscar Profissionais",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ipsum id dui volutpat iaculis nec ac ipsum.",
    icon: <Search size={32} />,
    path: "/buscar"
  },
  {
    title: "Avaliar Profissionais",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ipsum id dui volutpat iaculis nec ac ipsum.",
    icon: <Star size={32} />,
    path: "/avaliar"
  }
];

const historicoChamados = [
  {
    title: "Concerto de tomada",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ipsum id dui volutpat iaculis nec ac ipsum. Sed id mollis ex, et faucibus ligula.",
    link: "#"
  },
  {
    title: "Troca de Disjuntor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ipsum id dui volutpat iaculis nec ac ipsum. Sed id mollis ex, et faucibus ligula.",
    link: "#"
  },
  {
    title: "Concerto de fio descapado",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vitae ipsum id dui volutpat iaculis nec ac ipsum. Sed id mollis ex, et faucibus ligula.",
    link: "#"
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
    <a href={link} className="avaliar-link">Avaliar</a>
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
    slidesToShow: 2,
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
    <div className="dashboard-container">
      <h2 className="menu-title">Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item, idx) => (
          <MenuCard key={idx} {...item} />
        ))}
      </div>

      <h2 className="historico-title">Historico de Chamados</h2>
      <div className="carousel-wrapper">
        <Slider {...settings} className="historico-carousel">
          {historicoChamados.map((item, idx) => (
            <HistoricoCard key={idx} {...item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Dashboard;
