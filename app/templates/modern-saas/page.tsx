"use client";

import { motion, useScroll } from "framer-motion";
import { useState } from "react";
import { Check, CircleCheck, Copy, Github, Linkedin, Lock } from "lucide-react";
import { Compass } from "lucide-react";
import { RefreshCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import {
  BarChart3,
  Facebook,
  Instagram,
  Menu,
  Send,
  Twitter,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { FeatureCards } from "@/components/component-showcase/components/features/feature-cards";

export default function ModernSaasTemplate() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="absolute top-0 right-0 left-0 z-50 flex min-h-screen w-screen flex-col items-center justify-center bg-white">
      {/* Code Copy Button - Fixed to screen */}
      <div className="fixed right-6 bottom-6 z-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            onClick={() => {
              navigator.clipboard.writeText(document.documentElement.outerHTML);
              alert("Landing page code copied to clipboard!");
            }}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
          >
            <Copy className="h-4 w-4" />
            Copy Page Code
          </Button>
        </motion.div>
      </div>

      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-indigo-600"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="w-full flex-grow">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 to-white"
        >
          <div className="bg-grid-slate-100 absolute inset-0 -z-10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <ProductHero
            title="Build Better SaaS Products, Faster"
            description="Launch your SaaS with our proven template. Streamline development and focus on what matters most - delivering value to your customers."
            ctaText="Get Started"
            secondaryCtaText="Book a Demo"
            imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
          />
        </section>

        {/* Features Section */}
        <section id="features" className="bg-white py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <FeatureCards.component />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative overflow-hidden py-24">
          <motion.div
            className="mx-auto max-w-7xl"
            initial="hidden"
            animate="visible"
          >
            <motion.div className="mb-16 text-center">
              <span className="text-primary mb-4 block font-medium">
                Pricing Plans
              </span>
              <h2 className="mb-6 text-4xl font-bold sm:text-5xl">
                Choose the plan that's right for you
                <br />
                and start building today
              </h2>
              <div className="flex items-center justify-center gap-2 text-lg">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-green-400">Limited Time</span>
                <span className="text-gray-400">
                  Save 20% with annual billing
                </span>
              </div>
            </motion.div>

            <motion.div className="grid gap-8 text-white md:grid-cols-3">
              {/* Starter Plan */}
              <motion.div className="rounded-2xl bg-[#1a1a1a] p-8">
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-gray-500 line-through">$299</span>
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-gray-400">USD</span>
                </div>
                <h3 className="mb-6 text-xl font-semibold">Starter</h3>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Complete component library</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div className="flex items-center gap-2">
                      <span>Regular updates</span>
                      <span className="rounded-full bg-green-400/20 px-2 py-0.5 text-xs text-green-400">
                        Updated weekly
                      </span>
                    </div>
                  </li>
                </ul>
                <button className="bg-primary hover:bg-primary/90 w-full rounded-lg py-4 font-medium text-white transition-colors">
                  Get Started Now
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  30-day money-back guarantee
                </p>
              </motion.div>

              {/* All-in Plan */}
              <motion.div className="rounded-2xl bg-[#1a1a1a] p-8">
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-gray-500 line-through">$349</span>
                  <span className="text-4xl font-bold">$249</span>
                  <span className="text-gray-400">/year</span>
                </div>
                <h3 className="mb-6 text-xl font-semibold">Professional</h3>
                <ul className="mb-8 space-y-4">
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Everything in Starter</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Priority Support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>Advanced Features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="h-5 w-5 shrink-0 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <div className="flex items-center gap-2">
                      <span>Premium Support</span>
                      <span className="rounded-full bg-green-400/20 px-2 py-0.5 text-xs text-green-400">
                        24/7 Available
                      </span>
                    </div>
                  </li>
                </ul>
                <button className="bg-primary hover:bg-primary/90 w-full rounded-lg py-4 font-medium text-white transition-colors">
                  Start Professional Plan
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  Includes 30-day satisfaction guarantee
                </p>
              </motion.div>

              {/* Bundle Plan */}
              <motion.div className="relative rounded-2xl bg-[#1a1a1a] p-8 ring-4 ring-green-400">
                <div className="absolute -top-3 right-6 rounded-full bg-green-400 px-3 py-1 text-sm font-medium text-black">
                  BEST VALUE
                </div>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-gray-500 line-through">$599</span>
                  <span className="text-4xl font-bold">$399</span>
                  <span className="text-gray-400">/year</span>
                </div>
                <h3 className="mb-1 text-xl font-semibold">Enterprise</h3>
                <p className="mb-6 text-gray-400">
                  Everything in Professional, plus...
                </p>
                <div className="mb-8 rounded-xl bg-black/30 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="font-medium">Custom Solutions</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-400">
                    <li>• Dedicated Account Manager</li>
                    <li>• Custom Integrations</li>
                    <li>• Advanced Security Features</li>
                  </ul>
                </div>
                <button className="w-full rounded-lg bg-green-400 py-4 font-medium text-black transition-colors hover:bg-green-500">
                  Contact Sales
                </button>
                <p className="mt-4 text-center text-sm text-gray-500">
                  Custom pricing for enterprise needs
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="bg-white py-24">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              accentText="Testimonials"
              title="What Our Customers Say"
              subtitle="Don't just take our word for it. See what our customers have to say about their experience."
            />
            <Testimonials />
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative overflow-hidden bg-gradient-to-b from-slate-50/50 to-white py-24"
        >
          <div className="bg-grid-slate-100 absolute inset-0 -z-10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              accentText="Contact Us"
              title="Get in Touch"
              subtitle="Have questions? Our team is here to help you get started with our platform."
            />
            <div className="mx-auto max-w-3xl">
              <div className="rounded-xl border border-slate-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-8 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="mb-2 text-2xl font-bold">Message Sent!</h3>
        <p className="mb-6 text-slate-600">
          Thank you for reaching out! We'll get back to you within 24 hours.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <Input id="name" placeholder="John Doe" required />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email Address
          </label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="company" className="text-sm font-medium">
            Company
          </label>
          <Input id="company" placeholder="Your Company" />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Subject
          </label>
          <Select>
            <SelectTrigger id="subject">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Inquiry</SelectItem>
              <SelectItem value="support">Technical Support</SelectItem>
              <SelectItem value="sales">Sales Question</SelectItem>
              <SelectItem value="partnership">
                Partnership Opportunity
              </SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Message
        </label>
        <Textarea
          id="message"
          placeholder="Tell us how we can help..."
          className="min-h-[120px]"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="privacy-policy"
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          required
        />
        <label htmlFor="privacy-policy" className="text-sm text-slate-600">
          I agree to the{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            Terms of Service
          </a>
        </label>
      </div>

      <Button
        type="submit"
        className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            Sending...
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Message
          </div>
        )}
      </Button>
    </form>
  );
}

