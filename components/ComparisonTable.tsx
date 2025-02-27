import { Check, X } from "lucide-react";

interface ComparisonFeature {
  feature: string;
  nextnative: boolean;
  traditional: boolean;
}

const features: ComparisonFeature[] = [
  {
    feature: "Use Next.js & TailwindCSS",
    nextnative: true,
    traditional: false,
  },
  { feature: "No Native Code Required", nextnative: true, traditional: false },
  { feature: "Instant App Updates", nextnative: true, traditional: false },
  { feature: "Web Development Tools", nextnative: true, traditional: false },
  { feature: "Native Performance", nextnative: true, traditional: true },
  { feature: "App Store Publishing", nextnative: true, traditional: true },
];

function ComparisonTable() {
  return (
    <div className="py-12 md:py-20">
      <h2 className="text-2xl sm:text-3xl md:text-[40px] font-[500] text-center mb-10">
        The <span className="text-primary">smarter</span> way to build apps
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray/20">
              <th className="py-4 px-6 text-left font-[500] text-lg">
                Features
              </th>
              <th className="py-4 px-6 text-center font-[500] text-lg">
                NextNative
              </th>
              <th className="py-4 px-6 text-center font-[500] text-lg">
                Traditional App Dev
              </th>
            </tr>
          </thead>
          <tbody>
            {features.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray/20 hover:bg-gray/5 transition-colors"
              >
                <td className="py-4 px-6">{item.feature}</td>
                <td className="py-4 px-6 text-center">
                  {item.nextnative ? (
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray mx-auto" />
                  )}
                </td>
                <td className="py-4 px-6 text-center">
                  {item.traditional ? (
                    <Check className="w-5 h-5 text-primary mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-gray mx-auto" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComparisonTable;
