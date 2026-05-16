"use client";

import Button from "@/components/Button";
import HighlightedSpan from "@/components/HighlightedSpan";
import { sendMessageToTelegram } from "@/services/telegram";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RATE_LIMIT = 60 * 1000;

const EmailForm = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const lastSubmissionTime = localStorage.getItem("lastSubmissionTime");
    const currentTime = Date.now();

    if (
      lastSubmissionTime &&
      currentTime - parseInt(lastSubmissionTime) < RATE_LIMIT
    ) {
      toast.error("Please wait a minute before submitting again.");
      return;
    }

    setIsSubmitted(true);
    try {
      sendMessageToTelegram(
        "Message from /contact page:\n" + JSON.stringify(formData, null, 2),
      );

      setFormData({ name: "", email: "", message: "" });
      //   toast.success("Thanks! You'll hear from me soon.", {
      //     position: "bottom-center",
      //     duration: 8000,
      //     className: "text-lg",
      //   });
      localStorage.setItem("lastSubmissionTime", currentTime.toString());

      // Send email
    } catch (error) {
      console.error("Error sending email:", error);
      setIsSubmitted(false);
    }
  };

  return (
    <div className="py-12">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col gap-6">
          <h1 className="text-4xl font-[500]">
            Contact me about <HighlightedSpan>NextNative</HighlightedSpan>
          </h1>
          <p className="text-gray hidden text-lg sm:block">
            Have questions, feedback, or just want to say hi? <br />
            Fill out the form below and I'll get back to you as soon as I can.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-lg font-medium text-gray-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
                className="border-gray/0 text-foreground placeholder:text-gray focus:border-primary w-full flex-1 rounded-xl border-2 bg-white px-6 py-2 text-lg focus:outline-none md:py-4"
              />
            </div>

            <div>
              <label
                className="mb-2 block text-lg font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
                className="border-gray/0 text-foreground placeholder:text-gray focus:border-primary w-full flex-1 rounded-xl border-2 bg-white px-6 py-2 text-lg focus:outline-none md:py-4"
              />
            </div>
          </div>

          <div>
            <label
              className="mb-2 block text-lg font-medium text-gray-700"
              htmlFor="message"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              style={{ boxShadow: "0px 4px 44px rgba(0, 0, 0, 0.05)" }}
              className="border-gray/0 text-foreground placeholder:text-gray focus:border-primary w-full flex-1 rounded-xl border-2 bg-white px-6 py-2 text-lg focus:outline-none md:py-4"
            />
          </div>

          {isSubmitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="text-primary text-xl font-semibold">
                Message sent!
              </div>
              <div className="text-gray text-lg">
                Thanks for reaching out. I'll get back to you soon.
              </div>
            </div>
          ) : (
            <Button
              disabled={isSubmitted}
              variant="primary"
              type="submit"
              className="mx-auto"
            >
              Send a message
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailForm;
