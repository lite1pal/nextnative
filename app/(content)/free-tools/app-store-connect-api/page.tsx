"use client";

import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import HighlightedSpan from "@/components/HighlightedSpan";

export default function AppStoreConnectApi() {
  const [keyId, setKeyId] = useState("");
  const [issuerId, setIssuerId] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const fastlaneConfig = `# Fastlane Appfile
app_identifier("com.yourcompany.yourapp")
apple_id("your@email.com")

# App Store Connect API
api_key_path("./AuthKey_${keyId || "XXXXXXXXXX"}.p8")`;

  const fastlaneEnv = `# .env file for Fastlane
APP_STORE_CONNECT_API_KEY_KEY_ID="${keyId || "XXXXXXXXXX"}"
APP_STORE_CONNECT_API_KEY_ISSUER_ID="${issuerId || "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"}"
APP_STORE_CONNECT_API_KEY_KEY="${privateKey ? "[Your Private Key Content]" : "[Paste your .p8 file content here]"}"`;

  const curlExample = `curl -H 'Authorization: Bearer [YOUR_JWT_TOKEN]' \\
     -H 'Content-Type: application/json' \\
     https://api.appstoreconnect.apple.com/v1/apps`;

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            App Store Connect API <HighlightedSpan>Setup</HighlightedSpan> 🔑
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Step-by-step guide to set up App Store Connect API keys for
            automation. Generate Fastlane configuration and environment
            variables instantly.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🔑
              </span>
              <span>
                <strong className="text-gray-900">API</strong> automation
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">Fastlane</strong> ready
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                ✨
              </span>
              <span>
                <strong className="text-gray-900">Step-by-step</strong> guide
              </span>
            </div>
          </div>
        </div>

        {/* Step 1: Create API Key */}
        <div className="mb-8 space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                1
              </span>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Create an API Key in App Store Connect
                </h2>
                <p className="mt-2 text-gray-600">
                  Follow these steps to generate your API key:
                </p>
              </div>
            </div>

            <ol className="ml-11 space-y-2 text-gray-700">
              <li>
                1. Go to{" "}
                <a
                  href="https://appstoreconnect.apple.com/access/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-green-600 underline"
                >
                  App Store Connect → Users and Access → Keys
                  <ExternalLink size={14} />
                </a>
              </li>
              <li>2. Click the "+" button to create a new key</li>
              <li>
                3. Give it a name (e.g., "CI/CD Key") and select access level
                (usually <strong>Developer</strong> or <strong>Admin</strong>)
              </li>
              <li>
                4. Click <strong>Generate</strong>
              </li>
              <li>
                5. <strong>Download the .p8 file immediately</strong> (you can
                only download it once!)
              </li>
              <li>
                6. Note your <strong>Key ID</strong> and{" "}
                <strong>Issuer ID</strong> from the page
              </li>
            </ol>
          </div>

          {/* Step 2: Enter Your Details */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                2
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  Enter Your API Key Details
                </h2>
                <p className="mt-2 text-gray-600">
                  Fill in your Key ID and Issuer ID to generate configuration
                  files:
                </p>
              </div>
            </div>

            <div className="ml-11 space-y-4">
              <label className="flex flex-col text-left">
                <span className="mb-1 font-medium">Key ID</span>
                <input
                  value={keyId}
                  onChange={(e) => setKeyId(e.target.value)}
                  className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
                  placeholder="XXXXXXXXXX (10 characters)"
                  maxLength={10}
                />
                <span className="mt-1 text-sm text-gray-500">
                  Found in App Store Connect → Users and Access → Keys
                </span>
              </label>

              <label className="flex flex-col text-left">
                <span className="mb-1 font-medium">Issuer ID</span>
                <input
                  value={issuerId}
                  onChange={(e) => setIssuerId(e.target.value)}
                  className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
                  placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx (UUID)"
                />
                <span className="mt-1 text-sm text-gray-500">
                  Found at the top of the Keys page in App Store Connect
                </span>
              </label>

              <label className="flex flex-col text-left">
                <span className="mb-1 font-medium">
                  Private Key (.p8 file content) - Optional
                </span>
                <textarea
                  value={privateKey}
                  onChange={(e) => setPrivateKey(e.target.value)}
                  className="h-32 rounded-xl border border-gray-300 bg-white p-2 font-mono text-sm text-gray-900"
                  placeholder="-----BEGIN PRIVATE KEY-----&#10;MIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEH...&#10;-----END PRIVATE KEY-----"
                />
                <span className="mt-1 text-sm text-gray-500">
                  Optional: For environment variable configuration
                </span>
              </label>
            </div>
          </div>

          {/* Step 3: Use in Fastlane */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                3
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  Use with Fastlane
                </h2>
                <p className="mt-2 text-gray-600">
                  Add your API key to Fastlane configuration:
                </p>
              </div>
            </div>

            <div className="ml-11">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Option A: File-based (Recommended)
                </h3>
                <button
                  onClick={() => handleCopy(fastlaneConfig, "fastlane")}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  {copied === "fastlane" ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
                <code>{fastlaneConfig}</code>
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                Place your{" "}
                <code className="rounded bg-gray-100 px-1">AuthKey_*.p8</code>{" "}
                file in the same directory as your Appfile.
              </p>

              <div className="mt-6 mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                  Option B: Environment Variables
                </h3>
                <button
                  onClick={() => handleCopy(fastlaneEnv, "env")}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  {copied === "env" ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
                <code>{fastlaneEnv}</code>
              </pre>
            </div>
          </div>

          {/* Step 4: Test Your Setup */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-bold text-white">
                4
              </span>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  Test Your API Connection
                </h2>
              </div>
            </div>

            <div className="ml-11">
              <p className="mb-3 text-gray-600">
                Use this example cURL command to test your API connection:
              </p>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Example API Request
                </span>
                <button
                  onClick={() => handleCopy(curlExample, "curl")}
                  className="flex items-center gap-2 rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  {copied === "curl" ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
                <code>{curlExample}</code>
              </pre>
              <p className="mt-2 text-sm text-gray-600">
                You'll need to generate a JWT token from your private key first.
                See{" "}
                <a
                  href="https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 underline"
                >
                  Apple's documentation
                </a>{" "}
                for details.
              </p>
            </div>
          </div>

          {/* Security Tips */}
          <div className="rounded-2xl bg-red-50 p-6">
            <h3 className="mb-2 font-semibold text-red-900">
              🔒 Security Best Practices
            </h3>
            <ul className="space-y-1 text-sm text-red-800">
              <li>
                • <strong>Never commit</strong> your .p8 private key file to Git
              </li>
              <li>
                • Add <code className="rounded bg-red-100 px-1">*.p8</code> to
                your .gitignore
              </li>
              <li>
                • Use environment variables or secret management (GitHub
                Secrets, AWS Secrets Manager, etc.)
              </li>
              <li>• Rotate keys regularly and revoke unused keys</li>
              <li>
                • Use the minimum required access level (avoid Admin if
                possible)
              </li>
            </ul>
          </div>

          {/* Common Use Cases */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold text-gray-900">
              📱 Common Use Cases
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                • <strong>Fastlane:</strong> Automate app uploads with{" "}
                <code className="rounded bg-gray-100 px-1">
                  fastlane deliver
                </code>
              </li>
              <li>
                • <strong>TestFlight:</strong> Upload builds with{" "}
                <code className="rounded bg-gray-100 px-1">
                  fastlane pilot upload
                </code>
              </li>
              <li>
                • <strong>CI/CD:</strong> Integrate with GitHub Actions,
                CircleCI, Bitrise, etc.
              </li>
              <li>
                • <strong>Metadata Management:</strong> Update screenshots,
                descriptions, and keywords programmatically
              </li>
              <li>
                • <strong>Analytics:</strong> Fetch sales and analytics data via
                API
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-gray-500">
          Built with ❤️ by{" "}
          <a
            href="https://nextnative.dev"
            className="font-semibold text-green-600 underline hover:text-green-700"
          >
            NextNative.dev
          </a>{" "}
          team.
        </p>
      </div>
    </div>
  );
}
