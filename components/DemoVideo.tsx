import StarburstSign from "./StarburstSign";
import Subheading from "./Subheading";
import DemoVideoPlayer from "./DemoVideoPlayer"; // <- client component

export default function DemoVideo() {
  const videoId = "9iDXsyiP134";

  return (
    <div
      id="demo"
      className="mt-16 mb-10 flex flex-col sm:mt-10 sm:mb-20 sm:px-20 md:py-20"
    >
      <div className="mb-16 text-center">
        <Subheading
          heading1="Watch NextNative"
          heading2="Demo"
          className="text-start md:items-center md:text-center"
        />
        <p className="mt-6 w-fit max-w-2xl self-start text-start text-lg md:mx-auto md:text-center">
          I explain in 3 minutes how you can get started building mobile apps
          with Next.js
        </p>
      </div>

      <StarburstSign position="bottom-right" rotation={180}>
        <div
          style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
          className="relative h-full max-w-[962px] overflow-hidden rounded-[20px] bg-white xl:h-[620px] xl:max-w-[1260px]"
        >
          <DemoVideoPlayer
            videoId={videoId}
            thumbnailSrc="https://cdn.nextnative.dev/thumbnail-4.png"
            thumbnailAlt="NextNative demo - Build cross-platform mobile apps with web technologies"
          />
        </div>
      </StarburstSign>
    </div>
  );
}
