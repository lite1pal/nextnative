import Button from "./Button";
import JoinWaitlistForm from "./JoinWaitlistForm";
import StarburstSign from "./StarburstSign";

function CTA() {
  const isWaitlist = true;

  if (isWaitlist) {
    return <JoinWaitlistForm />;
  }

  return (
    <StarburstSign rotation={270} position="bottom-left" className="mx-auto">
      <a href="#pricing" className="mx-auto">
        <Button variant="primary">Build your app today</Button>
      </a>
    </StarburstSign>
  );
}

export default CTA;
