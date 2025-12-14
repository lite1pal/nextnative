import type { UiItem } from "./types";

export function ButtonsJsonLd({ items }: { items: UiItem[] }) {
  const baseUrl = "https://nextnative.dev/components/buttons";

  const graph = items.map((it) => ({
    "@type": "SoftwareSourceCode",
    name: it.title,
    description: it.description,
    programmingLanguage: "TypeScript",
    codeRepository: "https://nextnative.dev", // optional; replace if you have a public repo link
    url: `${baseUrl}#${it.id}`,
    text: it.code,
  }));

  const json = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
