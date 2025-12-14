"use client";

import dynamic from "next/dynamic";
import ComponentWrapper from "../component-wrapper";
import Duolingo from "./duolingo";

const ApplePodcasts = dynamic(() => import("./apple-podcasts"), { ssr: false });

function ScreenPage() {
  return (
    <div className="mb-12 flex flex-col gap-10">
      {/* <Heading paragraph="Find all sorts of screens for your mobile app.">
        Screens
      </Heading> */}

      <div className="flex flex-col gap-10">
        <ComponentWrapper
          isDark
          heading="Podcasts Screens"
          codeExample={``}
          fullMockup
        >
          <div>
            <ApplePodcasts />
          </div>
        </ComponentWrapper>
        <ComponentWrapper
          isDark={false}
          heading="Duolingo-like screen"
          codeExample={``}
          fullMockup
        >
          <div>
            <Duolingo />
          </div>
        </ComponentWrapper>
      </div>
    </div>
  );
}

export default ScreenPage;
