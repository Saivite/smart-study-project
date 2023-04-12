import { useAccount, useOwnedCourses } from "@components/hooks/web3";
import { Button, Message } from "@components/ui/common";
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { getAllCourses } from "@content/courses/fetcher";
import { useRouter } from "next/router";
import Link from "next/link";

export default function OwnedCourses({ courses }) {
  const { account } = useAccount();
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  const router = useRouter();
  return (
    <>
      <MarketHeader />
      <section className="grid grid-cols-1">
        {ownedCourses.hasInitialResponse &&
          (!ownedCourses.data || ownedCourses.data.length === 0) && (
            <div className="w-1/2">
              <Message type="warn">
                <div>You dont own any courses</div>
                <Link
                  className="font-normal hover:underline"
                  href="/marketplace"
                >
                  <i>Purchase Course</i>
                </Link>
              </Message>
            </div>
          )}
        {ownedCourses.data &&
          ownedCourses.data.map((course) => (
            //we need to pass key as we're iterating
            <OwnedCourseCard key={course.id} course={course}>
              <Button onClick={() => router.push(`/courses/${course.slug}`)}>
                Watch The Course
              </Button>
            </OwnedCourseCard>
          ))}
      </section>
    </>
  );
}

//get all the courses
export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

OwnedCourses.Layout = BaseLayout;
