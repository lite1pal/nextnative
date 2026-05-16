import Link from "next/link";
import BlogHeading from "../../blog-heading";

export default function TagNotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
      <BlogHeading />

      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">Tag Not Found</h1>
        <p className="mb-8 text-lg text-gray-600">
          Sorry, we couldn't find any posts with the specified tag.
        </p>

        <Link
          href="/blog"
          className="bg-primary hover:bg-primary/90 focus:ring-primary inline-flex items-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white focus:ring-2 focus:ring-offset-2 focus:outline-none"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
