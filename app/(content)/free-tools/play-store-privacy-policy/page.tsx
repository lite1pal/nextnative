"use client";

import { useMemo, useState } from "react";

type Toggles = {
  analytics: boolean;
  crash: boolean;
  ads: boolean;
  payments: boolean;
  push: boolean;
  auth: boolean;

  // permissions
  location: boolean;
  camera: boolean;
  photos: boolean;
  microphone: boolean;
  contacts: boolean;
  files: boolean;
  bluetooth: boolean;
};

type Inputs = {
  appName: string;
  packageName: string;
  developer: string;
  company: string;
  email: string;
  website: string;
  address: string;
  country: string;
  effective: string;
  toggles: Toggles;
  dataDeletionEmail?: string;
};

type AppPreset = {
  id: string;
  name: string;
  icon: string;
  description: string;
  toggles: Toggles;
};

const APP_PRESETS: AppPreset[] = [
  {
    id: "social",
    name: "Social App",
    icon: "👥",
    description: "Social networking with photos, contacts, location",
    toggles: {
      analytics: true,
      crash: true,
      ads: false,
      payments: true,
      push: true,
      auth: true,
      location: true,
      camera: true,
      photos: true,
      microphone: false,
      contacts: true,
      files: true,
      bluetooth: false,
    },
  },
  {
    id: "productivity",
    name: "Productivity",
    icon: "✅",
    description: "Task manager, notes, file management",
    toggles: {
      analytics: true,
      crash: true,
      ads: false,
      payments: true,
      push: true,
      auth: true,
      location: false,
      camera: false,
      photos: true,
      microphone: false,
      contacts: false,
      files: true,
      bluetooth: false,
    },
  },
  {
    id: "game",
    name: "Game",
    icon: "🎮",
    description: "Gaming app with ads and in-app purchases",
    toggles: {
      analytics: true,
      crash: true,
      ads: true,
      payments: true,
      push: true,
      auth: true,
      location: false,
      camera: false,
      photos: false,
      microphone: false,
      contacts: false,
      files: false,
      bluetooth: false,
    },
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    icon: "🛍️",
    description: "Shopping app with payments and location",
    toggles: {
      analytics: true,
      crash: true,
      ads: false,
      payments: true,
      push: true,
      auth: true,
      location: true,
      camera: true,
      photos: true,
      microphone: false,
      contacts: false,
      files: false,
      bluetooth: false,
    },
  },
  {
    id: "fitness",
    name: "Fitness/Health",
    icon: "💪",
    description: "Fitness tracking with location and sensors",
    toggles: {
      analytics: true,
      crash: true,
      ads: false,
      payments: true,
      push: true,
      auth: true,
      location: true,
      camera: false,
      photos: true,
      microphone: false,
      contacts: false,
      files: false,
      bluetooth: true,
    },
  },
  {
    id: "minimal",
    name: "Minimal",
    icon: "🎯",
    description: "Basic app with minimal permissions",
    toggles: {
      analytics: true,
      crash: true,
      ads: false,
      payments: false,
      push: false,
      auth: false,
      location: false,
      camera: false,
      photos: false,
      microphone: false,
      contacts: false,
      files: false,
      bluetooth: false,
    },
  },
];

const todayISO = () => new Date().toISOString().slice(0, 10);

const DEFAULT_TOGGLES: Toggles = {
  analytics: true,
  crash: true,
  ads: false,
  payments: true,
  push: true,
  auth: true,
  location: false,
  camera: false,
  photos: false,
  microphone: false,
  contacts: false,
  files: false,
  bluetooth: false,
};

