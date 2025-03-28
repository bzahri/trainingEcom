import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Image,
  Box,
  Divider,
  SimpleGrid,
  Paper,
} from "@mantine/core";
import { IconUsers, IconBook, IconSchool } from "@tabler/icons-react";
import ContactForm from "../contact/ContactForm";
import CourseList from "../courses/CourseList";
const Home = () => {
  

  return (
    <Box>
      {/* Section Hero */}
      <Container size="xl" py="xl">
        <Title order={1} mb="md">
          Bienvenue sur notre Plateforme de Cours et de Formations en Ligne
        </Title>
        <Text size="lg"  mb="xl">
          Explorez des cours variés et rejoignez une communauté d'apprenants.
        </Text>
        <Image src="http://localhost:5173/src/assets/Leonardo_Phoenix_10_prompt_An_illustration_of_a_modern_sleek_1.jpg" alt="Illustration" radius="md" />
      </Container>
      <Divider my="xl" />
      {/* Section des Cours */}
      <Container size="xl" py="xl">
        <Title order={2} mb="md">
          Découvrez une grande panoplie de Cours et Formations
        </Title>
        <Text  mb="xl">
          Choisissez un cours et explorez l'univers qui l'accompagne'.
        </Text>
        <CourseList />

      </Container>

      {/* Section Étudiants Inscrits */}


      <Divider my="xl" />

      {/* Section Contact */}
      <Container size="xl" py="xl">
        <Title order={2} mb="md">
          Contactez-Nous
        </Title>
        <Text size="lg" mb="xl">
          Avez-vous des questions ? Contactez notre équipe pour plus d'informations.
        </Text>
        <SimpleGrid cols={2} spacing="xl">
          <ContactForm />
        </SimpleGrid>
      </Container>

      <Divider my="xl" />
      
    </Box>
  );
};

export default Home;
