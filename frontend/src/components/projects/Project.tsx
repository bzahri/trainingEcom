
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Title, Text, Image, Badge, Group, Stack, Card, Button, Modal, TextInput, MultiSelect, Space } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import axios from "axios";

// Définition du type pour le projet
interface Project {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  details: string[];
  slug: string;
}

const API_URL = "http://localhost:5000/api/project";

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [opened, setOpened] = useState(false); // État pour ouvrir/fermer le modal
  const [newTitle, setNewTitle] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newTechnologies, setNewTechnologies] = useState<string[]>([]);
  const [newDetails, setNewDetails] = useState<string[]>([]);

  useEffect(() => {
    axios.get(`${API_URL}/${slug}`).then((response) => {
      const projectData = response.data;
      setProject(projectData);
      // Initialiser les états avec les valeurs actuelles du projet
      setNewTitle(projectData.title);
      setNewDescription(projectData.description);
      setNewImages(projectData.images);
      setNewTechnologies(projectData.technologies);
      setNewDetails(projectData.details);
    });
  }, [slug]);

  if (!project) return <Text>Chargement...</Text>;

  const handleEditClick = () => {
    setOpened(true); // Ouvre le modal
  };

  const handleSaveChanges = () => {
    const updatedProject = {
      title: newTitle,
      description: newDescription,
      images: newImages,
      technologies: newTechnologies,
      details: newDetails,
    };

    // Envoie les modifications au backend
    axios.put(`${API_URL}/${slug}`, updatedProject).then(() => {
      // Met à jour le projet avec les nouvelles valeurs
      setProject((prevProject) => {
        if (!prevProject) return prevProject; // Vérification de l'existence du projet
        return { ...prevProject, ...updatedProject };
      });
      setOpened(false); // Ferme le modal
    });
  };

  return (
    <>
      <Container size="md" py="xl">
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Card.Section>
            <Carousel slideSize="100%" height={150} withIndicators loop>
              {project.images.map((img: string, index: number) => (
                <Carousel.Slide key={index}>
                  <Image src={img} height={150} alt={project.title} fit="cover" radius="md" />
                </Carousel.Slide>
              ))}
            </Carousel>
          </Card.Section>

          <Stack mt="md">
            <Title order={2}>{project.title}</Title>
            <Text size="lg" color="dimmed">{project.description}</Text>
          </Stack>

          <Title order={3} mt="lg">Technologies utilisées</Title>
          <Group mt="sm">
            {project.technologies.map((tech: string, index: number) => (
              <Badge key={index} variant="light">{tech}</Badge>
            ))}
          </Group>

          <Title order={3} mt="lg">Détails</Title>
          <Stack mt="sm">
            {project.details.map((detail: string, index: number) => (
              <Text key={index} size="sm">• {detail}</Text>
            ))}
          </Stack>

          <Button mt="xl" color="blue" onClick={handleEditClick}>
            Modifier
          </Button>
        </Card>
      </Container>
      <Space h="xl" />
      {/* Modal pour modifier le projet */}
      <Modal opened={opened} onClose={() => setOpened(false)} title="Modifier le projet">
        <TextInput
          label="Nouveau titre"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <TextInput
          label="Nouvelle description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          mt="md"
        />
        <TextInput
          label="Nouvelles images (séparées par des virgules)"
          value={newImages.join(", ")}
          onChange={(e) => setNewImages(e.target.value.split(", ").map((img) => img.trim()))}
          mt="md"
        />
        <MultiSelect
          label="Technologies"
          data={['React', 'Node.js', 'Python', 'Java', 'C++']} // Exemple de technologies disponibles
          value={newTechnologies}
          onChange={setNewTechnologies}
          mt="md"
        />
        <TextInput
          label="Détails supplémentaires (séparés par des virgules)"
          value={newDetails.join(", ")}
          onChange={(e) => setNewDetails(e.target.value.split(", ").map((detail) => detail.trim()))}
          mt="md"
        />
        <Button mt="md" onClick={handleSaveChanges}>
          Enregistrer les modifications
        </Button>
      </Modal>
    </>
  );
};

export default ProjectDetails;
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Container, Title, Text, Image, Badge, Group, Stack, Card, Button, Modal, TextInput, MultiSelect, FileInput } from "@mantine/core";
// import { Carousel } from "@mantine/carousel";
// import axios from "axios";

// // Définition du type pour le projet
// interface Project {
//   title: string;
//   description: string;
//   images: string[];
//   technologies: string[];
//   details: string[];
//   slug: string;
// }

// const API_URL = "http://localhost:5000/api/project";

