"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";

export default function ThankYouPage({ isInvited }: { isInvited: boolean }) {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id");
  const [githubUsername, setGithubUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!githubUsername) {
      setError("GitHub username is required");
      return;
    }

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/submit-username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId, githubUsername }),
      });

      if (!response.ok) throw new Error("Failed to submit username");
      setSuccess(true);
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInvited) {
    return <InvitedMessage />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl mx-auto shadow-2xl max-w-lg w-full p-6 sm:p-8"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Complete your NextNative purchase
      </h1>
      <p className="text-gray-600 mb-6">
        Enter your GitHub username to get access to the private repository.
      </p>

      <AnimatePresence>
        {success ? (
          <SuccessMessage />
        ) : (
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
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                GitHub Username
              </label>
              <input
                type="text"
                id="githubUsername"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                placeholder="e.g., johndoe"
                required
                aria-describedby="githubUsername-error"
              />
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm flex items-center gap-1"
                id="githubUsername-error"
              >
                <XCircleIcon className="w-4 h-4" />
                {error}
              </motion.p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 cursor-pointer px-4 rounded-lg text-white font-medium transition-colors ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function SuccessMessage() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <CheckCircleIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
      <p className="text-lg text-gray-800">
        Username submitted successfully and you have been invited to the
        NextNative repository!
      </p>
      <GoToDocsButton />

      <div className="flex mt-5 items-center justify-center">
        <img
          src="/how-to-accept-invite.gif"
          className="rounded-xl"
          alt="GitHub invitation"
        />
      </div>
      <GoToRepositoryButton />
    </motion.div>
  );
}

function GoToDocsButton() {
  return (
    <div className="text-center">
      <p>To get started building your app fast, please check the</p>
      <a href="https://docs.nextnative.dev" className="text-blue-600 underline">
        documentation
      </a>
    </div>
  );
}

function InvitedMessage() {
  return (
    <div className="h-[500px] flex-col mx-auto flex items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Thank you for your purchase!
      </h1>
      <p className="text-gray-600 mb-6">
        You have been invited to the private repository.
      </p>
      <GoToDocsButton />
      <GoToRepositoryButton />
    </div>
  );
}

function GoToRepositoryButton() {
  return (
    <div className="flex flex-col gap-5">
      <a
        href="https://github.com/lite1pal/nextnative_boilerplate"
        className="mt-4 inline-block text-blue-600 hover:text-blue-800 underline"
      >
        <button
          className={`w-full py-2 cursor-pointer px-8 mt-3 rounded-lg text-white font-medium transition-colors bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
        >
          Go to the NextNative repository
        </button>
      </a>
      <p className="text-gray-600 text-xs max-w-md text-center">
        If the page is not found, make sure that you're logged in Github account
        with the same username that you gave in the form.
      </p>
    </div>
  );
}
