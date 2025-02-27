import Image from "next/image";
import HorizontalLine from "./HorizontalLine";
function SocialProof() {
  return (
    <div className="flex md:items-center flex-col md:flex-row gap-12 py-20">
      <div className="flex flex-col w-[200px] gap-4">
        <p className="text-[28px] font-[500]">Featured on</p>
        <HorizontalLine className="w-[94px]" />
      </div>

      <div className="flex items-center w-full justify-evenly gap-16">
        <div className="flex items-center gap-2">
          <Image
            src="/product-hunt.svg"
            alt="Product Hunt"
            width={40}
            height={40}
            className="h-12 md:h-16 w-12 md:w-16"
          />
        </div>

        <div className="flex items-center gap-2">
          <Image
            src="/x-logo.svg"
            alt="X (formerly Twitter)"
            width={40}
            height={40}
            className="h-12 md:h-16 w-12 md:w-16"
          />
        </div>

        <div className="flex items-center gap-2">
          <Image
            src="/reddit.svg"
            alt="Reddit"
            width={40}
            height={40}
            className="h-12 md:h-16 w-12 md:w-16"
          />
        </div>
      </div>
    </div>
  );
}

export default SocialProof;
