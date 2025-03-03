import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Container, Group, Text } from '@mantine/core';

const SignUp: React.FC = () => {
    
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const payload = { username,email, password };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du compte');
      }

      const data = await response.json();
      alert('Compte créé avec succès');
      console.log(data); // Optionnel: Rediriger l'utilisateur vers la page de connexion
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Text size="xl">Créer un compte</Text>
      <TextInput
        label="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.currentTarget.value)}
        required
      />
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
      <PasswordInput
        label="Confirmer le mot de passe"
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        required
      />
      <Group>
        <Button onClick={handleSubmit}>Créer un compte</Button>
      </Group>
    </Container>
  );
};

export default SignUp;
