import CTA from "./CTA";
import Subheading from "./Subheading";

interface CallToActionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  className?: string;
}

function CallToAction({
  title,
  subtitle,
  buttonText,
  className,
}: CallToActionProps) {
  return (
    <div
      className={`flex flex-col items-center gap-10 py-12 md:py-36 text-center ${className}`}
    >
      <Subheading
        heading1={title}
        heading2={subtitle}
        className="items-center"
      />
      <div className="relative">
        <CTA className="items-center" />
      </div>
    </div>
  );
}

export default CallToAction;
