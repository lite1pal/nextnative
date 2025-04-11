import HighlightedSpan from "./HighlightedSpan";

function Heading() {
  return (
    <h1 className="text-[44px] md:text-[64px] leading-[60px] md:leading-[71px] font-[600]">
      {/* Build iOS and Android apps with{" "}
      <HighlightedSpan>Next.js & TailwindCSS</HighlightedSpan> */}
      Launch mobile apps faster with <HighlightedSpan>Next.js</HighlightedSpan>
    </h1>
  );
}

export default Heading;
