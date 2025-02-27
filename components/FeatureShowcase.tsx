import Image from "next/image";
import { cn } from "@/lib/utils";

interface Feature {
  title: string;
  description: string;
  image: string;
  className?: string;
}

const features: Feature[] = [
  {
    title: "Beautiful UI Components",
    description: "Pre-built components that look great on iOS and Android",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=800&q=80",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    title: "Native Navigation",
    description: "Smooth transitions between screens",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80",
  },
  {
    title: "Push Notifications",
    description: "Engage users with timely updates",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
  },
  {
    title: "Authentication",
    description: "Secure user login and registration",
    image:
      "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800&q=80",
    className: "md:col-span-2",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl bg-gray-50",
        "transition-all duration-300 hover:shadow-xl",
        feature.className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={feature.image}
          alt={feature.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="absolute bottom-0 p-6 text-white">
        <h3 className="text-xl md:text-2xl font-[500] mb-2">{feature.title}</h3>
        <p className="text-gray-200">{feature.description}</p>
      </div>
    </div>
  );
}

function FeatureShowcase() {
  return (
    <div className="py-12 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-[500] mb-4">
            Everything you need to build great apps
          </h2>
          <p className="text-gray text-lg md:text-xl">
            Pre-built components and features to speed up your development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeatureShowcase;
