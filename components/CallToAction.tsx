import Button from "./Button";
import CTA from "./CTA";
import StarburstSign from "./StarburstSign";
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
      className={`flex flex-col items-center gap-10 py-36 text-center ${className}`}
    >
      <Subheading
        heading1={title}
        heading2={subtitle}
        className="items-center"
      />
      <div className="relative">
        <CTA />

        {/* <StarburstSign
          size="small"
          rotation={270}
          position="bottom-left"
          className="mx-auto"
          svgClassName="bottom-[-30px] left-[-30px]"
        >
          <Button variant="primary" className="w-full">
            {buttonText}
          </Button>
        </StarburstSign> */}
      </div>
    </div>
  );
}

export default CallToAction;
