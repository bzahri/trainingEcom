import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Container, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const payload = { email, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Erreur de connexion');
        return;
      }

      const data = await response.json();
      alert('Connexion réussie');
      console.log(data); // Optionnel: Sauvegarder le token JWT dans un stockage local
      localStorage.setItem('token', data.token);
      // Rediriger l'utilisateur vers la page d'accueil ou le tableau de bord
      navigate("/home-component");  // Redirection vers la page d'accueil
    } catch (error: any) {
      setError(error.message || 'Erreur inconnue');
    }
  };

  return (
    <Container>
      <Text size="xl">Connexion</Text>
      {error && <Text color="red">{error}</Text>}
      <TextInput
        label="Email"
        placeholder="ton@email.com"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        required
      />
      <PasswordInput
        label="Mot de passe"
        placeholder="Votre mot de passe"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        required
      />
      <Group >
        <Button onClick={handleSubmit}>Se connecter</Button>
      </Group>
    </Container>
  );
};

export default Login;
