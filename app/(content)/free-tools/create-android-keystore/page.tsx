"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import HighlightedSpan from "@/components/HighlightedSpan";

export default function CreateAndroidKeystore() {
  const [alias, setAlias] = useState("myapp");
  const [keystoreName, setKeystoreName] = useState("myapp-release");
  const [validity, setValidity] = useState(10000);
  const [copied, setCopied] = useState(false);

  const command = `keytool -genkeypair -v -storetype PKCS12 -keystore ${keystoreName}.keystore -alias ${alias} -keyalg RSA -keysize 2048 -validity ${validity}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto w-full max-w-[962px] py-12 xl:max-w-[1260px]">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-12 py-10 text-center">
          <h1 className="mb-4 text-4xl font-semibold text-gray-900 md:text-[74px] md:leading-[91px]">
            Create Android <HighlightedSpan>Keystore</HighlightedSpan> 🔐
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-600">
            Generate the keytool command to create an Android keystore for
            signing your app. Perfect for React Native, Capacitor, and Ionic
            developers.
          </p>

          {/* Social proof / usage stats */}
          <div className="mx-auto flex flex-wrap items-center justify-center gap-6 text-base text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                🔐
              </span>
              <span>
                <strong className="text-gray-900">Secure</strong> signing
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl" aria-hidden="true">
                ⚡
              </span>
              <span>
                <strong className="text-gray-900">One command</strong> setup
              </span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-3xl" aria-hidden="true">
                📱
              </span>
              <span>
                <strong className="text-gray-900">Production ready</strong>
              </span>
            </div>
          </div>
        </div>

        {/* Input Form */}
        <div className="mb-8 space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-gray-900">
            Keystore Configuration
          </h2>

          <label className="flex flex-col text-left">
            <span className="mb-1 font-medium">Keystore Filename</span>
            <input
              value={keystoreName}
              onChange={(e) => setKeystoreName(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              placeholder="myapp-release"
            />
            <span className="mt-1 text-sm text-gray-500">
              Will create: {keystoreName}.keystore
            </span>
          </label>

          <label className="flex flex-col text-left">
            <span className="mb-1 font-medium">Key Alias</span>
            <input
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
              placeholder="myapp"
            />
            <span className="mt-1 text-sm text-gray-500">
              Used to reference this key in your build configuration
            </span>
          </label>

          <label className="flex flex-col text-left">
            <span className="mb-1 font-medium">Validity (days)</span>
            <input
              type="number"
              value={validity}
              onChange={(e) => setValidity(+e.target.value)}
              className="rounded-xl border border-gray-300 bg-white p-2 text-gray-900"
            />
            <span className="mt-1 text-sm text-gray-500">
              Google recommends 10,000+ days (27+ years)
            </span>
          </label>
        </div>

        {/* Generated Command */}
        <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-900 p-6 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              Generated Command
            </h2>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
            >
              {copied ? (
                <>
                  <Check size={16} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={16} /> Copy
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto text-sm text-green-400">
            <code>{command}</code>
          </pre>
        </div>

        {/* Instructions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              📋 How to Use
            </h2>
            <ol className="space-y-2 text-gray-700">
              <li>
                <strong>1.</strong> Copy the command above
              </li>
              <li>
                <strong>2.</strong> Open your terminal and navigate to your
                project directory
              </li>
              <li>
                <strong>3.</strong> Paste and run the command
              </li>
              <li>
                <strong>4.</strong> You'll be prompted to enter:
                <ul className="mt-1 ml-6 list-disc space-y-1 text-sm">
                  <li>Keystore password (choose a strong password)</li>
                  <li>Key password (can be the same as keystore password)</li>
                  <li>
                    Personal details (name, organization, city, state, country
                    code)
                  </li>
                </ul>
              </li>
              <li>
                <strong>5.</strong> The keystore file will be created in your
                current directory
              </li>
            </ol>
          </div>

          <div className="rounded-2xl bg-red-50 p-6">
            <h3 className="mb-2 font-semibold text-red-900">
              ⚠️ Important Security Notes
            </h3>
            <ul className="space-y-1 text-sm text-red-800">
              <li>
                • <strong>Never commit your keystore to Git</strong> – Add
                *.keystore to your .gitignore
              </li>
              <li>
                • <strong>Back up your keystore file</strong> – Store it
                securely in multiple locations
              </li>
              <li>
                • <strong>Save your passwords</strong> – Without them, you
                cannot sign app updates
              </li>
              <li>
                • <strong>If you lose your keystore</strong>, you'll need to
                publish a new app with a different package name
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold text-gray-900">
              🔧 Using with Capacitor
            </h3>
            <p className="mb-3 text-sm text-gray-700">
              Add these to your{" "}
              <code className="rounded bg-gray-100 px-1">
                android/key.properties
              </code>{" "}
              file:
            </p>
            <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-green-400">
              <code>
                {`storeFile=../${keystoreName}.keystore\nstorePassword=YOUR_KEYSTORE_PASSWORD\nkeyAlias=${alias}\nkeyPassword=YOUR_KEY_PASSWORD`}
              </code>
            </pre>
            <p className="mt-3 text-sm text-gray-500">
              Then reference this in your{" "}
              <code className="rounded bg-gray-100 px-1">
                android/app/build.gradle
              </code>{" "}
              signing config.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 font-semibold text-gray-900">
              📦 Prerequisites
            </h3>
            <p className="text-sm text-gray-700">
              The <code className="rounded bg-gray-100 px-1">keytool</code>{" "}
              command comes with the Java Development Kit (JDK). If you don't
              have it installed:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-gray-700">
              <li>
                • <strong>macOS:</strong>{" "}
                <code className="rounded bg-gray-100 px-1">
                  brew install openjdk
                </code>
              </li>
              <li>
                • <strong>Ubuntu/Debian:</strong>{" "}
                <code className="rounded bg-gray-100 px-1">
                  sudo apt install default-jdk
                </code>
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