// const ProjectDetails = () => {
//   const { slug } = useParams();
//   const [project, setProject] = useState<Project | null>(null);
//   const [opened, setOpened] = useState(false); // État pour ouvrir/fermer le modal
//   const [newTitle, setNewTitle] = useState<string>("");
//   const [newDescription, setNewDescription] = useState<string>("");
//   const [newImages, setNewImages] = useState<File[]>([]); // Gestion des fichiers images
//   const [newTechnologies, setNewTechnologies] = useState<string[]>([]);
//   const [newDetails, setNewDetails] = useState<string[]>([]);

//   useEffect(() => {
//     axios.get(`${API_URL}/${slug}`).then((response) => {
//       const projectData = response.data;
//       setProject(projectData);
//       // Initialiser les états avec les valeurs actuelles du projet
//       setNewTitle(projectData.title);
//       setNewDescription(projectData.description);
//       setNewImages([]); // Réinitialiser les images
//       setNewTechnologies(projectData.technologies);
//       setNewDetails(projectData.details);
//     });
//   }, [slug]);

//   if (!project) return <Text>Chargement...</Text>;

//   const handleEditClick = () => {
//     setOpened(true); // Ouvre le modal
//   };

//   const handleSaveChanges = () => {
//     // Convertir les fichiers en URLs (si vous utilisez un service de stockage d'images)
//     const imageUrls = newImages.map((file) => {
//       const formData = new FormData();
//       formData.append("file", file);

//       // Vous devrez probablement utiliser un service de stockage ou une API pour envoyer l'image et récupérer l'URL
//       return axios.post("http://localhost:5000/api/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       }).then((response) => response.data.url); // Exemple : récupérer l'URL de l'image
//     });

//     Promise.all(imageUrls).then((urls) => {
//       const updatedProject = {
//         title: newTitle,
//         description: newDescription,
//         images: [...project.images, ...urls], // Ajout des nouvelles images au projet existant
//         technologies: newTechnologies,
//         details: newDetails,
//       };

//       // Envoie les modifications au backend
//       axios.put(`${API_URL}/${slug}`, updatedProject).then(() => {
//         setProject((prevProject) => {
//           if (!prevProject) return prevProject; // Vérification de l'existence du projet
//           return { ...prevProject, ...updatedProject };
//         });
//         setOpened(false); // Ferme le modal
//       });
//     });
//   };

//   return (
//     <>
//       <Container size="md" py="xl">
//         <Card shadow="sm" padding="lg" radius="md" withBorder>
//           <Card.Section>
//             <Carousel slideSize="100%" height={300} withIndicators loop>
//               {project.images.map((img: string, index: number) => (
//                 <Carousel.Slide key={index}>
//                   <Image src={img} height={300} alt={project.title} fit="cover" radius="md" />
//                 </Carousel.Slide>
//               ))}
//             </Carousel>
//           </Card.Section>

//           <Stack mt="md">
//             <Title order={2}>{project.title}</Title>
//             <Text size="lg" color="dimmed">{project.description}</Text>
//           </Stack>

//           <Title order={3} mt="lg">Technologies utilisées</Title>
//           <Group mt="sm">
//             {project.technologies.map((tech: string, index: number) => (
//               <Badge key={index} variant="light">{tech}</Badge>
//             ))}
//           </Group>

//           <Title order={3} mt="lg">Détails</Title>
//           <Stack mt="sm">
//             {project.details.map((detail: string, index: number) => (
//               <Text key={index} size="sm">• {detail}</Text>
//             ))}
//           </Stack>

//           <Button mt="xl" color="blue" onClick={handleEditClick}>
//             Modifier
//           </Button>
//         </Card>
//       </Container>

//       {/* Modal pour modifier le projet */}
//       <Modal opened={opened} onClose={() => setOpened(false)} title="Modifier le projet">
//         <TextInput
//           label="Nouveau titre"
//           value={newTitle}
//           onChange={(e) => setNewTitle(e.target.value)}
//         />
//         <TextInput
//           label="Nouvelle description"
//           value={newDescription}
//           onChange={(e) => setNewDescription(e.target.value)}
//           mt="md"
//         />
//         <FileInput
//           label="Télécharger de nouvelles images"
//           value={newImages}
//           onChange={setNewImages}
//           multiple
//           accept="image/*"
//           mt="md"
//         />
//         <MultiSelect
//           label="Technologies"
//           data={['React', 'Node.js', 'Python', 'Java', 'C++']} // Exemple de technologies disponibles
//           value={newTechnologies}
//           onChange={setNewTechnologies}
//           mt="md"
//         />
//         <TextInput
//           label="Détails supplémentaires (séparés par des virgules)"
//           value={newDetails.join(", ")}
//           onChange={(e) => setNewDetails(e.target.value.split(", ").map((detail) => detail.trim()))}
//           mt="md"
//         />
//         <Button mt="md" onClick={handleSaveChanges}>
//           Enregistrer les modifications
//         </Button>
//       </Modal>
//     </>
//   );
// };

// export default ProjectDetails;
