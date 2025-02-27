"use client";

import { useState } from "react";
import type { ShowcaseComponent } from "../index";

function Component() {
  const [testimonials] = useState([
    {
      content:
        "This product has completely transformed how we work. The efficiency gains are incredible.",
      author: "Sarah Johnson",
      role: "CTO at TechCorp",
      image: "https://i.pravatar.cc/100?img=1",
    },
    {
      content:
        "The best investment we've made this year. Customer support is outstanding.",
      author: "Michael Chen",
      role: "Founder at StartupX",
      image: "https://i.pravatar.cc/100?img=2",
    },
    {
      content: "Simple to use yet powerful. Exactly what we were looking for.",
      author: "Emily Rodriguez",
      role: "Product Manager",
      image: "https://i.pravatar.cc/100?img=3",
    },
  ]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[500] mb-4">
            Trusted by thousands
          </h2>
          <p className="text-gray-600 text-lg">
            See what our customers have to say
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 rounded-2xl border bg-white hover:shadow-xl transition-all duration-200"
            >
              <div className="flex flex-col gap-6">
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-[500]">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const SimpleTestimonial: ShowcaseComponent = {
  id: "simple-testimonial",
  name: "Simple Testimonial",
  description: "A grid of customer testimonials with avatars",
  category: "testimonials",
  component: Component,
  code: `"use client";

import { useState } from "react";

export default function SimpleTestimonial() {
  const [testimonials] = useState([
    {
      content: "This product has completely transformed how we work. The efficiency gains are incredible.",
      author: "Sarah Johnson",
      role: "CTO at TechCorp",
      image: "https://i.pravatar.cc/100?img=1"
    },
    {
      content: "The best investment we've made this year. Customer support is outstanding.",
      author: "Michael Chen",
      role: "Founder at StartupX",
      image: "https://i.pravatar.cc/100?img=2"
    },
    {
      content: "Simple to use yet powerful. Exactly what we were looking for.",
      author: "Emily Rodriguez",
      role: "Product Manager",
      image: "https://i.pravatar.cc/100?img=3"
    }
  ]);

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-[500] mb-4">
            Trusted by thousands
          </h2>
          <p className="text-gray-600 text-lg">
            See what our customers have to say
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="p-6 rounded-2xl border bg-white hover:shadow-xl transition-all duration-200"
            >
              <div className="flex flex-col gap-6">
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-[500]">{testimonial.author}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
};
