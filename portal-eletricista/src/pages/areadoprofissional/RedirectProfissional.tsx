
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectCliente() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token_profissional');
    if (token) {
      navigate('/areadoprofissional/menu'); 
    } else {
      navigate('/areadoprofissional/login'); 
    }
  }, [navigate]);

  return null;
}
