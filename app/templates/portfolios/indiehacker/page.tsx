"use client";

import Image from "next/image";
import { MapPin, Briefcase } from "lucide-react";

export default function ProductShowcase() {
  const products = [
    {
      id: 1,
      name: "DevSprint",
      icon: "code",
      description: "Master development skills in record time",
      revenue: "$72k/mo",
      graphData: [55, 60, 70, 65, 80, 95, 220, 180, 150],
      yAxisLabels: ["$55k", "$220k"],
      color: "cyan",
    },
    {
      id: 2,
      name: "LaunchPad",
      icon: "zap",
      description: "From concept to launch in a single sprint",
      revenue: "$31.6k/mo",
      graphData: [35, 140, 120, 100, 90, 110, 100, 90, 80],
      yAxisLabels: ["$35k", "$140k"],
      color: "purple",
    },
    {
      id: 3,
      name: "MetricsMind",
      icon: "bar-chart",
      description: "Data-driven growth strategies that deliver",
      revenue: "$1.7k/mo",
      graphData: [400, 410, 420, 430, 450, 500, 600, 900, 1600],
      yAxisLabels: ["$400", "$1.6k"],
      color: "pink",
    },
    {
      id: 4,
      name: "BillFlow",
      icon: "mail",
      description: "Streamlined billing automation for founders",
      revenue: "$512/mo",
      graphData: [450, 1800, 1200, 1400, 1000, 1600, 1200, 1000, 900],
      yAxisLabels: ["$450", "$1.8k"],
      color: "emerald",
    },
    {
      id: 5,
      name: "FounderHub",
      icon: "file-text",
      description: "Your digital headquarters for all ventures",
      revenue: "$1.8k/mo",
      graphData: [2000, 3000, 4000, 8000, 5000, 7000, 8000, 6000, 2000],
      yAxisLabels: ["$2k", "$8k"],
      color: "blue",
    },
    {
      id: 6,
      name: "ConvertPro",
      icon: "cookie",
      description: "Transform casual browsers into loyal customers",
      revenue: "$28/mo",
      graphData: [750, 3000, 2800, 2600, 2400, 2200, 2000, 1800, 1600],
      yAxisLabels: ["$750", "$3k"],
      color: "amber",
    },
  ];

  return (
    <div className="min-h-screen bg-white fixed top-0 left-0 right-0 text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Products Grid - Now on the left */}
          <div className="lg:col-span-8 lg:order-1 order-2">
            <div className="grid gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Profile Section - Now on the right */}
          <div className="lg:col-span-4 lg:order-2 order-1 space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <div className="flex flex-col items-center text-center">
                <div className="relative w-32 h-32 mb-6 ring-4 ring-purple-500 rounded-full">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    alt="Profile"
                    fill
                    className="rounded-full bg-gray-800 object-cover"
                  />
                </div>

                <h2 className="text-3xl font-bold text-white mb-2">
                  Alex Rivera
                </h2>

                <div className="flex items-center gap-4 text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>Singapore</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">$112k/month</span>
                  </div>
                </div>

                <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-4"></div>

                <p className="text-gray-300 italic mb-6">
                  "Turning rejection into opportunity, one startup at a time."
                </p>

                <div className="w-full">
                  <p className="text-white font-bold mb-2">
                    <span className="text-cyan-400">41,500+</span> entrepreneurs
                    follow my journey
                  </p>
                  <p className="text-gray-400 mb-6">
                    I document my process for identifying market gaps, building
                    MVPs, and scaling profitable ventures
                  </p>
                </div>
              </div>

              <div className="space-y-6 mt-6">
                <SubscribeForm />
                <SocialLinks />
                <BuildButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Sparkles } from "lucide-react";

function BuildButton() {
  return (
    <div>
      <p className="text-sm font-medium text-gray-300 mb-2">
        Ready to showcase your work?
      </p>
      <Link
        href="#"
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-colors w-full font-medium"
      >
        <Sparkles className="w-4 h-4" />
        <span>Create Your Portfolio</span>
      </Link>
    </div>
  );
}

import { Code, Zap, BarChart, Mail, FileText, Cookie } from "lucide-react";

interface Product {
  id: number;
  name: string;
  icon: string;
  description: string;
  revenue: string;
  graphData: number[];
  yAxisLabels: string[];
  color: string;
}

function ProductCard({ product }: { product: Product }) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "code":
        return <Code className="w-5 h-5" />;
      case "zap":
        return <Zap className="w-5 h-5" />;
      case "bar-chart":
        return <BarChart className="w-5 h-5" />;
      case "mail":
        return <Mail className="w-5 h-5" />;
      case "file-text":
        return <FileText className="w-5 h-5" />;
      case "cookie":
        return <Cookie className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case "cyan":
        return "bg-cyan-900/50 text-cyan-400 ring-cyan-700/50";
      case "purple":
        return "bg-purple-900/50 text-purple-400 ring-purple-700/50";
      case "pink":
        return "bg-pink-900/50 text-pink-400 ring-pink-700/50";
      case "emerald":
        return "bg-emerald-900/50 text-emerald-400 ring-emerald-700/50";
      case "blue":
        return "bg-blue-900/50 text-blue-400 ring-blue-700/50";
      case "amber":
        return "bg-amber-900/50 text-amber-400 ring-amber-700/50";
      default:
        return "bg-gray-800 text-gray-400 ring-gray-700";
    }
  };

  const getGradient = (color: string) => {
    switch (color) {
      case "cyan":
        return "from-cyan-500/20 to-cyan-500/5";
      case "purple":
        return "from-purple-500/20 to-purple-500/5";
      case "pink":
        return "from-pink-500/20 to-pink-500/5";
      case "emerald":
        return "from-emerald-500/20 to-emerald-500/5";
      case "blue":
        return "from-blue-500/20 to-blue-500/5";
      case "amber":
        return "from-amber-500/20 to-amber-500/5";
      default:
        return "from-gray-700/20 to-gray-700/5";
    }
  };

  const getStrokeColor = (color: string) => {
    switch (color) {
      case "cyan":
        return "#22d3ee";
      case "purple":
        return "#a855f7";
      case "pink":
        return "#ec4899";
      case "emerald":
        return "#34d399";
      case "blue":
        return "#3b82f6";
      case "amber":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="bg-indigo-900 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-900/10">
      <div className="p-6">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`p-2.5 rounded-lg ${getIconColor(
                product.color
              )} ring-1`}
            >
              {getIcon(product.icon)}
            </div>
            <div>
              <h3 className="font-bold text-xl text-white">{product.name}</h3>
              <p className="text-gray-400 text-sm">{product.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-gray-800 text-white px-2.5 py-1 rounded-md">
            <span className="text-sm font-medium">{product.revenue}</span>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{product.yAxisLabels[0]}</span>
            <span>{product.yAxisLabels[1]}</span>
          </div>
          <div className="relative h-24 bg-gradient-to-b rounded-lg p-2 pt-0 pb-0 overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-b ${getGradient(
                product.color
              )} rounded-lg`}
            ></div>
            <svg className="w-full h-full relative z-10" viewBox="0 0 100 30">
              <path
                d={`M 0,${
                  30 -
                  (product.graphData[0] / Math.max(...product.graphData)) * 30
                } 
                  ${product.graphData
                    .map((value, index) => {
                      const x = (index / (product.graphData.length - 1)) * 100;
                      const y =
                        30 - (value / Math.max(...product.graphData)) * 30;
                      return `L ${x},${y}`;
                    })
                    .join(" ")}`}
                fill="none"
                stroke={getStrokeColor(product.color)}
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Apr</span>
            <span>Jun</span>
            <span>Aug</span>
            <span>Oct</span>
            <span>Dec</span>
            <span>Feb</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import { Twitter, Youtube, Linkedin, Instagram } from "lucide-react";

function SocialLinks() {
  return (
    <div>
      <p className="text-sm font-medium text-gray-300 mb-2">Connect with me</p>
      <div className="grid grid-cols-4 gap-2">
        <Link
          href="#"
          className="flex justify-center items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-cyan-400 transition-colors"
          aria-label="Twitter"
        >
          <Twitter className="w-5 h-5" />
        </Link>
        <Link
          href="#"
          className="flex justify-center items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-red-400 transition-colors"
          aria-label="YouTube"
        >
          <Youtube className="w-5 h-5" />
        </Link>
        <Link
          href="#"
          className="flex justify-center items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5" />
        </Link>
        <Link
          href="#"
          className="flex justify-center items-center p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-pink-400 transition-colors"
          aria-label="Instagram"
        >
          <Instagram className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SubscribeForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle subscription logic here
    console.log("Subscribing email:", email);
    setEmail("");
  };

  return (
    <div>
      <p className="text-sm font-medium text-gray-300 mb-2">
        Join my newsletter
      </p>
      <form onSubmit={handleSubmit} className="flex w-full">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-r-none border-gray-700 bg-gray-800 text-white focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-0 focus-visible:border-purple-500"
          required
        />
        <Button
          type="submit"
          className="rounded-l-none bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
}