export default function PlayStorePrivacyPolicyGenerator() {
  const [appName, setAppName] = useState("NextNative Starter");
  const [packageName, setPackageName] = useState("com.example.nextnative");
  const [developer, setDeveloper] = useState("NextNative");
  const [company, setCompany] = useState("NextNative LLC");
  const [email, setEmail] = useState("hello@nextnative.dev");
  const [website, setWebsite] = useState("https://nextnative.dev");
  const [address, setAddress] = useState("123 Example St, City, State");
  const [country, setCountry] = useState("United States");
  const [effective, setEffective] = useState(todayISO());
  const [dataDeletionEmail, setDataDeletionEmail] = useState(
    "privacy@nextnative.dev",
  );

  const [toggles, setToggles] = useState<Toggles>({ ...DEFAULT_TOGGLES });
  const [copySuccess, setCopySuccess] = useState(false);
  const [previewFormat, setPreviewFormat] = useState<"md" | "txt" | "html">(
    "md",
  );

  const onToggle = (k: keyof Toggles) =>
    setToggles((t) => ({ ...t, [k]: !t[k] }));

  const applyPreset = (preset: AppPreset) => {
    setToggles({ ...preset.toggles });
  };

  const saveConfig = () => {
    const config = {
      appName,
      packageName,
      developer,
      company,
      email,
      website,
      address,
      country,
      effective,
      dataDeletionEmail,
      toggles,
    };
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(appName)}-privacy-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const config = JSON.parse(String(reader.result));
        if (config.appName) setAppName(config.appName);
        if (config.packageName) setPackageName(config.packageName);
        if (config.developer) setDeveloper(config.developer);
        if (config.company) setCompany(config.company);
        if (config.email) setEmail(config.email);
        if (config.website) setWebsite(config.website);
        if (config.address) setAddress(config.address);
        if (config.country) setCountry(config.country);
        if (config.effective) setEffective(config.effective);
        if (config.dataDeletionEmail)
          setDataDeletionEmail(config.dataDeletionEmail);
        if (config.toggles) setToggles(config.toggles);
      } catch (err) {
        alert("Failed to load configuration file");
      }
    };
    reader.readAsText(file);
    e.currentTarget.value = "";
  };

  const inputs: Inputs = useMemo(
    () => ({
      appName,
      packageName,
      developer,
      company,
      email,
      website,
      address,
      country,
      effective,
      dataDeletionEmail,
      toggles,
    }),
    [
      appName,
      packageName,
      developer,
      company,
      email,
      website,
      address,
      country,
      effective,
      dataDeletionEmail,
      toggles,
    ],
  );

  const markdown = useMemo(() => buildPolicy(inputs, "md"), [inputs]);
  const plain = useMemo(() => buildPolicy(inputs, "txt"), [inputs]);
  const html = useMemo(() => buildPolicyHTML(inputs), [inputs]);

  const copy = async () => {
    const content =
      previewFormat === "html"
        ? html
        : previewFormat === "txt"
          ? plain
          : markdown;
    await navigator.clipboard.writeText(content);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const download = (fmt: "txt" | "md" | "html") => {
    const content = fmt === "md" ? markdown : fmt === "html" ? html : plain;
    const type = fmt === "html" ? "text/html" : "text/plain";
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slugify(appName)}-privacy-policy.${fmt}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-3 bg-clip-text text-5xl font-bold">
          Play Store Privacy Policy Generator 🔐
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Generate a comprehensive, Play-Store-ready privacy policy for your
          Android app in seconds. Choose your app type, customize settings, and
          export in multiple formats.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">✨ 6 App Type Presets</span>
          <span className="flex items-center gap-1">📄 Export MD/TXT/HTML</span>
          <span className="flex items-center gap-1">💾 Save & Load Config</span>
          <span className="flex items-center gap-1">⚡ Live Preview</span>
        </div>
        <div className="mt-4 rounded-lg bg-yellow-50 p-3">
          <p className="text-sm text-yellow-800">
            <strong>⚠️ Legal Disclaimer:</strong> This is a template for
            convenience only and does not constitute legal advice. Consult with
            a lawyer and review Google Play policies, GDPR, CCPA, and your SDK
            vendors' terms.
          </p>
        </div>
      </div>

      {/* App Type Presets */}
      <section className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          🎯 Quick Start: Choose App Type
        </h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {APP_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className="group flex flex-col items-center rounded-xl border-2 border-gray-200 bg-white p-4 text-center transition-all hover:border-purple-500 hover:shadow-md"
            >
              <span className="mb-2 text-3xl">{preset.icon}</span>
              <span className="font-medium text-gray-900">{preset.name}</span>
              <span className="mt-1 text-xs text-gray-500">
                {preset.description}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Form */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          1) App & Developer Information
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field label="App name">
            <input
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Package name (applicationId)">
            <input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Developer / Publisher">
            <input
              value={developer}
              onChange={(e) => setDeveloper(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Company (legal entity)">
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Contact email">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Website">
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Business address">
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Country / Region">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Data deletion request email (optional)">
            <input
              value={dataDeletionEmail}
              onChange={(e) => setDataDeletionEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
          <Field label="Effective date">
            <input
              type="date"
              value={effective}
              onChange={(e) => setEffective(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </Field>
        </div>

        <h2 className="mt-8 mb-4 text-lg font-semibold text-gray-900">
          2) 📦 SDKs & Services Used
        </h2>
        <p className="mb-3 text-sm text-gray-600">
          Select the third-party services and SDKs integrated in your app:
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            [
              "analytics",
              "📊 Analytics",
              "Google Analytics, Firebase Analytics",
            ],
            ["crash", "🐛 Crash Reporting", "Firebase Crashlytics, Sentry"],
            ["payments", "💳 Payments", "Google Play Billing, Stripe"],
            ["ads", "📢 Advertising", "Google AdMob, Meta Audience Network"],
            ["push", "🔔 Push Notifications", "Firebase Cloud Messaging"],
            ["auth", "🔐 Authentication", "Email, Google, Facebook OAuth"],
          ].map(([k, label, desc]) => (
            <label
              key={k}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={toggles[k as keyof Toggles] as boolean}
                onChange={() => onToggle(k as keyof Toggles)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </label>
          ))}
        </div>

        <h2 className="mt-8 mb-4 text-lg font-semibold text-gray-900">
          3) 🔓 Android Permissions
        </h2>
        <p className="mb-3 text-sm text-gray-600">
          Select the device permissions your app requests:
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {[
            ["location", "📍 Location", "GPS, network-based location"],
            ["camera", "📷 Camera", "Take photos and videos"],
            ["photos", "🖼️ Photos/Media", "Read and write media files"],
            ["microphone", "🎤 Microphone", "Record audio"],
            ["contacts", "👥 Contacts", "Access contact list"],
            ["files", "📁 Files/Storage", "Read and write files"],
            ["bluetooth", "📶 Bluetooth", "Connect to nearby devices"],
          ].map(([k, label, desc]) => (
            <label
              key={k}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3 transition-colors hover:bg-gray-100"
            >
              <input
                type="checkbox"
                checked={toggles[k as keyof Toggles] as boolean}
                onChange={() => onToggle(k as keyof Toggles)}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{label}</div>
                <div className="text-xs text-gray-500">{desc}</div>
              </div>
            </label>
          ))}
        </div>

        {/* Save/Load Config */}
        <div className="mt-8 border-t border-gray-200 pt-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            💾 Configuration
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={saveConfig}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50"
            >
              💾 Save Config
            </button>
            <label className="cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium hover:bg-gray-50">
              📂 Load Config
              <input
                type="file"
                accept=".json"
                onChange={loadConfig}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </section>

      {/* Output */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">
          4) Generated Privacy Policy (Markdown)
        </h2>
        <textarea
          readOnly
          value={markdown}
          className="h-[520px] w-full rounded-xl border border-gray-300 bg-white p-3 font-mono text-sm whitespace-pre-wrap text-gray-900"
        />
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={copy}
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
          >
            Copy
          </button>
          <button
            onClick={() => download("md")}
            className="inline-flex items-center justify-center rounded-lg border border-purple-600 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
          >
            Download .md
          </button>
          <button
            onClick={() => download("txt")}
            className="inline-flex items-center justify-center rounded-lg border border-purple-600 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none"
          >
            Download .txt
          </button>
        </div>
        <p className="mt-3 text-xs text-gray-500">
          This template is provided for convenience only and does not constitute
          legal advice. Check Google Play policy, local laws (e.g., GDPR/CCPA),
          and your SDK vendors’ terms.
        </p>
      </section>
    </div>
  );
}

/* ---------------- helpers & policy builder ---------------- */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col">
      <span className="mb-1 text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function section(title: string, body: string, fmt: "md" | "txt") {
  if (fmt === "md") return `\n\n## ${title}\n\n${body}`;
  return `\n\n${title.toUpperCase()}\n\n${body}`;
}

