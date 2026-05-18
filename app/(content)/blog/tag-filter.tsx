import Link from "next/link";

export default function TagFilter({ tags, currentTag }: { tags: string[]; currentTag?: string }) {
  const active = currentTag ? currentTag : "all";

  const basePill =
    "inline-flex cursor-pointer lowercase items-center rounded-2xl px-4 py-2 text-sm font-medium " +
    "transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 " +
    "bg-[#CDEBFF] text-black";

  const activePill =
    "bg-primary text-white";

  return (
    <div className="flex flex-wrap gap-3">
      <Link
        href="/blog"
        className={`${basePill} ${active === "all" ? activePill : ""}`}
      >
        All
      </Link>

      {tags.filter((tag) => !tag.includes("-")).map((tag) => (
        <Link
          key={tag}
          href={`/blog/category/${encodeURIComponent(tag.replaceAll(" ", "-").toLowerCase())}`}
          className={`${basePill} ${active === tag ? activePill : ""}`}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
}
