//each course page is rendered by slug
import { useAccount, useOwnedCourse } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message, Modal } from "@components/ui/common";
import { CourseHero, Curriculum, Keypoints } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { getAllCourses } from "@content/courses/fetcher";
import Link from "next/link";

export default function Course({ course }) {
  const { isLoading } = useWeb3();
  const { account } = useAccount();
  const { ownedCourse } = useOwnedCourse(course, account.data);
  // if (ownedCourse.data.state) {
  //   const courseState = ownedCourse.data.state;
  // }
  const courseState = ownedCourse.data?.state;
  console.log(courseState);
  // console.log(ownedCourse.data.state);
  // const courseState = "Activated";

  const isLocked =
    //if there is no courseState, then also course is locked
    !courseState || courseState == "Purchased" || courseState == "Deactivated";

  return (
    <>
      <div className="py-4">
        {/*------ HERO STARTS ------*/}
        <CourseHero
          //!!null = false, !!{} = true
          hasOwner={!!ownedCourse.data}
          title={course.title}
          description={course.description}
          image={course.coverImage}
        />
        {/*------ HERO ENDS ------*/}
      </div>
      {/*------ KEYPOINT STARTS ------*/}
      <Keypoints points={course.wsl} />
      {courseState && (
        <div className=" max-w-5xl mx-auto">
          {courseState === "Purchased" && (
            <Message type="warn">
              Thank You for Purchasing the Course. Your learning is in the
              process of activation. Process can take up to 24 hours.
              <i className="block font-normal">
                In case of any questions, please contact:
              </i>
              <a href="mailto:saivite@outlook.in">saivite@outlook.in</a>
            </Message>
          )}
          {courseState === "Activated" && (
            <Message type="success">
              Instructor wishes you happy learning.
              <i className="block font-normal">
                In case of any questions, please contact:
              </i>
              <a href="mailto:saivite@outlook.in">saivite@outlook.in</a>
            </Message>
          )}
          {courseState === "Deactivated" && (
            <Message type="danger">
              Course is deactivated due to discrepancy in order data. Access to
              course is disabled.
              <i className="block font-normal">
                Please contact: saivite@outlook.in
              </i>
            </Message>
          )}
        </div>
      )}
      {/*------ KEYPOINT ENDS ------*/}
      {/*------ LECTURES STARTS ------*/}
      <Curriculum
        isLoading={isLoading}
        locked={isLocked}
        courseState={courseState}
      />
      {/*------ LECTURES ENDS ------*/}
      {/* MODAL STARTS */}
      <Modal />
      {/* MODAL ENDS */}
    </>
  );
}

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
