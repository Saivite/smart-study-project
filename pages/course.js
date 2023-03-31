import { Modal } from "@components/common";
import { CourseHero, Curriculum, Keypoints } from "@components/course";
import { BaseLayout } from "@components/layout";

export default function Course() {
  return (
    <>
      <div className="py-4">
        {/*------ HERO STARTS ------*/}
        <CourseHero />
        {/*------ HERO ENDS ------*/}
      </div>

      {/*------ KEYPOINT STARTS ------*/}
      <Keypoints />
      {/*------ KEYPOINT ENDS ------*/}

      {/*------ LECTURES STARTS ------*/}
      <Curriculum />
      {/*------ LECTURES ENDS ------*/}

      {/* MODAL STARTS */}
      <Modal />
      {/* MODAL ENDS */}
    </>
  );
}

Course.Layout = BaseLayout;
