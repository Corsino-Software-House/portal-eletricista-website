
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RedirectCliente() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/areadocliente/menu'); 
    } else {
      navigate('/areadocliente/login'); 
    }
  }, [navigate]);

  return null;
}
