import { CourseCard, CourseList } from "@components/ui/course";
import { getAllCourses } from "@content/courses/fetcher";
import { BaseLayout } from "@components/ui/layout";
import {
  useAccount,
  useOwnedCourses,
  useWalletInfo,
} from "@components/hooks/web3";
import { Button, Loader } from "@components/ui/common";
import { OrderModal } from "@components/ui/order";
import { useState } from "react";
import { MarketHeader } from "@components/ui/marketplace";
import { useWeb3 } from "@components/providers";
export default function Marketplace({ courses }) {
  const { account, hasConnectedWallet, isConnecting } = useWalletInfo();
  //for showing different button if course is already purchased
  const { ownedCourses } = useOwnedCourses(courses, account.data);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const { web3, contract, requireInstall } = useWeb3();

  const purchaseCourse = async (order) => {
    //course in hexa decimal

    // hex course id:
    // 0x31343130343734000000000000000000
    // address
    // 0x0Df6314ccb1715C6F3BEcF62119216e01663C9cA

    // 313431303437340000000000000000000Df6314ccb1715C6F3BEcF62119216e01663C9cA

    const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);

    //course proof -  emailHash +  courseHash
    //soliditySha3 is same as keccak256
    const orderHash = web3.utils.soliditySha3(
      { type: "bytes16", value: hexCourseId },
      { type: "address", value: account.data }
    );

    const emailHash = web3.utils.sha3(order.email);

    const proof = web3.utils.soliditySha3(
      { type: "bytes32", value: emailHash },
      { type: "bytes32", value: orderHash }
    );

    const value = web3.utils.toWei(String(order.price));

    try {
      const result = await contract.methods
        .purchaseCourse(
          //order id, proof
          hexCourseId,
          proof
          //specify from which account we're sending
        )
        .send({ from: account.data, value });
      console.log(result);
    } catch (error) {
      console.error("Purchase Course: Operation has failed. ");
    }
  };

  return (
    <>
      <div className="py-4">
        <MarketHeader />
      </div>
      <CourseList courses={courses}>
        {(course) => (
          <CourseCard
            key={course.id}
            course={course}
            disabled={!hasConnectedWallet}
            Footer={() => {
              if (requireInstall) {
                return (
                  <Button size="sm" disabled={true} variant="lightPurple">
                    Install
                  </Button>
                );
              }
              if (isConnecting) {
                return (
                  <div className="mt-4">
                    <Button size="sm" disabled={true} variant="lightPurple">
                      <Loader size="sm" />
                    </Button>
                  </div>
                );
              }

              if (!ownedCourses.hasInitialResponse) {
                return (
                  <div className="mt-4">
                    <Button size="sm" disabled={true} variant="lightPurple">
                      Loading State
                    </Button>
                  </div>
                );
              }

              const owned = ownedCourses.lookup[course.id];
              if (owned) {
                return (
                  <>
                    <div className="mt-4 mb-2">
                      <Button size="sm" disabled={true} variant="green">
                        Owned
                      </Button>
                      {owned.state == "Deactivated" && (
                        <Button
                          size="sm"
                          disabled={false}
                          onClick={() => alert("Reactivating")}
                          variant="purple"
                        >
                          Reactivate
                        </Button>
                      )}
                    </div>
                    {owned.state == "Purchased" && (
                      <span
                        className={`text-xs rounded-full text-yellow-700 bg-yellow-200 p-2`}
                      >
                        Pending
                      </span>
                    )}
                    {owned.state == "Activated" && (
                      <span
                        className={`text-xs rounded-full text-green-700 bg-green-200 p-2`}
                      >
                        {owned.state}
                      </span>
                    )}
                    {owned.state == "Deactivated" && (
                      <span
                        className={`text-xs rounded-full text-red-700 bg-red-200 p-2`}
                      >
                        {owned.state}
                      </span>
                    )}
                  </>
                );
              }

              return (
                <div className="mt-4">
                  <Button
                    //this will mutate the instance and course will be received in selectedCourse variable and we can pass it as a prop to the modal
                    onClick={() => setSelectedCourse(course)}
                    size="sm"
                    disabled={!hasConnectedWallet}
                    variant="lightPurple"
                  >
                    Purchase
                  </Button>
                </div>
              );
            }}
          />
        )}
      </CourseList>
      {selectedCourse && (
        <OrderModal
          onSubmit={purchaseCourse}
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
