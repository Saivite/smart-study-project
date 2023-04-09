import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { BaseLayout } from "@components/ui/layout";
import { EthRates, WalletBar } from "@components/ui/web3";
import { useWalletInfo } from "@components/hooks/web3";
import { Breadcrumbs, Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { useEthPrice } from "@components/hooks/useEthPrice";

export default function Marketplace({ courses }) {
  const { account, network } = useWalletInfo();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { eth } = useEthPrice();

  const canPurchaseCourse = !!(account.data && network.isSupported);

  return (
    <>
      {network.data}
      <div className="pt-4">
        <WalletBar
          address={account.data}
          network={{
            data: network.data,
            target: network.target,
            isSupported: network.isSupported,
            hasInitialResponse: network.hasFinishedFirstFetch,
          }}
        />
        <EthRates eth={eth.data} ethPerItem={eth.perItem} />
        <div className="flex flex-row-reverse py-4 px-4 sm:px-6 lg:px-8">
          <Breadcrumbs />
        </div>
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!canPurchaseCourse}
            Footer={() => (
              <div className="mt-4">
                <Button
                  //this will mutate the instance and course will be received in selectedCourse variable and we can pass it as a prop to the modal
                  onClick={() => setSelectedCourse(course)}
                  disabled={!canPurchaseCourse}
                  variant="lightPurple"
                >
                  Purchase
                </Button>
              </div>
            )}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
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
