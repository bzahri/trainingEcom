import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Card, Group, Title, Button } from "@mantine/core";
import axios from "axios";

const API_URL = "http://localhost:5000/api/project"; // Remplace par l'URL de ton API

const ProjectDisplay = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((response) => setProjects(response.data));
  }, []);

  return (
    <Container>
      <Title order={2}>Liste des Projets</Title>
      {projects.map((project: any) => (
        <Card key={project._id} shadow="sm" padding="lg" mt="sm">
          <Group >
            <Title order={4}>{project.title}</Title>
          </Group>
          <p>{project.description}</p>
          <Button component={Link} to={`/project-manager/${project.slug}`} variant="light" color="blue" mt="sm">
            Afficher plus
          </Button>
        </Card>
      ))}
    </Container>
  );
};

export default ProjectDisplay;