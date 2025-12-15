import Subheading from "./Subheading";
import CTAWithSocialProof from "./CTAWithSocialProof";

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
      className={`flex flex-col gap-20 py-12 md:items-center md:py-36 md:text-center ${className}`}
    >
      <Subheading
        heading1={title}
        heading2={subtitle}
        className="md:items-center"
      />
      <CTAWithSocialProof />
    </div>
  );
}

export default CallToAction;
