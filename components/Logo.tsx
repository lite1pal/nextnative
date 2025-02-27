import LogoSymbol from "./LogoSymbol";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4">
      <div className="relative top-[2px]">
        <LogoSymbol />
      </div>
      <p className="text-2xl font-[500]">nextnative</p>
    </Link>
  );
}

export default Logo;
