import Link from "next/link";

type Props = {
  items: { label: string; href: string }[];
};

export function Breadcrumbs({ items }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm">
      <ol className="flex space-x-2 p-0! m-0!">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center">
            <Link
              href={item.href}
              className="hover:underline text-gray-800 truncate font-medium"
            >
              {item.label}
            </Link>
            {idx < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
