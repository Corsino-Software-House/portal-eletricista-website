import { useForm } from 'react-hook-form';
import { alterarSenhaCliente, alterarSenhaProfissional } from '../../services/alterarSenha.service';
import './styles.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

type FormData = {
  senhaAtual: string;
  novaSenha: string;
};

export default function AlterarSenha() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const id = localStorage.getItem('id');
      const tipo = localStorage.getItem('tipo'); 

      if (!id || !tipo) {
        alert('Usuário não autenticado.');
        return;
      }

      if (tipo === 'cliente') {
        await alterarSenhaCliente(id, data.senhaAtual, data.novaSenha);
      } else {
        await alterarSenhaProfissional(id, data.senhaAtual, data.novaSenha);
      }

      alert('Senha alterada com sucesso!');
      reset();
    } catch (error: any) {
      alert(error?.response?.data?.message || 'Erro ao alterar a senha.');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100vh',
        }}
      >
        <Header />
        <div className="senha-container">
          <form className="senha-form" onSubmit={handleSubmit(onSubmit)}>
            <h2>Alterar Senha</h2>

            <div className="form-group">
              <label htmlFor="senhaAtual">Senha Atual</label>
              <input
                id="senhaAtual"
                type="password"
                {...register('senhaAtual', { required: 'Informe sua senha atual' })}
              />
              {errors.senhaAtual && <p className="error">{errors.senhaAtual.message}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="novaSenha">Nova Senha</label>
              <input
                id="novaSenha"
                type="password"
                {...register('novaSenha', {
                  required: 'Informe a nova senha',
                  minLength: {
                    value: 6,
                    message: 'A nova senha deve ter no mínimo 6 caracteres',
                  },
                })}
              />
              {errors.novaSenha && <p className="error">{errors.novaSenha.message}</p>}
            </div>

            <button type="submit" className="btn-salvar">
              Salvar
            </button>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
