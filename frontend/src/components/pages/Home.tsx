import React, { useState } from "react";
import { Container, Title, Text, Button, Group, Grid, Card, Image, Stack, FileInput, Space, Blockquote } from "@mantine/core";
import { FaBriefcase, FaUserCircle } from "react-icons/fa"; // Icônes pour les sections
import { useNavigate } from "react-router-dom";
import ImageGallery from "../gallery/ImageGallery";
import '@mantine/carousel/styles.css';
import OpenStreetMapComponent from "../contact/OpenStreetMapComponent";
import TimeLineComponent from "./TimeLineComponent";
import { IconInfoCircle } from "@tabler/icons-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container size="lg" mt="md">
        <Stack align="center" >

          {/* Section d'introduction */}
          <Title order={1}>Agence de Communication Digital</Title>
          <Text size="lg">
            Votre agence de communication digitale. Nous concevons des solutions sur mesure pour une stratégie de communication crédible et créative. Confiez-nous la gestion de votre présence en ligne pour booster votre entreprise !
          </Text>
          {/* Boutons d'appel à l'action */}
          <Group mt="xl">
            <Button color="blue" leftSection={<FaBriefcase />} variant="outline" onClick={() => navigate('/project-manager')}>
              Nos Services
            </Button>
            <Button color="blue" leftSection={<FaBriefcase />} variant="outline" onClick={() => navigate('/project-manager')}>
              Nos Projets
            </Button>
            <Button color="green" leftSection={<FaUserCircle />} variant="outline" onClick={() => navigate('/a-propos')}>
              En savoir plus sur moi
            </Button>
            <Button color="green" leftSection={<FaUserCircle />} variant="outline" onClick={() => navigate('/a-propos')}>
              Nous Contactez
            </Button>
          </Group>
        </Stack>
        <Space h="sm" />
        <Stack align="center" justify="center">
          {/* Fonctionalité Diverses */}
          <Title order={1}>Galerie d'Image</Title>
          <ImageGallery />
          <Title order={1}>Street Map</Title>
          <OpenStreetMapComponent />
          <Title order={1}>Time Line</Title>
          <TimeLineComponent />
          <Title order={1}>Block Quote</Title>
          <Blockquote color="violet" cite="– Forrest Gump" icon={<IconInfoCircle />} mt="xl">
            Life is like an npm install – you never know what you are going to get.
          </Blockquote>
        </Stack>
      </Container>



    </>

  );
};

export default Home;
