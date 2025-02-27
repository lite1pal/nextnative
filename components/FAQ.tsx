"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Subheading from "./Subheading";

const faqItems = [
  {
    question: "What do I get exactly?",
    answer:
      "The NextJS starter with all the boilerplate code you need to run a cross-platform mobile app: a payment system, a database, login, a blog, UI components, and much more.",
  },
  {
    question: "Javascript or Typescript?",
    answer: "Typescript",
  },
  {
    question: "Should I install Xcode & Android Studio?",
    answer:
      "Yes, you need to install Xcode and Android Studio to run the app on your phone.",
  },
  {
    question: "Can I get a refund?",
    answer: "No, you can't get a refund.",
  },
  {
    question: "Can I use Next.js server actions?",
    answer:
      "No, you can't use server actions. We use Next.js serverless functions instead.",
  },
];

function FAQ() {
  return (
    <div className="flex flex-col gap-10 py-12 md:py-20 mx-auto px-4 md:px-0">
      <Subheading
        heading1="Got a question?"
        heading2="We got an answer!"
        className="items-center md:items-start text-center md:text-left"
      />

      <div className="ml-auto xl:max-w-1/2 w-full">
        <Accordion type="single" collapsible>
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg cursor-pointer sm:text-xl md:text-2xl font-[500] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg text-gray">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;
