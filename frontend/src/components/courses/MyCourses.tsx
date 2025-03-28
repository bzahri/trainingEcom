import { useState, useEffect } from "react";
import { Container, Title, Card, Text, Loader, Alert, Stack } from "@mantine/core";
import { useAuth } from "../../context/AuthContext"; // Assure-toi que le contexte d'authentification est bien utilisé
import { IconAlertCircle } from "@tabler/icons-react";

type Course = {
  _id: string;
  title: string;
  subject: string;
  level: string;
};

const MyCourses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user) {
        setError("Vous devez être connecté pour voir vos cours.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5000/api/courses/mycourses`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des cours.");
        }

        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError("Impossible de récupérer les cours.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user]);

  return (
    <Container size="sm" py={40}>
      <Title order={2} mb="lg" ta="center">Mes Cours Inscrits</Title>

      {loading && <Loader size="xl" my="xl" mx="auto" />}
      
      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Erreur" color="red" mb="lg">
          {error}
        </Alert>
      )}

      {!loading && courses.length === 0 && (
        <Alert title="Aucun cours trouvé" color="gray">
          Vous n'êtes inscrit à aucun cours pour le moment.
        </Alert>
      )}

      <Stack>
        {courses.map((course) => (
          <Card key={course._id} shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3}>{course.title}</Title>
            <Text size="sm" color="dimmed">
              {course.subject} - Niveau : {course.level}
            </Text>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

export default MyCourses;
