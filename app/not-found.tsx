import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center flex-1 flex-grow min-h-[300px] justify-center">
      <h2 className="text-4xl font-bold mb-4">Not Found</h2>
      <p className="text-lg mb-4">Could not find requested resource</p>
      <Link href="/" className="text-blue-500 font-bold hover:underline">
        Return Home
      </Link>
    </div>
  );
}
