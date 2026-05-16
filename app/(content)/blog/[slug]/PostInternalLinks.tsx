"use client";

import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";
import { comparisons } from "@/app/(content)/comparisons/[slug]/comparisons-data";
import { tutorials } from "@/app/(content)/tutorials/[slug]/tutorials-data";

type Item = { href: string; label: string };
type Props = {
  title?: string;
  links?: Item[];
  showDocs?: boolean;
  includeIndividualPages?: boolean;
};

export default function PostInternalLinks({
  title = "Explore more",
  includeIndividualPages = false,
  links,
}: Props) {
  // Add individual comparison and tutorial pages if enabled
  const individualPages = includeIndividualPages
    ? [
        // Tutorial pages
        ...tutorials.map((tutorial) => ({
          href: `/tutorials/${tutorial.slug}`,
          label: tutorial.title,
        })),
        // Comparison pages
        ...comparisons.map((comparison) => ({
          href: `/comparisons/${comparison.slug}`,
          label: comparison.title,
        })),
      ]
    : [];

  const allLinks = links || [...individualPages];

  if (allLinks.length === 0) return null;

  return (
    <section className="mt-10 border-t pt-6">
      <h3 className="mb-3 text-base font-medium">{title}</h3>
      <ul className="grid">
        {allLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="hover:text-foreground text-gray-600 underline-offset-2 transition-colors hover:underline"
              onClick={() => trackEvent?.(`PostFooter_${l.href}_clicked`)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
