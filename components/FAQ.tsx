"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Subheading from "./Subheading";
import { trackEvent } from "@/services/custom-analytics";

const faqItems = [
  {
    question: "What exactly am I getting here?",
    answer:
      "You're getting a complete Next.js starter kit that turns into a mobile app. It comes with everything you need: payments already set up, database ready to go, authentication, push notifications, and a bunch of UI components. Basically, all the boring stuff is done for you!",
  },
  {
    question: "Can I use my favorite UI libraries?",
    answer:
      "Absolutely! While the starter comes with TailwindCSS pre-configured, you can use any UI library you want - DaisyUI, ShadcnUI, you name it. The architecture is designed to be flexible, so you can make it your own.",
  },
  {
    question: "Is this TypeScript or JavaScript?",
    answer:
      "It's all TypeScript! I believe it makes your life easier in the long run. But don't worry if you're new to TypeScript - the code is written in a way that's easy to understand and modify.",
  },
  {
    question: "Do I need to deal with Xcode and Android Studio?",
    answer:
      "Yeah, you'll need both to test on real devices. But don't stress - we've got clear guides to help you set everything up. Plus, you can do all of your development right in your browser!",
  },
  {
    question: "How long until I can publish to the stores?",
    answer:
      "The initial store setup and review process can take a few days. Apple and Google need to review your app, and they might have questions. But once you're set up, future updates and publishing are lightning fast! I've included detailed guides to help you through the process.",
  },
  {
    question: "What if it's not what I expected?",
    answer:
      "I don't offer refunds because you get immediate access to all the code. But I'm super responsive to questions and feedback. Just reach out if you need help! I want you to succeed with this.",
  },
  {
    question: "Can I use Next.js server actions?",
    answer: "Nope, but you can use Next.js Serverless API endpoints instead.",
  },
  {
    question: "How long does it take to launch an app?",
    answer:
      "With our starter, you can have a basic app running in 10 minutes! The real timeline depends on your app's complexity. Way faster than starting from scratch!",
  },
  {
    question: "Do I need to know mobile development?",
    answer:
      "Nope! If you know React and Next.js, you're good to go. We handle all the mobile-specific stuff behind the scenes. You just write React code like you normally would!",
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
            <AccordionItem
              onClick={() => {
                trackEvent(`FAQ_${item.question}_clicked`);
              }}
              key={index}
              value={`item-${index}`}
            >
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
