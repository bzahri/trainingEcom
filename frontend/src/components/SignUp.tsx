import React, { useState } from 'react';
import { TextInput, PasswordInput, Button, Container, Group, Text, FileInput } from '@mantine/core';

const SignUp: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null); // Nouveau champ pour la photo de profil

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);

    if (profilePicture) {
      formData.append('profilePicture', profilePicture); // Ajouter la photo de profil au FormData
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        body: formData, // Utiliser formData pour envoyer des fichiers
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création du compte');
      }

      const data = await response.json();
      alert('Compte créé avec succès');
      console.log("handleSubmit : ", data); // Optionnel: Rediriger l'utilisateur vers la page de connexion
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <Container>
      <Text size="xl">Créer un compte</Text>
      <TextInput
        label="Nom d'utilisateur"
        placeholder="Nom d'utilisateur"
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
      <FileInput
        label="Photo de profil"
        placeholder="Choisissez une image"
        value={profilePicture} // Afficher le fichier sélectionné
        onChange={setProfilePicture} // Mettre à jour le fichier
        accept="image/*"
        required={false} // Champ optionnel
      />
      <Group>
        <Button onClick={handleSubmit}>Créer un compte</Button>
      </Group>
    </Container>
  );
};

export default SignUp;
