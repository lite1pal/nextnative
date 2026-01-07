"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

const nextNativeAllInId =
  process.env.NEXT_PUBLIC_STRIPE_NEXTNATIVE_ALL_IN_PRODUCT_ID;

export default function ThankYouPageStripe({
  paymentData,
  isInvited,
}: {
  paymentData: any;
  isInvited: boolean;
}) {
  const [githubUsername, setGithubUsername] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInvitedGithub, setIsInvitedGithub] = useState(isInvited ?? false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername || !paymentData.payment_id) {
      setError("GitHub username and payment ID are required");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/submit-username-stripe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: paymentData.payment_id,
          githubUsername,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit username");

      setIsInvitedGithub(true);
    } catch (err) {
      console.log(err);
      setError(
        "Something went wrong. Please write me on email: denistarasenko@nextnative.dev",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isInvitedGithub) {
    return (
      <InvitedMessage productId={paymentData?.product_cart?.[0]?.product_id} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl sm:p-8"
    >
      <h1 className="mb-4 text-3xl font-bold text-gray-800">
        Complete your NextNative purchase
      </h1>
      <p className="mb-6 text-gray-600">
        Enter your GitHub username to get access to the private repository.
      </p>

      <AnimatePresence>
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="githubUsername"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              GitHub Username
            </label>
            <input
              type="text"
              id="githubUsername"
              value={githubUsername}
              onChange={(e) => setGithubUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., johndoe"
              required
              aria-describedby="githubUsername-error"
            />
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 text-sm text-red-500"
              id="githubUsername-error"
            >
              <XCircleIcon className="h-4 w-4" />
              {error}
            </motion.p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full cursor-pointer rounded-lg px-4 py-2 font-medium text-white transition-colors ${
              isLoading
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit"
            )}
          </button>
        </motion.form>
      </AnimatePresence>
    </motion.div>
  );
}

function GoToDocsButton() {
  return (
    <div className="sm:text-center">
      <p>
        To start building your dream app, please check the{" "}
        <a
          href="https://nextnative.dev/docs"
          className="text-blue-600 underline"
        >
          documentation
        </a>
      </p>
    </div>
  );
}

function InvitedMessage({ productId }: { productId?: string }) {
  const isAllIn = productId === nextNativeAllInId;

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <CheckCircleIcon className="mx-auto mb-4 h-12 w-12 text-green-500" />
      <p className="text-2xl font-medium text-gray-800">
        You're in! Your GitHub invite is on the way 🚀
      </p>
      <p className="mt-2 text-xl text-gray-600">
        Welcome to the fast lane of mobile development.
      </p>

      {isAllIn && (
        <div className="mx-auto mt-6 max-w-md space-y-2 text-left text-gray-700">
          <p>
            📱 Here's your{" "}
            <a
              href={process.env.NEXT_PUBLIC_IOS_PUBLISHING_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              iOS Publishing Guide
            </a>
            . Everything you need to get live on the App Store.
          </p>
          <p>
            🤖 Here's your{" "}
            <a
              href={process.env.NEXT_PUBLIC_ANDROID_PUBLISHING_GUIDE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              Android Publishing Guide
            </a>
            . Everything you need to get live on Google Play.
          </p>
        </div>
      )}

      <div className="mt-6">
        <GoToDocsButton />
      </div>

      <GoToRepositoryButton />
    </motion.div>
  );
}

function GoToRepositoryButton() {
  return (
    <div className="flex flex-col items-center gap-5">
      <a
        href="https://github.com/lite1pal/nextnative_boilerplate"
        className="mt-4 inline-block text-blue-600 underline hover:text-blue-800"
      >
        <button
          className={`mt-3 w-full cursor-pointer rounded-lg bg-blue-600 px-8 py-2 font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          Go to the NextNative repository
        </button>
      </a>
      <p className="max-w-md text-xs text-gray-600 sm:text-center">
        If the page is not found, make sure that you're logged in Github account
        with the same username that you gave in the form.
      </p>
    </div>
  );
}
