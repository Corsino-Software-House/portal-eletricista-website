import React, { useState } from 'react';
import './Cadastro.css';
import { cadastroAdmin } from '../../services/admin.service';
import LoadingSpinner from '../../components/spinner/spinner';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

type FormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

const Cadastro: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (data.senha !== data.confirmarSenha) {
      Swal.fire('Erro', 'As senhas não coincidem!', 'error');
      return;
    }

    setLoading(true);
    try {
      await cadastroAdmin(  data.nome,  data.email, data.senha );
      Swal.fire('Sucesso!', 'Cadastro realizado com sucesso.', 'success');
      reset();
      navigate('/login');
    } catch (error) {
      Swal.fire('Erro', 'Não foi possível realizar o cadastro.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-image"></div>
      <div className="cadastro-form">
        <h2>Cadastro</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Nome:"
            {...register('nome', { required: 'Nome é obrigatório.' })}
          />
          {errors.nome && <span className="error">{errors.nome.message}</span>}

          <input
            type="email"
            placeholder="E-mail:"
            {...register('email', {
              required: 'E-mail é obrigatório.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Formato de e-mail inválido.',
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}

          <input
            type="password"
            placeholder="Senha:"
            {...register('senha', {
              required: 'Senha é obrigatória.',
              minLength: {
                value: 6,
                message: 'A senha deve ter no mínimo 6 caracteres.',
              },
            })}
          />
          {errors.senha && <span className="error">{errors.senha.message}</span>}

          <input
            type="password"
            placeholder="Confirmar Senha:"
            {...register('confirmarSenha', {
              required: 'Confirmação de senha é obrigatória.',
              validate: value =>
                value === watch('senha') || 'As senhas não coincidem.',
            })}
          />
          {errors.confirmarSenha && <span className="error">{errors.confirmarSenha.message}</span>}

          <button type="submit" disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Cadastrar-se'}
          </button>

          <a href="./login">
            Acesso de <strong>Login</strong>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
