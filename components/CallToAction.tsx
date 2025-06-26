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
      className={`flex flex-col md:items-center gap-10 py-12 md:py-36 md:text-center ${className}`}
    >
      <Subheading
        heading1={title}
        heading2={subtitle}
        className="md:items-center"
      />
      <div className="relative">
        <CTA className="md:items-center" />
      </div>
    </div>
  );
}

export default CallToAction;
