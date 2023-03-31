//each course page is rendered by slug
import { Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";

export default function Course({ course }) {
  return (
    <>
      <div className="py-4">
        {/*------ HERO STARTS ------*/}
        <CourseHero
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
        {/*------ HERO ENDS ------*/}
      </div>

      {/*------ KEYPOINT STARTS ------*/}
      <Keypoints points={course.wsl} />
      {/*------ KEYPOINT ENDS ------*/}

      {/*------ LECTURES STARTS ------*/}
      <Curriculum locked={true} />
      {/*------ LECTURES ENDS ------*/}

      {/* MODAL STARTS */}
      <Modal />
      {/* MODAL ENDS */}
    </>
  );
}

//for how many pages we would like to create and what parameters we would return to getStaticProps() for every page
export function getStaticPaths() {
  const { data } = getAllCourses();
  return {
    //it will be array of all the paths to render
    paths: data.map((c) => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: false,
  };
}

//whatever is returned from above function will enter into params
export function getStaticProps({ params }) {
  const { data } = getAllCourses();
  //it will return an array, so get item [0]
  const course = data.filter((c) => c.slug === params.slug)[0];
  return {
    props: {
      course,
    },
  };
}

Course.Layout = BaseLayout;
