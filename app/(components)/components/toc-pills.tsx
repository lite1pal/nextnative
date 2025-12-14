export function TocPills({
  items,
}: {
  items: { id: string; title: string }[];
}) {
  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((x) => (
        <a
          key={x.id}
          href={`#${x.id}`}
          className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:border-gray-300 hover:bg-gray-50"
        >
          {x.title}
        </a>
      ))}
    </nav>
  );
}
