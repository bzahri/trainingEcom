import { Container, Title, Text, Image, Grid, Badge, Group, Loader, Center } from '@mantine/core';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ProjectData {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  details: string[];
}

const Project: React.FC = () => {
  const { projectName } = useParams();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/project/${projectName}`);
        setProject(response.data);
        console.log(response);
      } catch (error) {
        console.error("Erreur lors de la récupération du projet", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProject();
  }, [projectName]);

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!project) {
    return (
      <Container size="md" py="xl">
        <Title order={1} >Projet non trouvé</Title>
        <Text >Le projet que vous cherchez n'existe pas.</Text>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl">
      <Title order={1} >{project.title}</Title>
      <Text  mt="sm">{project.description}</Text>

      <Grid mt="xl">
        {project.images.map((src, index) => (
          <Grid.Col key={index} span={4}>
            <Image src={src} alt={`Project image ${index + 1}`} radius="md" />
          </Grid.Col>
        ))}
      </Grid>

      <Title order={2} mt="xl">Technologies utilisées</Title>
      <Group mt="md">
        {project.technologies.map((tech, index) => (
          <Badge key={index} variant="outline" size="lg">{tech}</Badge>
        ))}
      </Group>

      <Title order={2} mt="xl">Détails du projet</Title>
      {project.details.map((detail, index) => (
        <Text key={index} mt="sm">• {detail}</Text>
      ))}
    </Container>
  );
};

export default Project;
// import { Container, Title, Text, Image, Grid, Card, Badge, Group } from '@mantine/core';
// import { useParams } from 'react-router-dom';
// import React from 'react';

// const projectData: Record<string, any> = {
//   "mon-projet": {
//     title: "Mon Projet",
//     description: "Ceci est une description détaillée du projet. Il s'agit d'un projet innovant qui résout un problème particulier.",
//     images: [
//       "1.jpg","1.jpg","1.jpg"   
//     ],
//     technologies: ["React", "TypeScript", "Mantine", "Node.js"],
//     details: [
//       "Développement frontend avec React et TypeScript.",
//       "Utilisation de Mantine pour le design UI.",
//       "Backend construit avec Node.js et Express.",
//       "Base de données gérée avec MongoDB."
//     ]
//   }
// };

// const Project: React.FC = () => {
//   const { projectName } = useParams<{ projectName: string }>();
//   const project = projectData[projectName || "mon-projet"];

//   if (!project) {
//     return (
//       <Container size="md" py="xl">
//         <Title order={1} >Projet non trouvé</Title>
//         <Text >Le projet que vous cherchez n'existe pas.</Text>
//       </Container>
//     );
//   }

//   return (
//     <Container size="md" py="xl">
//       <Title order={1} >{project.title}</Title>
//       <Text  mt="sm">{project.description}</Text>

//       <Grid mt="xl">
//         {project.images.map((src: string, index: number) => (
//           <Grid.Col key={index} span={4}>
//             <Image src={src} alt={`Project image ${index + 1}`} radius="md" />
//           </Grid.Col>
//         ))}
//       </Grid>

//       <Title order={2} mt="xl">Technologies utilisées</Title>
//       <Group mt="md">
//         {project.technologies.map((tech: string, index: number) => (
//           <Badge key={index} variant="outline" size="lg">{tech}</Badge>
//         ))}
//       </Group>

//       <Title order={2} mt="xl">Détails du projet</Title>
//       {project.details.map((detail: string, index: number) => (
//         <Text key={index} mt="sm">• {detail}</Text>
//       ))}
//     </Container>
//   );
// };

// export default Project;


