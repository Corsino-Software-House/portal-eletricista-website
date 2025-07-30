import "./styles.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

export default function BuscarTrabalhos() {
    const navigate = useNavigate();
  const trabalhos = [
    {
      titulo: "Troca de disjuntores",
      descricao: "Trocar 3 disjuntores queimados no quadro principal.",
      especialidade: "Residencial",
      local: "Centro",
      valor: 200,
      usuario: "João da Silva"
    },
    {
      titulo: "Instalação de ventilador",
      descricao: "Instalar ventilador de teto com controle remoto.",
      especialidade: "Residencial",
      local: "Jardim América",
      valor: 180,
      usuario: "Maria Oliveira"
    },
    {
      titulo: "Manutenção em motor trifásico",
      descricao: "Motor está travando e soltando faíscas.",
      especialidade: "Industrial",
      local: "Distrito Industrial",
      valor: 350,
      usuario: "Carlos Lima"
    }
  ];

  return (
    <>
        <Header />
        
    <div className="trabalhos-wrapper">
      <h1>Buscar Trabalhos</h1>
      <div className="trabalhos-grid">
        {trabalhos.map((trabalho, index) => (
          <div className="trabalho-card" key={index}>
            <h2>{trabalho.titulo}</h2>
            <p className="descricao">{trabalho.descricao}</p>
            <p><strong>Especialidade:</strong> {trabalho.especialidade}</p>
            <p><strong>Local:</strong>  {trabalho.local} •  € {trabalho.valor}</p>
            <p><strong>Publicado por:</strong> {trabalho.usuario}</p>
            <button onClick={() => navigate("/areadoprofissional/detalhes-chamado")}>Candidatar-se</button>
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}
