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
    <div className="flex min-h-screen bg-white items-center justify-center z-50 absolute top-0 left-0 right-0 w-screen flex-col">
      {/* Code Copy Button - Fixed to screen */}
      <div className="fixed bottom-6 right-6 z-50">
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
        className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow w-full">
        {/* Hero Section */}
        <section
          id="hero"
          className="bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <ProductHero
            title="Build Better SaaS Products, Faster"
            description="Launch your SaaS with our proven template. Streamline development and focus on what matters most - delivering value to your customers."
            ctaText="Get Started"
            secondaryCtaText="Book a Demo"
            imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072"
          />
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeatureCards.component />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <motion.div
            className="max-w-7xl mx-auto"
            initial="hidden"
            animate="visible"
          >
            <motion.div className="text-center mb-16">
              <span className="text-primary font-medium mb-4 block">
                Pricing Plans
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Choose the plan that's right for you
                <br />
                and start building today
              </h2>
              <div className="flex items-center justify-center gap-2 text-lg">
                <svg
                  className="w-5 h-5 text-green-400"
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

            <motion.div className="grid text-white md:grid-cols-3 gap-8">
              {/* Starter Plan */}
              <motion.div className="bg-[#1a1a1a] rounded-2xl p-8">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gray-500 line-through">$299</span>
                  <span className="text-4xl font-bold">$199</span>
                  <span className="text-gray-400">USD</span>
                </div>
                <h3 className="text-xl font-semibold mb-6">Starter</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-400 shrink-0"
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
                      className="w-5 h-5 text-green-400 shrink-0"
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
                      <span className="px-2 py-0.5 text-xs bg-green-400/20 text-green-400 rounded-full">
                        Updated weekly
                      </span>
                    </div>
                  </li>
                </ul>
                <button className="w-full py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Get Started Now
                </button>
                <p className="text-gray-500 text-sm text-center mt-4">
                  30-day money-back guarantee
                </p>
              </motion.div>

              {/* All-in Plan */}
              <motion.div className="bg-[#1a1a1a] rounded-2xl p-8">
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gray-500 line-through">$349</span>
                  <span className="text-4xl font-bold">$249</span>
                  <span className="text-gray-400">/year</span>
                </div>
                <h3 className="text-xl font-semibold mb-6">Professional</h3>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-green-400 shrink-0"
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
                      className="w-5 h-5 text-green-400 shrink-0"
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
                      className="w-5 h-5 text-green-400 shrink-0"
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
                      className="w-5 h-5 text-green-400 shrink-0"
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
                      <span className="px-2 py-0.5 text-xs bg-green-400/20 text-green-400 rounded-full">
                        24/7 Available
                      </span>
                    </div>
                  </li>
                </ul>
                <button className="w-full py-4 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                  Start Professional Plan
                </button>
                <p className="text-gray-500 text-sm text-center mt-4">
                  Includes 30-day satisfaction guarantee
                </p>
              </motion.div>

              {/* Bundle Plan */}
              <motion.div className="relative bg-[#1a1a1a] rounded-2xl p-8 ring-4 ring-green-400">
                <div className="absolute -top-3 right-6 px-3 py-1 bg-green-400 text-black text-sm font-medium rounded-full">
                  BEST VALUE
                </div>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-gray-500 line-through">$599</span>
                  <span className="text-4xl font-bold">$399</span>
                  <span className="text-gray-400">/year</span>
                </div>
                <h3 className="text-xl font-semibold mb-1">Enterprise</h3>
                <p className="text-gray-400 mb-6">
                  Everything in Professional, plus...
                </p>
                <div className="bg-black/30 rounded-xl p-4 mb-8">
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      className="w-5 h-5 text-green-400"
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
                <button className="w-full py-4 bg-green-400 text-black font-medium rounded-lg hover:bg-green-500 transition-colors">
                  Contact Sales
                </button>
                <p className="text-gray-500 text-sm text-center mt-4">
                  Custom pricing for enterprise needs
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-white">
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="py-24 bg-gradient-to-b from-slate-50/50 to-white relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              accentText="Contact Us"
              title="Get in Touch"
              subtitle="Have questions? Our team is here to help you get started with our platform."
            />
            <div className="max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-8 border border-slate-200/60">
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
        className="text-center py-8"
      >
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-slate-600 mb-6">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {features.map((feature, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
        >
          <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
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
          <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          <p className="text-slate-600">{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-200 w-full">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"></div>
              <span className="font-bold text-xl text-white">SaasTemplate</span>
            </div>
            <p className="text-slate-400">
              Build better SaaS products, faster with our versatile template.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="#"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Changelog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Customers
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white mb-4">Subscribe</h3>
            <p className="text-slate-400 mb-4">
              Get the latest updates and news straight to your inbox.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Email address"
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500"
              />
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} SaasTemplate. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            <Link
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
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
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-r from-violet-600 to-indigo-600"></div>
              <span className="font-bold text-xl">SaasTemplate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
            >
              Contact
            </Link>
            <div className="pl-6 flex items-center gap-2">
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
          <div className="container py-4 flex flex-col gap-4">
            <Link
              href="#features"
              className="px-2 py-1 text-lg font-medium hover:text-indigo-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="px-2 py-1 text-lg font-medium hover:text-indigo-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="px-2 py-1 text-lg font-medium hover:text-indigo-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="px-2 py-1 text-lg font-medium hover:text-indigo-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2 flex flex-col gap-2">
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
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="text-xl text-slate-600 max-w-md">{description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
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
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-indigo-600/20 rounded-2xl transform rotate-3"></div>
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt="Product screenshot"
              width={500}
              height={500}
              className="w-full h-auto"
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-lg inline-flex items-center">
          <button
            onClick={() => setAnnual(false)}
            className={`px-4 py-2 rounded-md ${
              !annual
                ? "bg-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setAnnual(true)}
            className={`px-4 py-2 rounded-md ${
              annual
                ? "bg-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Annual{" "}
            <span className="text-xs text-emerald-600 font-medium">
              Save 15%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border ${
              plan.isPopular
                ? "border-indigo-200 ring-1 ring-indigo-600"
                : "border-slate-200"
            }`}
          >
            {plan.isPopular && (
              <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-center py-1.5 text-sm font-medium">
                Most Popular
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
              <p className="text-slate-600 mb-4">{plan.description}</p>

              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">
                  ${annual ? plan.annualPrice : plan.monthlyPrice}
                </span>
                <span className="text-slate-600 ml-2">
                  /{annual ? "year" : "month"}
                </span>
              </div>

              <Button
                className={`w-full mb-6 ${
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
                    <Check className="h-5 w-5 text-emerald-500 mr-2 shrink-0" />
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-xl shadow border border-slate-100 flex flex-col"
        >
          <div className="mb-4 flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < testimonial.stars
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-200"
                }`}
              />
            ))}
          </div>

          <blockquote className="flex-1 mb-6">
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
      className="text-center mb-16"
    >
      {accentText && (
        <span className="text-indigo-600 font-medium mb-4 block">
          {accentText}
        </span>
      )}
      <h2 className="text-4xl sm:text-5xl font-[500] mb-6">{title}</h2>
      <p className="text-gray-600 text-xl max-w-3xl mx-auto">{subtitle}</p>
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
