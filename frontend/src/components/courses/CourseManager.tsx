import CourseList from "./CourseList";
import CourseSelector from "./CourseSelector";
import CourseStudentList from "./CourseStudentList";
import CreateCourse from "./CreateCourse";
import MyCourses from "./MyCourses";
import RegisterCourse from "./RegisterCourse";

const CourseManager = () => {
    return <>
        <CourseSelector />
        <RegisterCourse />
        <MyCourses />
        <CreateCourse />
        <CourseList />

    </>
}

export default CourseManager;