const features = [
  {
    title: "Real-time Analytics",
    description:
      "Get instant insights with our powerful analytics dashboard that updates in real-time.",
    icon: BarChart3,
    imageSrc:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200",
  },
  {
    title: "Lightning Fast",
    description:
      "Optimized for speed and performance, our platform loads in milliseconds, not seconds.",
    icon: Zap,
    imageSrc:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=200",
  },
  {
    title: "Enterprise Security",
    description:
      "Bank-level security ensures your data is always protected and private.",
    icon: Lock,
  },
  {
    title: "Seamless Integration",
    description:
      "Connect with your favorite tools and services with our extensive API.",
    icon: RefreshCw,
  },
  {
    title: "Intuitive Navigation",
    description:
      "Our user-friendly interface makes it easy to find what you need, when you need it.",
    icon: Compass,
  },
  {
    title: "99.9% Uptime",
    description:
      "Rest easy knowing your service is always available with our industry-leading uptime.",
    icon: CircleCheck,
  },
];

function FeatureGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
            {feature.imageSrc ? (
              <Image
                src={feature.imageSrc}
                alt={feature.title}
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            ) : (
              // @ts-ignore
              <></>
              // <feature.icon className="h-6 w-6 text-indigo-600" />
            )}
          </div>
          <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
          <p className="text-slate-600">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-slate-900 text-slate-200">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"></div>
              <span className="text-xl font-bold text-white">SaasTemplate</span>
            </div>
            <p className="text-slate-400">
              Build better SaaS products, faster with our versatile template.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 transition-colors hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-white">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-medium text-white">Subscribe</h3>
            <p className="mb-4 text-slate-400">
              Get the latest updates and news straight to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                className="border-slate-700 bg-slate-800 text-white placeholder:text-slate-500"
              />
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 md:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} SaasTemplate. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-slate-400 transition-colors hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"></div>
              <span className="text-xl font-bold">SaasTemplate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Contact
            </Link>
            <div className="flex items-center gap-2 pl-6">
              <Button variant="outline">Log in</Button>
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                Sign up
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden"
        >
          <div className="container flex flex-col gap-4 py-4">
            <Link
              href="#features"
              className="px-2 py-1 text-lg font-medium transition-colors hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="px-2 py-1 text-lg font-medium transition-colors hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="px-2 py-1 text-lg font-medium transition-colors hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="px-2 py-1 text-lg font-medium transition-colors hover:text-indigo-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Button variant="outline" className="w-full justify-center">
                Log in
              </Button>
              <Button className="w-full justify-center bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                Sign up
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}

interface ProductHeroProps {
  title: string;
  description: string;
  ctaText: string;
  secondaryCtaText?: string;
  imageSrc: string;
}

