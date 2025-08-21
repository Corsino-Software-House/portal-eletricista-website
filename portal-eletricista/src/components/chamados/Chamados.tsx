import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function Chamados() {
  const navigate = useNavigate();

  // Estados para armazenar a opção selecionada (valor) e seu texto correspondente
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "", "", "", "", "", ""
  ]);
  const [selectedTexts, setSelectedTexts] = useState<string[]>([
    "", "", "", "", "", ""
  ]);

  function handleSolicitarChamado(index: number) {
    const token = sessionStorage.getItem("token");
    // Salva o texto da opção selecionada no localStorage
    localStorage.setItem("tituloProjeto", selectedTexts[index] || "");
    localStorage.setItem("redirect", true.toString());

    if (token) {
      navigate("/agendamento");
    } else {
      navigate("/areadocliente");
    }
  }

  function handleSelectChange(
    index: number,
    value: string,
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = value;
    setSelectedOptions(newSelectedOptions);

    // Captura o texto da opção selecionada
    const selectedOptionText = event.target.options[event.target.selectedIndex].text;
    const newSelectedTexts = [...selectedTexts];
    newSelectedTexts[index] = selectedOptionText;
    setSelectedTexts(newSelectedTexts);
  }

  return (
    <>
      <section className="chamado">
        <div className="chamado__container">

          {/* 1º Item */}
          <div className="chamado__item">
            <img src="/servicos.webp" alt="Concerto de fio descapado" />
            <div className="chamado__texto">
              <h3>Serviços Elétricos Residenciais e Comerciais</h3>
              <p>
                Precisa de instalar, renovar ou reparar a instalação elétrica da
                sua casa ou empresa? Os nossos eletricistas certificados
                garantem um trabalho seguro, eficiente e dentro das normas
                legais. Desde quadros elétricos e disjuntores até à iluminação
                interior e exterior, tratamos de tudo com rigor e atenção ao
                detalhe. Peça já o seu orçamento!
              </p>
              <select
                className="chamado__select"
                value={selectedOptions[0]}
                onChange={(e) => handleSelectChange(0, e.target.value, e)}
              >
                <option value="">Selecione uma opção</option>
                <option value="instalacao">
                  Instalação elétrica completa (obra nova ou remodelação)
                </option>
                <option value="substituicao">
                  Substituição de quadros elétricos
                </option>
                <option value="disjuntores">
                  Instalação de disjuntores e diferencial
                </option>
                <option value="passagem">
                  Passagem e substituição de cabos
                </option>
                <option value="tomadas">
                  Tomadas e interruptores (instalação, substituição, reparo)
                </option>
                <option value="iluminacao">
                  Iluminação interior e exterior (convencional e LED)
                </option>
                <option value="ventoinhas">
                  Ventoinhas de teto e exaustores
                </option>
                <option value="manutencao">
                  Manutenção preventiva de sistemas elétricos
                </option>
                <option value="aumento">
                  Aumento de potência de quadro elétrico, ficha eletrotécnica e
                  padrão E-redes
                </option>
                <option value="certificacao">
                  Certificação elétrica (para venda ou arrendamento de imóveis)
                </option>
                <option value="inspecoes">
                  Inspeções técnicas e diagnósticos de falhas
                </option>
              </select>
              <button
                className="chamado__botao"
                onClick={() => handleSolicitarChamado(0)}
              >
                Escolher Projeto
              </button>
            </div>
          </div>

          {/* 2º Item */}
          <div className="chamado__item">
            <img src="/automacoes.webp" alt="Troca de disjuntor" />
            <div className="chamado__texto">
              <h3>Automação Residencial / Smart Home</h3>
              <p>
                Transforme a sua casa numa casa inteligente! Instalamos e
                configuramos sistemas domóticos com assistentes virtuais,
                iluminação automática, tomadas inteligentes, câmaras de
                segurança e muito mais. Controle tudo à distância, com conforto
                e eficiência energética. Comece hoje a modernizar o seu lar.
              </p>
              <select
                className="chamado__select"
                value={selectedOptions[1]}
                onChange={(e) => handleSelectChange(1, e.target.value, e)}
              >
                <option value="">Selecione uma opção</option>
                <option value="instalacao">
                  Instalação e configuração de assistentes virtuais (Alexa,
                  Google Home, etc.)
                </option>
                <option value="wifi">
                  Instalação de tomadas e interruptores inteligentes (Wi-Fi)
                </option>
                <option value="automatizacao">
                  Automatização de iluminação, estores e persianas
                </option>
                <option value="cameras">
                  Instalação de câmeras de vigilância (CCTV)
                </option>
                <option value="sensores">
                  Instalação de sensores de movimento, fumaça, gás e inundação
                </option>
                <option value="controlo">
                  Controlo remoto de dispositivos via app
                </option>
                <option value="sistemas">
                  Integração de sistemas de segurança com domótica
                </option>
                <option value="meters">
                  Consultoria e otimização do consumo elétrico com smart meters
                </option>
              </select>
              <button
                className="chamado__botao"
                onClick={() => handleSolicitarChamado(1)}
              >
                Escolher Projeto
              </button>
            </div>
          </div>

          {/* 3º Item */}
          <div className="chamado__item">
            <img src="/canalizacao.webp" alt="Concerto de Tomada" />
            <div className="chamado__texto">
              <h3>Canalização Profissional</h3>
              <p>
                Tem fugas de água, entupimentos ou precisa de instalar novos
                equipamentos sanitários? Conte com os nossos canalizadores
                experientes para resolver rapidamente qualquer problema.
                Realizamos desde pequenas reparações até canalizações completas
                para remodelações. Trabalhamos com materiais de qualidade e
                mão-de-obra especializada.
              </p>
              <select
                className="chamado__select"
                value={selectedOptions[2]}
                onChange={(e) => handleSelectChange(2, e.target.value, e)}
              >
                <option value="">Selecione uma opção</option>
                <option value="reparacao">
                  Reparação de fugas de água (canos, torneiras, sifões)
                </option>
                <option value="desentupimento">
                  Desentupimentos (sanitas, lavatórios, ralos, canos)
                </option>
                <option value="instalacao">
                  Instalação de torneiras, chuveiros e misturadoras
                </option>
                <option value="substituicao">
                  Substituição de loiças sanitárias (sanitas, bidês, lavatórios)
                </option>
                <option value="maquinas">
                  Instalação de máquinas de lavar roupa/loiça
                </option>
                <option value="autoclismos">
                  Reparação e substituição de autoclismos
                </option>
                <option value="montagem">
                  Montagem de sistemas de filtragem e purificação de água
                </option>
                <option value="canalizacoes">
                  Canalizações completas para obras novas ou remodelações
                </option>
                <option value="verificacao">
                  Verificação e substituição de esgotos e águas pluviais
                </option>
                <option value="certificacao">
                  Certificações e ensaios de pressão/estanqueidade
                </option>
              </select>
              <button
                className="chamado__botao"
                onClick={() => handleSolicitarChamado(2)}
              >
                Escolher Projeto
              </button>
            </div>
          </div>

          {/* 4º Item */}
          <div className="chamado__item">
            <img src="/manutencao.webp" alt="Concerto de Tomada" />
            <div className="chamado__texto">
              <h3>Manutenção Geral e Pequenas Reparações</h3>
              <p>
                Para aqueles serviços "chatos" que ninguém quer fazer — nós
                tratamos disso por si. Instalamos suportes de TV, luminárias,
                cortinados, fazemos pequenas remodelações em cozinhas e casas de
                banho e garantimos a manutenção periódica dos seus sistemas.
                Serviço rápido, limpo e feito por profissionais.
              </p>
              <select
                className="chamado__select"
                value={selectedOptions[3]}
                onChange={(e) => handleSelectChange(3, e.target.value, e)}
              >
                <option value="">Selecione uma opção</option>
                <option value="reparos">
                  Reparos elétricos e hidráulicos simples
                </option>
                <option value="sistemas">
                  Manutenção periódica de sistemas
                </option>
                <option value="remodelacoes">
                  Pequenas remodelações de cozinha e WC (ligadas a elétrica e
                  canalização)
                </option>
                <option value="cortinados">
                  Instalação de suportes de TV, luminárias, cortinados
                </option>
                <option value="interruptores">
                  Substituição de tomadas e interruptores danificados
                </option>
              </select>
              <button
                className="chamado__botao"
                onClick={() => handleSolicitarChamado(3)}
              >
                Escolher Projeto
              </button>
            </div>
          </div>

          {/* 5º Item */}
          <div className="chamado__item">
            <img src="/emergencia.webp" alt="Concerto de Tomada" />
            <div className="chamado__texto">
              <h3>Emergências e Urgências 24h</h3>
              <p>
                Problemas elétricos ou canalizações a qualquer hora do dia (ou
                da noite)? A Tech Manlight tem uma equipa pronta para responder
                24 horas por dia, todos os dias. Se tem falta de luz, um quadro
                a disparar, fugas graves ou entupimentos, não espere. Ligue-nos
                e resolvemos rapidamente, com técnicos preparados para
                emergências.
              </p>
              <select
                className="chamado__select"
                value={selectedOptions[4]}
                onChange={(e) => handleSelectChange(4, e.target.value, e)}
              >
                <option value="">Selecione uma opção</option>
                <option value="energia">Falta de energia elétrica</option>
                <option value="quadro">
                  Quadro a disparar / disjuntor queimado
                </option>
                <option value="inundacao">
                  Fugas de água visíveis ou risco de inundação
                </option>
                <option value="entupimentos">Entupimentos graves</option>
                <option value="aquecedores">
                  Problemas com aquecedores elétricos ou termoacumuladores
                </option>
              </select>
              <button
                className="chamado__botao"
                onClick={() => handleSolicitarChamado(4)}
              >
                Escolher Projeto
              </button>
            </div>
          </div>

          {/* 6º Item */}
          <div className="chamado__item">
            <img src="/vantagens.webp" alt="Concerto de Tomada" />
            <div className="chamado__texto">
              <h3>Vantagens para Técnicos Profissionais</h3>
              <p>
                É técnico e quer trabalhar connosco? A Tech Manlight oferece
                pedidos filtrados por zona e tipo de serviço, pagamentos
                garantidos, flexibilidade total e acesso a clientes com perfis
                verificados. Cresça profissionalmente com o nosso apoio técnico
                e comercial — e torne-se um dos nossos parceiros preferenciais.
              </p>
              <select
                className="chamado__select"
                value={selectedOptions[5]}
                onChange={(e) => handleSelectChange(5, e.target.value, e)}
              >
                <option value="">Selecione uma opção</option>
                <option value="filtrados">
                  Receba pedidos filtrados por zona, tipo de serviço e urgência
                </option>
                <option value="pagamento">
                  Pagamento seguro e garantido pela plataforma
                </option>
                <option value="flexibilidade">
                  Flexibilidade de horários e aceitação de serviços
                </option>
                <option value="perfil">
                  Acesso a cliente final com perfil validado
                </option>
                <option value="possibilidade">
                  Possibilidade de crescer na reputação e ser técnico
                  preferencial
                </option>
              </select>
              <button
                className="chamado__botao"
                onClick={() => handleSolicitarChamado(5)}
              >
                Escolher Projeto
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
