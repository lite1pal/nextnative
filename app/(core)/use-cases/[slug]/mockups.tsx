"use client";

import IPhoneMockup from "@/components/iphone-mockup";
import Image from "next/image";

interface MockupsProps {
  data: {
    src: string;
    alt: string;
    isDark?: boolean;
  }[];
}

function Mockups({ data }: MockupsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {data?.map((item) => (
        <IPhoneMockup key={item.src} isDark={item.isDark}>
          <div>
            <Image
              src={item.src}
              alt={item.alt}
              width={400}
              height={800}
              className="absolute inset-0 h-full w-full object-cover pt-10"
            />
          </div>
        </IPhoneMockup>
      ))}
    </div>
  );
}

export default Mockups;
