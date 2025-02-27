"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Frontend Developer",
    company: "TechStart",
    image: "/testimonials/sarah.jpg",
    quote:
      "NextNative saved us weeks of development time. The setup was incredibly smooth, and our app was in the stores within days.",
  },
  {
    name: "Michael Rodriguez",
    role: "CTO",
    company: "AppLabs",
    image: "/testimonials/michael.jpg",
    quote:
      "We were skeptical about using web tech for our mobile app, but NextNative proved us wrong. The performance is incredible.",
  },
  {
    name: "Emily Watson",
    role: "Indie Developer",
    company: "Self-employed",
    image: "/testimonials/emily.jpg",
    quote:
      "As a solo developer, NextNative was a game-changer. I launched my first app without touching any native code.",
  },
];

function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <div className="py-12 md:py-20">
      <div className="relative max-w-[764px] mx-auto">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-4">
            <Image
              src={testimonials[current].image}
              alt={testimonials[current].name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div className="flex flex-col items-start">
              <p className="font-[500] text-lg">{testimonials[current].name}</p>
              <p className="text-gray text-sm">
                {testimonials[current].role} at {testimonials[current].company}
              </p>
            </div>
          </div>

          <blockquote className="text-xl md:text-2xl italic">
            "{testimonials[current].quote}"
          </blockquote>

          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === current ? "bg-primary" : "bg-gray/20"
                }`}
                onClick={() => {
                  setCurrent(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>

        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 text-gray hover:text-foreground transition-colors"
          onClick={() => {
            setCurrent(
              (prev) => (prev - 1 + testimonials.length) % testimonials.length
            );
            setIsAutoPlaying(false);
          }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray hover:text-foreground transition-colors"
          onClick={() => {
            setCurrent((prev) => (prev + 1) % testimonials.length);
            setIsAutoPlaying(false);
          }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

export default TestimonialCarousel;
