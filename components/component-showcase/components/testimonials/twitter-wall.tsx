"use client";

import { motion } from "framer-motion";
import type { ShowcaseComponent } from "../index";

function Component() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const testimonials = [
    {
      author: "Nat Friedman",
      handle: "@natfriedman",
      avatar: "/avatars/nat.jpg",
      content:
        "Been using granola.so a bit lately; it generates the best meeting notes of anything I've tried so far. Not sure how they did that.",
      date: "Jun 20, 2024",
      stats: { likes: 547, replies: 26 },
      verified: true,
    },
    {
      author: "Guillermo Rauch",
      handle: "@rauchg",
      avatar: "/avatars/guillermo.jpg",
      content: "Write bare notes → ai enhances them\nVery clever ai-native ux:",
      date: "May 22, 2024",
      stats: { likes: 310, replies: 10 },
      verified: true,
    },
    {
      author: "Dan Shipper",
      handle: "@danshipper",
      avatar: "/avatars/dan.jpg",
      content:
        "If you aren't using @meetgranola for your meetings you are seriously missing out.\n\nIncredible product.",
      date: "Jun 4, 2024",
      stats: { likes: 32, replies: 4 },
      verified: true,
    },
    {
      author: "Des Traynor",
      handle: "@destraynor",
      avatar: "/avatars/des.jpg",
      content:
        "Strong recommendation: @meetgranola is an excellent product for meetings.\n\nKey features...\n• Transcripts\n• Summaries (very useful)\n• Interactive Q&A bot for each meeting (e.g. 'what did John say about headcount' → 'he asked for 12 people') - this feature is quite remarkable.",
      date: "Sep 19, 2024",
      stats: { likes: 48, replies: 9 },
      verified: true,
    },
  ];

  return (
    <div className="py-20 px-4 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Built for people with
            <br />
            back-to-back meetings
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.handle}
              variants={itemVariants}
              className="bg-white border rounded-xl p-6 hover:border-gray-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">
                      {testimonial.author}
                    </span>
                    {testimonial.verified && (
                      <svg
                        className="w-5 h-5 text-blue-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="text-gray-500">{testimonial.handle}</div>
                </div>
                <svg
                  className="w-6 h-6 text-[#1DA1F2] flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
                </svg>
              </div>

              <div className="mt-4 whitespace-pre-line">
                {testimonial.content}
              </div>

              <div className="mt-4 flex items-center gap-4 text-gray-500">
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{testimonial.stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{testimonial.stats.replies}</span>
                </div>
                <span>{testimonial.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export const TwitterWall: ShowcaseComponent = {
  id: "twitter-wall",
  name: "Twitter Wall",
  description:
    "A modern testimonials section displaying Twitter-style social proof",
  category: "testimonials",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function TwitterWall() {
  return (
    <div className="py-20 px-4 bg-white">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
