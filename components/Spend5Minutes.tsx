"use client";

function Spend5Minutes() {
  return (
    <div
      className={`flex flex-col leading-[48px] xl:leading-[68px] text-[24px] xl:text-[40px] text-gray font-[500] gap-6 xl:gap-10 max-w-[764px] mx-auto py-20 transition-all duration-700`}
    >
      <div>
        Setup your cross-platform mobile app in just{" "}
        <span className="text-foreground">3-5 minutes</span> and immediately
        start
        <span className="text-foreground">
          {" "}
          building your app's unique features.
        </span>
      </div>

      <div>
        <span className="text-foreground">
          Skip the tedious configuration of{" "}
        </span>
        authentication, database setup, API integration, and native mobile
        capabilities.
      </div>

      <div>
        Transform{" "}
        <span className="text-foreground">weeks of technical setup</span> into
        <span className="text-foreground">
          {" "}
          minutes of productive development!
        </span>
      </div>
    </div>
  );
}

export default Spend5Minutes;
