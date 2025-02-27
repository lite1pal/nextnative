import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStudy {
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  logo: string;
  color: string;
}

const caseStudies: CaseStudy[] = [
  {
    title: "FitTracker Pro",
    description:
      "Fitness tracking app built with NextNative. Launched in 2 weeks.",
    metrics: [
      { label: "App Store Rating", value: "4.8" },
      { label: "Downloads", value: "50K+" },
      { label: "Dev Time Saved", value: "4 weeks" },
    ],
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&q=80",
    color: "bg-blue-500/10",
  },
  {
    title: "TaskMaster",
    description: "Professional task management app for remote teams.",
    metrics: [
      { label: "Active Users", value: "10K+" },
      { label: "Time to Market", value: "3 weeks" },
      { label: "Cost Saved", value: "$40K" },
    ],
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80",
    logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=200&q=80",
    color: "bg-purple-500/10",
  },
];

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div
      className={cn(
        "rounded-3xl p-8 transition-all duration-300",
        "hover:shadow-xl group cursor-pointer",
        study.color
      )}
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div className="relative h-12 w-12 rounded-full overflow-hidden">
            <Image
              src={study.logo}
              alt={`${study.title} logo`}
              fill
              className="object-cover"
            />
          </div>
          <ArrowRight className="text-gray opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-[500]">{study.title}</h3>
          <p className="text-gray">{study.description}</p>
        </div>

        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          {study.metrics.map((metric, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-[500]">{metric.value}</p>
              <p className="text-sm text-gray">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SuccessStories() {
  return (
    <div className="py-12 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl md:text-[40px] font-[500] mb-4">
            Success Stories
          </h2>
          <p className="text-gray text-lg md:text-xl">
            See how others are building amazing apps with NextNative
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={index} study={study} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SuccessStories;
