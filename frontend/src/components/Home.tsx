import { Container, Title, Text, Button, Group, Image, Grid, Card, Badge, NavLink } from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      

      <Container size="lg" py="xl">
        {/* Section Présentation */}
        <Grid gutter="xl" align="center">
          <Grid.Col >
            <Title order={1}>Bienvenue sur mon portfolio</Title>
            <Text size="lg" mt="md">
              Je suis un développeur passionné spécialisé en React.js et en développement web moderne. Découvrez mes projets et mon expertise !
            </Text>
            <Button onClick={() => navigate('/form-component')} mt="lg" size="lg" color="blue">Me Contacter</Button>
          </Grid.Col>
          <Grid.Col >
            <Image src="/src/assets/moi.jpg" h={200} w="auto" fit="contain" alt="Image de profil" radius="md" />
          </Grid.Col>
        </Grid>

        {/* Section Compétences */}
        <Title order={2} mt={50} >Mes Compétences</Title>
        <Group  mt="md">
          <Badge color="blue">React.js</Badge>
          <Badge color="green">Node.js</Badge>
          <Badge color="orange">JavaScript</Badge>
          <Badge color="red">MongoDB</Badge>
          <Badge color="purple">CSS</Badge>
        </Group>

        {/* Section Projets */}
        <Title id="projets" order={2} mt={50} >Mes Projets</Title>
        <Grid mt="md">
          {[1, 2, 3].map((proj) => (
            <Grid.Col key={proj}>
              <Card shadow="sm" p="lg" radius="md" withBorder>
                <Card.Section>
                  <Image src="https://source.unsplash.com/400x250/?code" height={160} alt="Projet" />
                </Card.Section>
                <Title order={3} mt="md">Projet {proj}</Title>
                <Text size="sm" mt="xs">Un projet intéressant que j'ai développé récemment.</Text>
                <Button mt="md" variant="light">Voir plus</Button>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Home;