"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  badge?: "New" | "Pro";
};

const navItems: NavItem[] = [
  { label: "Buttons", href: "/components/buttons", badge: "New" },
  // { label: "Screens", href: "/components/screens" },
  {
    label: "Pricing Screens",
    href: "/components/screens/pricing-screens",
    badge: "New",
  },
  // scale: just add items here
];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function NavLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  // Lock body scroll on mobile drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ESC closes drawer
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return navItems;
    return navItems.filter(
      (x) =>
        x.label.toLowerCase().includes(query) ||
        x.href.toLowerCase().includes(query),
    );
  }, [q]);

  return (
    <div className="py-6 xl:py-10">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 mb-4 flex items-center justify-between border-b bg-white/80 px-4 py-3 backdrop-blur xl:hidden">
        <button
          onClick={() => setOpen(true)}
          aria-label="Open navigation"
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50"
        >
          <Menu className="h-5 w-5" />
          Browse
        </button>

        <div className="text-sm font-medium text-gray-700">Components</div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 xl:grid-cols-[280px_1fr] xl:gap-10">
        {/* Sidebar */}
        <aside className="xl:sticky xl:top-24 xl:self-start">
          {/* Overlay */}
          <div
            className={cx(
              "fixed inset-0 z-50 bg-black/30 transition-opacity xl:hidden",
              open ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            onClick={() => setOpen(false)}
          />

          {/* Drawer (mobile) / Card (desktop) */}
          <nav
            className={cx(
              "fixed top-0 left-0 z-50 flex h-full w-[320px] flex-col bg-white xl:static xl:h-auto xl:w-auto xl:translate-x-0 xl:rounded-2xl xl:border xl:border-gray-200",
              open ? "translate-x-0" : "-translate-x-full",
              "xl:bg-white",
            )}
            aria-label="Sidebar"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-4 xl:border-none">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-900">
                  Components
                </span>
                <span className="text-xs text-gray-500">
                  Browse UI patterns
                </span>
              </div>

              <button
                onClick={() => setOpen(false)}
                aria-label="Close navigation"
                className="rounded-lg border border-gray-200 bg-white p-2 hover:bg-gray-50 xl:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Search (scales when you have 20+ items) */}
            <div className="p-4 xl:pt-0">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-3 pl-9 text-sm outline-none focus:border-gray-300"
                />
              </div>
            </div>

            <div className="px-2 pb-4 xl:px-3">
              <ul className="max-h-[70vh] space-y-1 overflow-y-auto px-2 pr-1 xl:max-h-none">
                {filtered.map((item) => {
                  const active =
                    pathname === item.href ||
                    pathname.startsWith(item.href + "/");

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cx(
                          "group flex items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-gray-900 text-white"
                            : "text-gray-800 hover:bg-gray-100",
                        )}
                      >
                        <span className="font-medium">{item.label}</span>

                        {item.badge ? (
                          <span
                            className={cx(
                              "rounded-full px-2 py-0.5 text-[11px] font-semibold text-gray-800",
                              active ? "bg-white" : "bg-gray-200",
                            )}
                          >
                            {item.badge}
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  );
                })}

                {filtered.length === 0 ? (
                  <li className="px-3 py-2 text-sm text-gray-500">
                    Nothing found.
                  </li>
                ) : null}
              </ul>
            </div>
          </nav>
        </aside>

        {/* Content */}
        <main className="min-w-0">
          {/* Optional: top content chrome (breadcrumb-ish) */}
          {/* <div className="mb-6 hidden xl:block">
            <div className="text-xs text-gray-500">NextNative / Components</div>
          </div> */}

          {children}
        </main>
      </div>
    </div>
  );
}
