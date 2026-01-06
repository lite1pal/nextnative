import Subheading from "./Subheading";
import CTAWithSocialProof from "./CTAWithSocialProof";

type CallToActionProps = {
  className?: string;
};

function CallToAction({ className }: CallToActionProps) {
  return (
    <div
      className={`flex flex-col gap-20 py-12 md:items-center md:py-36 md:text-center ${className}`}
    >
      <Subheading
        heading1="Start building in minutes."
        heading2="Save weeks of work."
        className="md:items-center"
      />
      <CTAWithSocialProof />
    </div>
  );
}

export default CallToAction;
