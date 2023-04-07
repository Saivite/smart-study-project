import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { BaseLayout } from "@components/ui/layout";
import { WalletBar } from "@components/ui/web3";
import { useAccount } from "@components/hooks/web3/useAccount";
import { useNetwork } from "@components/hooks/web3/useNetwork";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  return (
    <>
      {network.data}
      <div className="py-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
          }}
        />
      </div>
      <CourseList courses={courses}>
        {(course) => <CourseCard key={course.id} course={course} />}
      </CourseList>
    </>
  );
}

//through getStaticProps() we can fetch data during build time and we can provide data to the page through props

export function getStaticProps() {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
}

Marketplace.Layout = BaseLayout;
