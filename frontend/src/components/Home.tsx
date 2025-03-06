import React from "react";
import { Container, Title, Text, Button, Group, Grid, Card, Image, Stack } from "@mantine/core";
import { FaBriefcase, FaCode, FaUserCircle } from "react-icons/fa"; // Icônes pour les sections
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Container size="lg" mt="md">
      {/* Section d'introduction */}
      <Stack align="center" >
        <Title  order={1}>Bienvenue sur mon Portfolio</Title>
        <Text  size="lg">
          Je suis un développeur passionné avec une expertise en développement web. Découvrez mon travail et mes projets.
        </Text>
      </Stack>

      {/* Boutons d'appel à l'action */}
      <Group  mt="xl">
        <Button color="blue" leftSection={<FaBriefcase />} variant="outline" onClick={() => navigate('/project-manager')}>
          Voir mes projets
        </Button>
        <Button color="green" leftSection={<FaUserCircle />} variant="outline" onClick={() => navigate('/a-propos')}>
          En savoir plus sur moi
        </Button>
      </Group>

      

      
    </Container>
  );
};

export default Home;
