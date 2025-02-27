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
    <div className="flex flex-col items-center text-center gap-2">
      <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
      <h3 className="font-[500] text-lg">{title}</h3>
      <p className="text-gray text-sm">{description}</p>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="py-12 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <TrustBadge
          icon={Shield}
          title="Money-back Guarantee"
          description="14-day no-questions-asked refund policy if you're not satisfied"
        />
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
