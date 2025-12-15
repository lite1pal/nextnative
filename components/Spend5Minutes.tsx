import HighlightedSpan2 from "./HighlightedSpan2";

function Spend5Minutes() {
  return (
    <div
      className={`text-gray mx-auto flex max-w-[764px] flex-col gap-6 py-6 text-[24px] leading-[48px] font-[500] max-sm:pb-16 md:py-20 xl:gap-10 xl:text-[40px] xl:leading-[68px]`}
    >
      <div>
        Setup your{" "}
        <span className="text-foreground">cross-platform mobile app</span> in
        just <span className="text-foreground">3-5 minutes</span> and
        immediately start
        <span className="text-foreground">
          {" "}
          building your app's unique features.
        </span>
      </div>

      <div>
        Skip{" "}
        <span className="text-foreground">
          <HighlightedSpan2>the boring parts</HighlightedSpan2>
        </span>{" "}
        and turn <span className="text-foreground">weeks of setup</span> into
        <span className="text-foreground">
          {" "}
          hours of productive development!
        </span>
      </div>
    </div>
  );
}

export default Spend5Minutes;
