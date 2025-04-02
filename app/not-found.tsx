import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600 mt-4">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 mt-2">The page you are looking for doesn’t exist.</p>
      <Link href="/">
        <button className="mt-6 px-6 py-3  primary-btn rounded-lg shadow-md transition">
          Go Back Home
        </button>
      </Link>
    </div>
  );
}
