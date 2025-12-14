export type UiVariant = "primary" | "secondary" | "ghost";

export type UiItem = {
  id: string; // "duolingo"
  title: string; // "Duolingo Button"
  description: string; // 1–2 lines for SEO + humans
  tags: string[]; // ["duolingo","cta","mobile"]
  code: string; // code snippet as plain text
  Preview: React.ComponentType; // server component-friendly preview
};