function ProductHero({
  title,
  description,
  ctaText,
  secondaryCtaText,
  imageSrc,
}: ProductHeroProps) {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 lg:py-32">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="max-w-md text-xl text-slate-600">{description}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              {ctaText}
            </Button>
            {secondaryCtaText && (
              <Button size="lg" variant="outline">
                {secondaryCtaText}
              </Button>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 rotate-3 transform rounded-2xl bg-gradient-to-r from-violet-600/20 to-indigo-600/20"></div>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Product screenshot"
              width={500}
              height={500}
              className="h-auto w-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const plans = [
  {
    name: "Starter",
    description:
      "Perfect for individuals and small teams just getting started.",
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      "Up to 5 projects",
      "Basic analytics",
      "24-hour support response time",
      "5GB storage",
      "3 team members",
    ],
    isPopular: false,
    ctaText: "Get Started",
  },
  {
    name: "Professional",
    description:
      "Ideal for growing businesses that need more power and features.",
    monthlyPrice: 79,
    annualPrice: 790,
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "4-hour support response time",
      "25GB storage",
      "10 team members",
      "Custom integrations",
      "Priority support",
    ],
    isPopular: true,
    ctaText: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description:
      "For large organizations requiring advanced features and support.",
    monthlyPrice: 199,
    annualPrice: 1990,
    features: [
      "Unlimited everything",
      "Enterprise analytics",
      "1-hour support response time",
      "Unlimited storage",
      "Unlimited team members",
      "Custom development",
      "Dedicated account manager",
      "On-premise deployment option",
    ],
    isPopular: false,
    ctaText: "Contact Sales",
  },
];

function SimplePricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-center">
        <div className="inline-flex items-center rounded-lg bg-slate-100 p-1">
          <button
            onClick={() => setAnnual(false)}
            className={`rounded-md px-4 py-2 ${
              !annual
                ? "bg-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`rounded-md px-4 py-2 ${
              annual
                ? "bg-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Annual{" "}
            <span className="text-xs font-medium text-emerald-600">
              Save 15%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`overflow-hidden rounded-xl border shadow-sm transition-shadow hover:shadow-md ${
              plan.isPopular
                ? "border-indigo-200 ring-1 ring-indigo-600"
                : "border-slate-200"
            }`}
          >
            {plan.isPopular && (
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 py-1.5 text-center text-sm font-medium text-white">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <h3 className="mb-1 text-xl font-bold">{plan.name}</h3>
              <p className="mb-4 text-slate-600">{plan.description}</p>

              <div className="mb-6 flex items-baseline">
                <span className="text-4xl font-bold">
                  ${annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="ml-2 text-slate-600">
                  /{annual ? "year" : "month"}
                </span>
              </div>

              <Button
                className={`mb-6 w-full ${
                  plan.isPopular
                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                    : ""
                }`}
                variant={plan.isPopular ? "default" : "outline"}
              >
                {plan.ctaText}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 shrink-0 text-emerald-500" />
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "This platform has transformed how our team works. The features are intuitive and the support is excellent.",
    author: "Sarah Johnson",
    role: "CTO at TechForward",
    avatarSrc:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    stars: 5,
  },
  {
    quote:
      "I've tried many SaaS products before, but this one stands out for its thoughtful design and powerful capabilities.",
    author: "Michael Chang",
    role: "Founder of ChangeTech",
    avatarSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
    stars: 5,
  },
  {
    quote:
      "The ROI we've seen since implementing this solution has been remarkable. Our productivity has increased by 37%.",
    author: "Emma Rodriguez",
    role: "Operations Director at Elevate Inc",
    avatarSrc:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150",
    stars: 4,
  },
];

function Testimonials() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col rounded-xl border border-slate-100 bg-white p-6 shadow"
        >
          <div className="mb-4 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < testimonial.stars
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>

          <blockquote className="mb-6 flex-1">
            <p className="text-slate-700 italic">"{testimonial.quote}"</p>
          </blockquote>

          <div className="flex items-center">
            <div className="mr-4">
              <Image
                src={testimonial.avatarSrc || "/placeholder.svg"}
                alt={testimonial.author}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-medium">{testimonial.author}</p>
              <p className="text-sm text-slate-600">{testimonial.role}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function SectionHeader({
  title,
  subtitle,
  accentText,
}: {
  title: string;
  subtitle: string;
  accentText?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="mb-16 text-center"
    >
      {accentText && (
        <span className="mb-4 block font-medium text-indigo-600">
          {accentText}
        </span>
      )}
      <h2 className="mb-6 text-4xl font-[500] sm:text-5xl">{title}</h2>
      <p className="mx-auto max-w-3xl text-xl text-gray-600">{subtitle}</p>
    </motion.div>
  );
}

//       <div id="template-code" className="hidden">
//         {`"use client";

// import { motion, useScroll, useTransform } from "framer-motion";
// import { ProductHero } from "@/components/component-showcase/components/hero/product-hero";
// import { FeatureGrid } from "@/components/component-showcase/components/features/feature-grid";
// import { SimplePricing } from "@/components/component-showcase/components/pricing/simple-pricing";
// import { SimpleTestimonial } from "@/components/component-showcase/components/testimonials/simple-testimonial";
// import { ContactForm } from "@/components/component-showcase/components/forms/contact-form";

// // ... Rest of the component code ...`}
//       </div>
