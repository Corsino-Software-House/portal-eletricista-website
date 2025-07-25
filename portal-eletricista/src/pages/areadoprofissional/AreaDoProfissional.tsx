import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import FormProfissional from "../../components/formprofissional/FormProfissional";
import "./styles.css";

export default function AreaDoProfissional() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100vh",
        }}
      >
        <Header />
        <FormProfissional />
        <Footer />
      </div>
    </>
  );
}
