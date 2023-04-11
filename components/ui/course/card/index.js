import Image from "next/image";
//without loading the entire browser you can navigate the browser
import Link from "next/link";

export default function CourseCard({ course, disabled, Footer }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="flex h-full">
        {/* Items defined as flex-1 inside container will take same space */}
        <div className="flex-1 h-full next-image-wrapper">
          <Image
            className={`object-cover ${disabled && "filter grayscale"}`}
            src={course.coverImage}
            layout="fit"
            width="200"
            height="230"
            alt={course.title}
          />
        </div>
        <div className="p-8 pb-4 flex-2">
          <div className="uppercase tracking-wide text-sm xs:text-sm text-indigo-500 font-semibold">
            {course.type}
          </div>
          <Link
            href={`/courses/${course.slug}`}
            className="h-12 block mt-1 text-sm xs:text-sm leading-tight font-medium text-black hover:underline"
          >
            {course.title}
          </Link>
          <p className="mt-2 text-sm text-gray-500 xs:text-xs">
            {course.description.substring(0, 70)}...
          </p>
          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
}
