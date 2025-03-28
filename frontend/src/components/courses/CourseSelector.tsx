import { useEffect, useState } from "react";
import { Select, Loader, Alert, Card } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import axios from "axios";
import CourseStudentList from "./CourseStudentList";

interface Course {
    _id: string;
    title: string;
}

const CourseSelector = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
    const [selectedCourseTitle, setSelectedCourseTitle] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/courses");

                const data = response.data;
                console.log(Array.isArray(data) ? data : data.courses);
                setCourses(Array.isArray(data) ? data : data.courses || []);
            } catch (err) {
                setError("Impossible de récupérer les cours.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleCourseChange = (courseId: string | null) => {
        setSelectedCourseId(courseId);

        // Trouver le titre du cours sélectionné
        const selectedCourse = courses.find(course => course._id === courseId);
        setSelectedCourseTitle(selectedCourse ? selectedCourse.title : null);
    };

    if (loading) return <Loader color="blue" />;
    if (error)
        return (
            <Alert icon={<IconAlertCircle size="1rem" />} title="Erreur" color="red">
                {error}
            </Alert>
        );

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Select
                label="Sélectionner un cours"
                placeholder="Choisissez un cours"
                data={courses
                    .filter(course => course && course._id && course.title) // Évite les valeurs nulles/undefined
                    .map(course => ({ value: course._id, label: course.title }))
                }
                onChange={handleCourseChange}
                clearable
            />
            {selectedCourseId && selectedCourseTitle && (
                <CourseStudentList courseId={selectedCourseId} courseTitle={selectedCourseTitle} />
            )}
        </Card>
    );
};

export default CourseSelector;
