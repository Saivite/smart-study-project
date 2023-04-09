import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { BaseLayout } from "@components/ui/layout";
import { EthRates, WalletBar } from "@components/ui/web3";
import { useAccount, useNetwork } from "@components/hooks/web3";
import { Button } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { useEthPrice } from "@components/hooks/useEthPrice";

export default function Marketplace({ courses }) {
  const { account } = useAccount();
  const { network } = useNetwork();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { eth } = useEthPrice();
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
            hasInitialResponse: network.hasFinishedFirstFetch,
          }}
        />
        <EthRates eth={eth.data} ethPerItem={eth.perItem} />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            Footer={() => (
              <div className="mt-4">
                <Button
                  //this will mutate the instance and course will be received in selectedCourse variable and we can pass it as a prop to the modal
                  onClick={() => setSelectedCourse(course)}
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
