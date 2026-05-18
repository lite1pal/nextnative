import HighlightedSpan from "@/components/HighlightedSpan";

export default function BlogHeading() {
  return (
    <div className="flex flex-col items-center gap-2 text-center sm:py-16">
      <h1 className="text-[44px] leading-[60px] font-[600] md:text-[74px] md:leading-[91px]">
        Welcome to <HighlightedSpan>NextNative</HighlightedSpan>'s Blog
      </h1>
      <p className="mt-7 max-w-2xl text-xl leading-relaxed">
        Guides, tutorials, and tips for building cross-platform mobile apps
        faster with web frameworks.
      </p>
    </div>
  );
}
