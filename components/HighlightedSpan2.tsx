function HighlightedSpan2({ children }: { children: React.ReactNode }) {
  if (!children) return null;
  return (
    <span className="relative inline-block">
      <span className="relative z-10 px-3 py-1 text-white">{children}</span>
      <span
        aria-hidden
        className="bg-primary absolute inset-0 -rotate-1 rounded-md"
      />
    </span>
  );
}

export default HighlightedSpan2;
