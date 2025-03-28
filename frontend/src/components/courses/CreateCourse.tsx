import { useState, useEffect } from "react";
import { Select, TextInput, Textarea, Button, Container, Stack, Title, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

const CreateCourse = () => {
  const [form, setForm] = useState({ title: "", description: "", teacher: "" });
  const [teachers, setTeachers] = useState<{ label: string, value: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Récupérer la liste des professeurs
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/users/teachers");
        const data = await response.json();
        if (response.ok) {
          // Assurer que chaque professeur a un label et un value approprié
          const teacherOptions = data.map((teacher: { _id: string, username: string }) => ({
            label: teacher.username,
            value: teacher._id,
          }));
          setTeachers(teacherOptions);
        } else {
          throw new Error(data.error || "Erreur de récupération des professeurs");
        }
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value: string | null) => {
    setForm({ ...form, teacher: value || "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("Cours créé avec succès !");
        setForm({ title: "", description: "", teacher: "" }); // Reset the form
      } else {
        throw new Error("Erreur lors de la création du cours");
      }
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm" py={40}>
      <Title order={2} mb="lg" ta="center">Créer un cours</Title>

      {error && (
        <Alert icon={<IconAlertCircle size="1rem" />} title="Erreur" color="red" mb="lg">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            name="title"
            label="Titre du cours"
            placeholder="Entrez le titre du cours"
            value={form.title}
            onChange={handleChange}
            required
          />
          <Textarea
            name="description"
            label="Description du cours"
            placeholder="Entrez une description du cours"
            value={form.description}
            onChange={handleChange}
            required
            minRows={4}
          />
          <Select
            label="Choisir un professeur"
            value={form.teacher}
            onChange={handleSelectChange}
            data={teachers}
            placeholder="Sélectionnez un professeur"
            required
          />
          <Button type="submit" fullWidth mt="xl" size="md" loading={loading}>
            {loading ? "Création en cours..." : "Créer le cours"}
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

export default CreateCourse;
