// app/components/component-wrapper.tsx (or components/component-wrapper.tsx)
// Server Component (default)

import IPhoneMockup from "@/components/note-taking/iphone-mockup";
import { DollarSign } from "lucide-react";
import ComponentWrapperClient from "./component-wrapper-client";

export default function ComponentWrapper({
  children,
  codeExample,
  heading = "Component Example",
  paid = false,
  isDark = false,
  fullMockup = false,
  id,
  description,
}: {
  id?: string; // for anchors
  children: React.ReactNode;
  codeExample: string;
  heading?: string;
  paid?: boolean;
  isDark?: boolean;
  fullMockup?: boolean;
  description?: string; // optional SEO text under heading
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-xl bg-white p-6"
      style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
    >
      <div className="mb-2 flex items-center gap-6">
        <h2 className="text-xl font-[500] sm:font-semibold">{heading}</h2>

        {!paid && (
          <div className="border-primary text-primary flex items-center gap-1 rounded-full border-2 bg-white px-5 py-0.5 font-[500]">
            <DollarSign size={16} />
            Free
          </div>
        )}
      </div>

      {description ? (
        <p className="mt-2 max-w-2xl text-sm text-gray-600">{description}</p>
      ) : null}

      {/* Client controls (tabs + copy) */}
      <ComponentWrapperClient codeExample={codeExample}>
        {/* Preview panel (server-rendered markup) */}
        <div className="flex items-center justify-center py-10">
          <div
            className={`${!fullMockup && "max-h-[450px]"} relative overflow-hidden`}
          >
            <IPhoneMockup isDark={isDark}>
              <div
                className={`${!isDark ? "bg-white text-black" : "text-white"} h-full min-h-[810px] px-4`}
              >
                {children}
              </div>
            </IPhoneMockup>

            {!fullMockup && (
              <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-white via-white/90 to-transparent" />
            )}
          </div>
        </div>

        {/* Code panel MUST be SSR-visible */}
        <div id="code-panel" className="relative mt-3">
          <pre className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4 text-xs leading-6 text-slate-950">
            <code>{codeExample}</code>
          </pre>
        </div>
      </ComponentWrapperClient>
    </section>
  );
}
