import { Button } from "@/components/ui/button";
import Image from "next/image";

export function SplitHero() {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600 ring-1 ring-inset ring-blue-600/20 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/20">
              <span className="font-bold">New</span>
              <span>NextNative v1.0 is here</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block text-gray-900 dark:text-white">
                Develop once,
              </span>
              <span className="block text-blue-600 dark:text-blue-400">
                deploy everywhere
              </span>
            </h1>

            <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              NextNative lets you build native mobile apps using the web
              technologies you already know and love. Ship faster with a single
              codebase for web, iOS, and Android.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Start building
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
              >
                View documentation
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 overflow-hidden bg-gray-200 dark:bg-gray-700"
                  >
                    <div className="h-full w-full bg-gradient-to-br from-blue-400 to-indigo-600" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-white">
                  500+
                </span>{" "}
                developers building with NextNative
              </div>
            </div>
          </div>

          {/* Right side - Image with decorative elements */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/video-demo-1.png"
                alt="NextNative dashboard preview"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -left-8 -top-8 h-16 w-16 rounded-full bg-blue-600 blur-xl opacity-70" />
            <div className="absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-purple-600 blur-xl opacity-70" />

            {/* Feature badge floating on the image */}
            <div className="absolute -right-6 top-1/3 rounded-2xl bg-white p-4 shadow-lg dark:bg-gray-800">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    7x Faster
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Development time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SplitHero;
