//without loading the entire browser you can navigate the browser
import CourseCard from "@components/ui/course/card";

//children will be course.id from outside
export default function List({ courses, children }) {
  return (
    <section className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
      {courses.map((course) => children(course))}
    </section>
  );
}
