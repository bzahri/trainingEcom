import { useEffect, useState } from "react";
import { Card, Text, Loader, Alert, Avatar, Group } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import axios from "axios";

interface Student {
  _id: string;
  name: string;
  email: string;
}

interface CourseStudentListProps {
  courseId: string;
  courseTitle: string;  // Ajoute courseTitle ici
}

const CourseStudentList = ({ courseId, courseTitle }: CourseStudentListProps) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}/students`);

        const data = response.data;
        setStudents(Array.isArray(data) ? data : data.students || []);
      } catch (err) {
        setError("Impossible de récupérer les étudiants.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId]);

  if (loading) return <Loader color="blue" />;
  if (error)
    return (
      <Alert icon={<IconAlertCircle size="1rem" />} title="Erreur" color="red">
        {error}
      </Alert>
    );

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg" mb="md">
        Étudiants inscrits dans {courseTitle} {/* Affiche le titre du cours */}
      </Text>

      {students.length === 0 ? (
        <Text color="dimmed">Aucun étudiant inscrit.</Text>
      ) : (
        students.map((student) => (
          <Group key={student._id} mb="sm">
            <Avatar radius="xl" />
            <div>
              <Text>{student.name}</Text>
              <Text size="sm" color="dimmed">
                {student.email}
              </Text>
            </div>
          </Group>
        ))
      )}
    </Card>
  );
};

export default CourseStudentList;