function li(items: string[], fmt: "md" | "txt") {
  if (fmt === "md") return items.map((i) => `- ${i}`).join("\n");
  return items.map((i) => `• ${i}`).join("\n");
}

function maybe(flag: boolean, s: string) {
  return flag ? s : "";
}

function buildPolicy(input: Inputs, fmt: "md" | "txt") {
  const t = input.toggles;
  const heading =
    fmt === "md"
      ? `# Privacy Policy for ${input.appName}`
      : `PRIVACY POLICY FOR ${input.appName}\n`;

  const intro = `${input.appName} (package name: \`${input.packageName}\`) is provided by ${input.developer} (${input.company}). This Privacy Policy explains how we collect, use, and protect information when you use the app. By using ${input.appName}, you agree to this Policy.`;

  const infoWeCollect = [
    "Device information (model, OS version, language, country).",
    maybe(t.analytics, "Usage analytics (events, screens, interactions)."),
    maybe(t.crash, "Crash and performance data."),
    maybe(t.auth, "Account information you provide (e.g., email)."),
    maybe(
      t.payments,
      "Purchase and subscription status (no full payment details stored).",
    ),
    maybe(t.push, "Push notification tokens to deliver messages."),
  ].filter(Boolean) as string[];

  const permissions: string[] = [];
  if (t.location)
    permissions.push(
      "Approximate or precise location to provide location-based features.",
    );
  if (t.camera) permissions.push("Camera to capture photos or videos.");
  if (t.photos)
    permissions.push("Photos/Media to select or store images and other media.");
  if (t.microphone)
    permissions.push("Microphone to record audio for in-app features.");
  if (t.contacts)
    permissions.push(
      "Contacts to invite or connect with others (if you choose).",
    );
  if (t.files)
    permissions.push("Files/Storage to import, export, or cache content.");
  if (t.bluetooth)
    permissions.push(
      "Bluetooth/Nearby devices to connect to compatible hardware.",
    );

  const howWeUse = [
    "Provide and improve app functionality.",
    "Personalize content and features.",
    maybe(
      t.analytics,
      "Measure usage and better understand product performance.",
    ),
    maybe(t.crash, "Diagnose crashes and improve stability."),
    maybe(
      t.push,
      "Send push notifications you opt into (you may disable in settings).",
    ),
    maybe(
      t.payments,
      "Validate purchases, manage subscriptions, and provide premium access.",
    ),
    maybe(t.ads, "Serve ads and measure their performance."),
  ].filter(Boolean) as string[];

  const sharing = [
    maybe(
      t.analytics,
      "Analytics providers (e.g., Google Analytics for Firebase).",
    ),
    maybe(t.crash, "Crash reporting providers (e.g., Firebase Crashlytics)."),
    maybe(t.ads, "Advertising partners (e.g., Google AdMob)."),
    maybe(t.payments, "Google Play Billing for purchases and subscriptions."),
    maybe(
      t.push,
      "Push notifications provider (e.g., Firebase Cloud Messaging).",
    ),
    maybe(
      t.auth,
      "Authentication providers when you sign in (e.g., email, OAuth).",
    ),
    "Service providers that help us operate the app (hosting, support) under confidentiality obligations.",
    "Legal authorities if required by law, to protect rights, or investigate misuse.",
  ].filter(Boolean) as string[];

  const retention = `We keep personal data only as long as necessary for the purposes described in this Policy or as required by law. You may request deletion of your account or certain data by contacting us at ${input.dataDeletionEmail || input.email}.`;

  const security = `We implement reasonable technical and organizational measures to protect information. However, no method of transmission or storage is 100% secure.`;

  const children = `The app is not directed to children under 13 (or the minimum age in your jurisdiction). If you believe a child provided personal information, contact us to delete it.`;

  const rights = `Depending on your location (e.g., EU/EEA, UK, California), you may have rights to access, correct, delete, or port your data, and object to certain processing. To exercise rights, contact us at ${input.email}.`;

  const intl = `Your information may be processed and stored in countries other than your own. Where required, we rely on appropriate safeguards for international transfers.`;

  const thirdParties = [
    maybe(
      t.analytics,
      "- **Analytics**: Google Analytics for Firebase (Google LLC).",
    ),
    maybe(t.crash, "- **Crash reporting**: Firebase Crashlytics (Google LLC)."),
    maybe(t.ads, "- **Ads**: Google AdMob (Google LLC)."),
    maybe(t.push, "- **Push**: Firebase Cloud Messaging (Google LLC)."),
    maybe(t.payments, "- **Payments**: Google Play Billing."),
    maybe(
      t.auth,
      "- **Authentication**: Firebase Authentication / OAuth providers.",
    ),
  ]
    .filter(Boolean)
    .join("\n");

  const changes = `We may update this Policy to reflect changes to the app or applicable laws. We will post the updated Policy with a new “Effective date”.`;

  const contact = `If you have questions about this Policy or privacy practices, contact us:\n\n- Email: ${input.email}\n- Website: ${input.website}\n- Address: ${input.address}\n- Country/Region: ${input.country}`;

  const parts: string[] = [
    heading,
    intro,
    section("Information We Collect", li(infoWeCollect, fmt), fmt),
    permissions.length
      ? section("Permissions and Purpose", li(permissions, fmt), fmt)
      : "",
    section("How We Use Information", li(howWeUse, fmt), fmt),
    section("Sharing of Information", li(sharing, fmt), fmt),
    section("Data Retention", retention, fmt),
    section("Security", security, fmt),
    section("Children’s Privacy", children, fmt),
    section("Your Rights & Choices", rights, fmt),
    section("International Transfers", intl, fmt),
    thirdParties
      ? section(
          "Third-Party Services & SDKs",
          `The app may integrate the following services:\n\n${thirdParties}`,
          fmt,
        )
      : "",
    section("Changes to This Policy", changes, fmt),
    section("Contact Us", contact, fmt),
    section("Effective Date", input.effective, fmt),
  ].filter(Boolean) as string[];

  return parts.join(fmt === "md" ? "\n\n" : "\n\n");
}

