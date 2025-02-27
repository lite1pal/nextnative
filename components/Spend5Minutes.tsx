function Spend5Minutes() {
  return (
    <div className="flex flex-col leading-[48px] xl:leading-[68px] text-[24px] xl:text-[40px] text-gray font-[500] gap-6 xl:gap-10 max-w-[764px] mx-auto py-20">
      <div>
        Spend <span className="text-foreground">~3-5 minutes</span> setting up
        the project and jump straight in{" "}
        <span className="text-foreground">making your idea come true.</span>
      </div>

      <div>
        <span className="text-foreground">Time saved without doing basic </span>
        stuff like implementing Auth, configuring the database and so on.
      </div>

      <div>
        Weeks of learning and configuring to{" "}
        <span className="text-foreground">minutes of setup!</span>
      </div>
    </div>
  );
}

export default Spend5Minutes;
