import { cn } from "@/lib/utils";

function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[962px] px-4 xl:max-w-[1260px] xl:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
