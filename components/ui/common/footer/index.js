import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 pt-1">
      <div className="container mx-auto px-6">
        <div className="mt-5 flex flex-col items-center">
          <div className="py-6">
            <div className="mb-6 text-white text-sm text-primary-2 font-bold"></div>
            <Link
              className="mb-6 text-white text-sm text-primary-2 font-bold"
              target="_blank"
              href="https://bento.me/saivite"
            >
              {true && `made with <3 by Saivite`}
            </Link>
            <p className="mt-6 px-12 text-white text-sm text-primary-2 font-bold">
              © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
