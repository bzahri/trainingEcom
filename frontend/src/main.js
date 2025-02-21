// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './main'; // Importation du composant Main

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Main /> {/* Utilisation du composant Main à la place de App */}
    </React.StrictMode>
  );
} else {
  console.error("Le conteneur root est introuvable !");
}
