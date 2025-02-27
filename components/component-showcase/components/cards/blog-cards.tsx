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

  const posts = [
    {
      title: "From Passive Watching to Active Learning: Your Video Content",
      category: "Productivity",
      image: "/illustrations/growth.svg",
      href: "#",
    },
    {
      title: "5 Must-Watch YouTube Channels for Learning to Code in 2024",
      category: "Get Started",
      image: "/illustrations/coding.svg",
      href: "#",
    },
    {
      title: "How Top CEOs Extract Knowledge from Business Videos and Podcasts",
      category: "Quick Tips",
      image: "/illustrations/business.svg",
      href: "#",
    },
  ];

  return (
    <div className="py-20 px-4 bg-[#f8f9f8]">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.title}
              variants={itemVariants}
              className="group relative bg-sage-100 rounded-3xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(45deg,#f0f2f0_25%,transparent_25%,transparent_75%,#f0f2f0_75%,#f0f2f0),linear-gradient(45deg,#f0f2f0_25%,transparent_25%,transparent_75%,#f0f2f0_75%,#f0f2f0)] bg-[length:20px_20px] bg-[position:0_0,10px_10px] opacity-50 rounded-3xl" />

              {/* Content */}
              <div className="relative">
                <div className="aspect-[4/3] mb-6 bg-sage-200/50 rounded-2xl overflow-hidden">
                  <div
                    className="w-full h-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center">
                    {post.category === "Productivity" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {post.category === "Get Started" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {post.category === "Quick Tips" && (
                      <svg
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span className="text-sm font-medium">{post.category}</span>
                  </div>

                  <h3 className="text-xl font-semibold leading-tight">
                    {post.title}
                  </h3>

                  <div className="pt-4">
                    <a
                      href={post.href}
                      className="inline-flex items-center text-sm font-medium hover:underline"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export const BlogCards: ShowcaseComponent = {
  id: "blog-cards",
  name: "Blog Cards",
  description:
    "A modern blog cards section with category icons and hover effects",
  category: "cards",
  component: Component,
  code: `"use client";

import { motion } from "framer-motion";

export default function BlogCards() {
  return (
    <div className="py-20 px-4 bg-[#f8f9f8]">
      {/* ... rest of the component code ... */}
    </div>
  );
}`,
};
