import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Title, Text, Image } from "@mantine/core";
import axios from "axios";

const API_URL = "http://localhost:5000/api/project";

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    axios.get(`${API_URL}/${slug}`).then((response) => setProject(response.data));
  }, [slug]);

  if (!project) return <Text>Chargement...</Text>;

  return (
    <Container>
      <Title order={2}>{project.title}</Title>
      <Text size="lg">{project.description}</Text>
      {project.images.map((img: string, index: number) => (
        <Image key={index} src={img} alt={project.title} mt="md" />
      ))}
      <Title order={3} mt="lg">Technologies utilisées</Title>
      <Text>{project.technologies.join(", ")}</Text>
      <Title order={3} mt="lg">Détails</Title>
      <Text>{project.details.join(", ")}</Text>
    </Container>
  );
};

export default ProjectDetails;
