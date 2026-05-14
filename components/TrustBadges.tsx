import { Shield, CreditCard, Lock } from "lucide-react";

function TrustBadge({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <Icon className="text-primary h-8 w-8" strokeWidth={1.5} />
      <h3 className="text-lg font-[500]">{title}</h3>
      <p className="text-gray text-sm">{description}</p>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="py-12 md:py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
        <TrustBadge
          icon={CreditCard}
          title="Secure Payment"
          description="Your payment information is processed securely by Stripe"
        />
        <TrustBadge
          icon={Lock}
          title="Lifetime Access"
          description="One-time payment for unlimited updates and future features"
        />
      </div>
    </div>
  );
}

export default TrustBadges;
