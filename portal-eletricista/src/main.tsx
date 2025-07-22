import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import './index.css'; // CSS global (opcional)

import App from './App'; // importa o App.tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);