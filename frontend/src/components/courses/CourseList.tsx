import React, { useEffect, useState } from 'react';
import { Card, Text, Group, Badge, Button, Loader, Container, Grid, Select } from '@mantine/core';

type Course = {
  _id: string;
  title: string;
  subject: string;
  level: string;
  teacher: { username: string };
};

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [subjectFilter, setSubjectFilter] = useState<string | null>(null);

  // Fetch courses from the backend API
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((res) => res.json())
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  // Filter courses based on the selected subject
  const filteredCourses = subjectFilter
    ? courses.filter((course) => course.subject === subjectFilter)
    : courses;

  return (
    <>
      <h2>Liste des cours</h2>

      {loading ? (
        <Loader size="xl" variant="dots" />
      ) : (
        <>
          <Group p="apart" style={{ marginBottom: 20 }}>
            <Select
              label="Filtrer par sujet"
              placeholder="Choisissez un sujet"
              data={['Mathématiques', 'Physique', 'Informatique', 'Histoire', 'Langues']}
              value={subjectFilter}
              onChange={setSubjectFilter}
            />
          </Group>

          <Grid>
            {filteredCourses.length === 0 ? (
              <Text>Aucun cours trouvé pour ce sujet.</Text>
            ) : (
              filteredCourses.map((course) => (
                <Grid.Col span={4} key={course._id}>
                  <Card shadow="sm" padding="lg">
                    <Text w={500} size="lg">{course.title}</Text>
                    <Group p="apart" style={{ marginTop: 10 }}>
                      <Badge color="blue">{course.subject}</Badge>
                      <Badge color="green">{course.level}</Badge>
                    </Group>
                    <Text size="sm" style={{ marginTop: 10 }}>
                      Professeur : {course.teacher.username}
                    </Text>
                    <Button variant="outline" fullWidth style={{ marginTop: 10 }}>
                      Voir les détails
                    </Button>
                  </Card>
                </Grid.Col>
              ))
            )}
          </Grid>
        </>
      )}
    </>
  );
};

export default CourseList;
