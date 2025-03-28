import { useState, useEffect } from "react";
import { Button, Container, Stack, Title, Alert, Select } from "@mantine/core";
import { useAuth } from "../../context/AuthContext"; // Supposons que tu aies un contexte d'authentification
import { IconCircleCheck } from "@tabler/icons-react";

type Course = {
  _id: string;
  title: string;
  subject: string;
  level: string;
};

const RegisterCourse = () => {
  const { user } = useAuth(); // Utilisation du contexte d'authentification
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {

    const fetchCourses = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError("Erreur lors de la récupération des cours");
      }
    };
    fetchCourses();
  }, []);

  const handleRegister = async () => {
    const token = localStorage.getItem('token');
    if (!selectedCourse) {
      setError("Veuillez sélectionner un cours.");
      return;
    }
    
    if (!user) {
      setError("Vous devez être connecté pour vous inscrire à un cours.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/courses/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, },
        body: JSON.stringify({ courseId: selectedCourse, userId: user.id }),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setError("Erreur lors de l'inscription.");
      }
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py={40}>
      <Title order={2} mb="lg" ta="center">S'inscrire à un cours</Title>

      {error && (
        <Alert icon={<IconCircleCheck size="1rem" />} title="Erreur" color="red" mb="lg">
          {error}
        </Alert>
      )}

      {success && (
        <Alert icon={<IconCircleCheck size="1rem" />} title="Succès" color="green" mb="lg">
          Vous êtes inscrit avec succès au cours !
        </Alert>
      )}

      <Stack >
        <Select
          label="Choisissez un cours"
          placeholder="Sélectionnez un cours"
          data={courses.map((course) => ({
            label: `${course.title} (${course.subject} - ${course.level})`,
            value: course._id,
          }))}
          value={selectedCourse}
          onChange={setSelectedCourse}
        />

        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={handleRegister}
          loading={loading}
          disabled={!user || !selectedCourse}
        >
          {loading ? "Enregistrement..." : "S'inscrire"}
        </Button>
      </Stack>
    </Container>
  );
};

export default RegisterCourse;
