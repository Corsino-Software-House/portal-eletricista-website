import React, { useState } from 'react';
import './Login.css';
import { useForm } from 'react-hook-form';
import { login } from '../../services/login.service';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/spinner/spinner';

type FormData = {
  email: string;
  senha: string;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const tipo = 'admin';

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const resposta = await login(data.email, data.senha, tipo);
      localStorage.setItem('email', data.email);
      localStorage.setItem('id', resposta.id);
      localStorage.setItem('tipo', tipo);
      sessionStorage.setItem('token_admin', resposta.access_token);
      setMensagem('Login realizado com sucesso!');
      navigate('/dashboard');
    } catch (erro) {
      setMensagem('Erro ao fazer login. Verifique os dados.');
      console.error(erro);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>

      <div className="login-form">
        <h2>Administrador</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="E-mail:"
            {...register('email', {
              required: 'E-mail é obrigatório',
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: 'Formato de e-mail inválido',
              },
            })}
          />
          {errors.email && <p className="erro">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Senha:"
            {...register('senha', {
              required: 'Senha é obrigatória',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres',
              },
            })}
          />
          {errors.senha && <p className="erro">{errors.senha.message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Entrar'}
          </button>

          {mensagem && <p className="mensagem">{mensagem}</p>}

          <a href="./cadastro"><strong>Cadastrar-se</strong></a>
        </form>
      </div>
    </div>
  );
};

export default Login;
