import React, { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Container,
  Group,
  Text,
  Alert,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Importer le contexte d'authentification

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Récupérer la fonction login du contexte

  const handleSubmit = async () => {
    setError(null); // Réinitialiser l'erreur
    setLoading(true); // Activer le chargement

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur de connexion");
      }

      // Stocker le token et mettre à jour l'utilisateur dans le contexte
      login(data.token);

      // Redirection après connexion
      navigate("/home-component");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false); // Désactiver le chargement
    }
  };

  return (
    <Container>
      <Text size="xl" mb="md">
        Connexion
      </Text>

      {error && (
        <Alert color="red" mb="md">
          {error}
        </Alert>
      )}

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

      <Group mt="md">
        <Button onClick={handleSubmit} loading={loading}>
          Se connecter
        </Button>
      </Group>
    </Container>
  );
};

export default Login;
