function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[962px] xl:max-w-[1260px] px-4 md:px-0">
      {children}
    </div>
  );
}

export default Container;