function buildPolicyHTML(input: Inputs): string {
  const markdown = buildPolicy(input, "md");

  // Simple markdown-to-HTML conversion for privacy policy
  let html = markdown
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\n\n/g, "</p><p>");

  // Wrap consecutive list items in ul tags
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, (match) => {
    if (!match.includes("<ul>")) return "<ul>" + match + "</ul>";
    return match;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - ${input.appName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f9fafb;
        }
        h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #111;
            border-bottom: 3px solid #6366f1;
            padding-bottom: 0.5rem;
        }
        h2 {
            font-size: 1.75rem;
            margin: 2rem 0 1rem;
            color: #374151;
        }
        h3 {
            font-size: 1.25rem;
            margin: 1.5rem 0 0.75rem;
            color: #4b5563;
        }
        p {
            margin-bottom: 1rem;
        }
        ul {
            margin: 1rem 0 1rem 2rem;
        }
        li {
            margin-bottom: 0.5rem;
        }
        code {
            background: #e5e7eb;
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
        }
        strong {
            color: #111;
            font-weight: 600;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .footer {
            margin-top: 3rem;
            padding-top: 2rem;
            border-top: 1px solid #e5e7eb;
            text-align: center;
            color: #6b7280;
            font-size: 0.875rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>${html}</p>
        <div class="footer">
            <p>Last updated: ${input.effective}</p>
            <p>For questions, contact: ${input.email}</p>
        </div>
    </div>
</body>
</html>`;
}

/* Tailwind-y small helpers */
declare global {
  interface HTMLElementTagNameMap {
    // noop
  }
}
