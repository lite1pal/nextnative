import Link from "next/link";

const sections = [
  {
    title: "Buttons",
    href: "/components/buttons",
    description: "Copy-paste mobile button patterns with previews and code.",
  },
  {
    title: "Screens",
    href: "/components/screens",
    description: "Full mobile screens and layouts (onboarding, pricing, etc.).",
  },
  // add more: Inputs, Modals, Tabs...
];

export default function ComponentsPage() {
  return (
    <div className="py-12">
      <div className="mx-auto max-w-[1200px] px-4">
        {/* Header */}
        <header className="mb-10 max-w-2xl">
          <h1 className="text-4xl font-[600] tracking-tight text-gray-900">
            Mobile UI components
          </h1>
          <p className="mt-3 text-base leading-relaxed text-gray-700">
            Browse production-ready UI patterns for mobile apps built with React
            + Tailwind. Each section includes live previews and copy-paste code.
          </p>
        </header>

        {/* Grid */}
        <section aria-label="Component categories">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-2xl border border-gray-200 bg-white p-5 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {s.title}
                  </h2>
                  <span className="text-sm text-gray-500 group-hover:text-gray-700">
                    →
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {s.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
