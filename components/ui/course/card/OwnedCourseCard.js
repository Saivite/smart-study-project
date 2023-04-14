import Image from "next/image";

export const STATE_COLORS = {
  Purchased: "indigo",
  Activated: "green",
  Deactivated: "red",
};

export default function OwnedCourseCard({ children, course }) {
  const stateColor = STATE_COLORS[course.state];
  return (
    <div className="bg-white border shadow overflow-hidden sm:rounded-lg mb-3">
      <div className="block xs:flex">
        <div className="flex-1 ">
          <div className="h-full object-cover">
            <Image
              className="object-cover"
              src={course.coverImage}
              layout="fill"
            />
          </div>
        </div>
        <div className="flex-4">
          <div className="px-5 py-5 sm:px-6">
            <h3 className="text-lg  leading-6 font-medium text-gray-900">
              <span className="mr-2">{course.title}</span>
              <span
                className={`text-xs rounded-full text-${
                  stateColor != null && stateColor
                }-700 bg-${stateColor != null && stateColor}-200 p-2`}
              >
                {course.state}
              </span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {course.price}
            </p>
          </div>

          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 ">
                <dt className="text-sm font-medium text-gray-500">Course ID</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.ownedCourseId}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 ">
                <dt className="text-sm font-medium text-gray-500">Proof</dt>
                <dd className="break-words md:break-normal mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {course.proof}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
