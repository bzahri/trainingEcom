import ReactDOM from 'react-dom/client';
import App from './App';
import React from "react";

import { BrowserRouter, useNavigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
  </React.StrictMode>
  );
