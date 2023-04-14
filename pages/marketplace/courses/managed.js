import { useAdmin, useManagedCourses } from "@components/hooks/web3";
import { useWeb3 } from "@components/providers";
import { Button, Message } from "@components/ui/common";
import { CourseFilter, ManagedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";
import { useState } from "react";

const VerificationInput = ({ onVerify }) => {
  const [email, setEmail] = useState("");
  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        //this will give email to the state
        onChange={({ target: { value } }) => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 pl-7 p-4 sm:text-sm border-gray-300 rounded-md "
        placeholder="0x2341ab..."
      />
      <Button
        onClick={() => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};

export default function ManagedCourses() {
  const [proofOwnership, setProofOwnership] = useState({});
  const { account } = useAdmin({ redirectTo: "/marketplace" });
  const { managedCourses } = useManagedCourses(account);
  const { web3, contract } = useWeb3();

  const verifyCourse = (email, { hash, proof }) => {
    //email + hash(courseHash) = Proof
    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      {
        type: "bytes32",
        value: emailHash,
      },
      {
        type: "bytes32",
        value: hash,
      }
    );
    proofToCheck == proof
      ? setProofOwnership({
          //to keep the previous states of courses verified or not
          ...proofOwnership,
          [hash]: true,
        })
      : setProofOwnership({
          ...proofOwnership,
          [hash]: false,
        });
  };

  const changeCourseState = async (courseHash, method) => {
    try {
      //to access value dynamically, we use [] instead of . notation
      await contract.methods[method](courseHash).send({ from: account.data });
    } catch (e) {
      console.error(e.message);
    }
  };

  const activateCourse = (courseHash) => {
    changeCourseState(courseHash, "activateCourse");
  };

  if (!account.isAdmin) {
    return null;
  }

  const deactivateCourse = async (courseHash) => {
    changeCourseState(courseHash, "deactivateCourse");
  };

  return (
    <>
      <MarketHeader />
      <CourseFilter />
      <section className="grid grid-cols-1">
        {managedCourses.data?.map((course) => (
          <ManagedCourseCard key={course.ownedCourseId} course={course}>
            <VerificationInput
              onVerify={(email) => {
                verifyCourse(email, {
                  hash: course.hash,
                  proof: course.proof,
                });
              }}
            />
            {proofOwnership[course.hash] && (
              <div className="mt-2">
                <Message type="success">Verified!</Message>
              </div>
            )}
            {proofOwnership[course.hash] == false && (
              <div className="mt-2">
                <Message type="danger">Wrong Proof!</Message>
              </div>
            )}
            {course.state == "Purchased" && (
              <div className="mt-2">
                <Button
                  onClick={() => activateCourse(course.hash)}
                  variant="green"
                >
                  Activate
                </Button>
                <Button
                  onClick={() => deactivateCourse(course.hash)}
                  variant="red"
                >
                  Deactivate
                </Button>
              </div>
            )}
          </ManagedCourseCard>
        ))}
      </section>
    </>
  );
}

ManagedCourses.Layout = BaseLayout;
