import Subheading from "./Subheading";
import CTAWithSocialProof from "./CTAWithSocialProof";

type CallToActionProps = {
  className?: string;
  showSecondary?: boolean;
};

function CallToAction({
  className,
  showSecondary = true,
}: CallToActionProps) {
  return (
    <div
      className={`flex flex-col gap-20 py-12 md:items-center md:py-36 md:text-center ${className}`}
    >
      <Subheading
        heading1="Start building in minutes."
        heading2="Save weeks of work."
        className="md:items-center"
      />
      <CTAWithSocialProof showSecondary={showSecondary} />
    </div>
  );
}

export default CallToAction;
