import HighlightedSpan from "./HighlightedSpan";

function Heading() {
  return (
    <h1 className="text-[44px] md:text-[54px] leading-[60px] md:leading-[71px] font-[500]">
      Build iOS and Android apps with{" "}
      <HighlightedSpan>Next.js & TailwindCSS</HighlightedSpan>
    </h1>
  );
}

export default Heading;
