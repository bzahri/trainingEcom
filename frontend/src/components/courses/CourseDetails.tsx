import { useEffect, useState } from "react";

type CourseDetailsProps = {
  id: string;
  courseTitle: string;  // Ajout de courseTitle dans les props
};

type Course = {
  _id: string;
  title: string;
  description: string;
  teacher: { username: string };
  students: { username: string }[];
};

const CourseDetails = ({ id, courseTitle }: CourseDetailsProps) => {
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((res) => res.json())
      .then(setCourse)
      .catch(console.error);
  }, [id]);

  if (!course) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{courseTitle}</h2> {/* Affichage du titre du cours */}
      <p>{course.description}</p>
      <p>Enseignant: {course.teacher.username}</p>
      <h3>Étudiants inscrits</h3>
      <ul>
        {course.students.map((student) => (
          <li key={student.username}>{student.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default CourseDetails;
