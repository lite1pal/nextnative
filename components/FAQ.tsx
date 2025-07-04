"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Subheading from "./Subheading";
import { trackEvent } from "@/services/custom-analytics";
import Link from "next/link";

const faqItems = [
  {
    question: "What exactly am I getting here?",
    answer: (
      <>
        You're getting a complete Next.js boilerplate optimized for
        cross-platform development with Capacitor. This allows you to build
        native iOS and Android apps using your web skills.
        <br />
        <br /> The package includes pre-configured essential features: payment
        processing, database integration, user authentication, push
        notifications, and production-ready template apps you can start with.
        <br />
        <br />
        I've handled all the complex technical setup so you can focus on
        building your app's unique features right away.
      </>
    ),
  },
  {
    question: "What is Capacitor?",
    answer: (
      <>
        Capacitor is an open-source native runtime developed by the Ionic team.
        <br />
        <br />
        It lets you run modern web apps (like those built with Next.js or React)
        as native apps on iOS and Android, with full access to native features
        like the camera, GPS, offline storage, haptics, and more.
        <br />
        <br />
        Unlike React Native, you write standard web code (HTML, CSS, and
        JavaScript), and Capacitor wraps it in a native shell that can access
        platform APIs.
      </>
    ),
  },
  {
    question: "Capacitor vs React Native?",
    answer: (
      <>
        Great question!
        <br />
        <br />
        React Native uses a custom renderer and its own component system, so
        you're not really writing web code, you're learning a parallel mobile
        ecosystem.
        <br />
        <br />
        Capacitor, on the other hand, lets you use your existing web stack
        (Next.js, Tailwind, etc.) and runs it in a WebView, giving you direct
        access to native APIs via plugins.
        <br />
        <br />
        TL;DR: If you're a web dev who wants to ship on mobile fast, Capacitor
        is simpler and more familiar.
      </>
    ),
  },

  {
    question: "Can I use my favorite UI libraries?",
    answer: (
      <>
        Absolutely!
        <br />
        <br /> While the starter comes with TailwindCSS pre-configured, you can
        use any UI library you want - DaisyUI, ShadcnUI, you name it. <br />
        <br />
        The architecture is designed to be flexible, so you can make it your
        own.
      </>
    ),
  },
  {
    question: "Is this TypeScript or JavaScript?",
    answer: (
      <>
        It's all TypeScript!
        <br />
        <br />I believe it makes your life easier in the long run. But don't
        worry if you're new to TypeScript, the code is written in a way that's
        easy to understand and modify.
        <br />
        <br />
        If you prefer JavaScript, you can easily convert it. Just change the
        file extensions and remove the type annotations. The core logic will
        remain the same, and you'll still have all the features you need.
      </>
    ),
  },
  {
    question: "Do I need to deal with Xcode and Android Studio?",
    answer: (
      <>
        Yeah, you'll need both to test on real devices.
        <br />
        <br /> But don't stress - I've got{" "}
        <a href="https://docs.nextnative.dev">clear guides</a> to help you set
        everything up. <br />
        <br />
        Plus, you can do all of your development right in your browser,
        emulator, or even a physical device!
      </>
    ),
  },
  {
    question: "How long until I can publish to the stores?",
    answer: (
      <>
        The initial store setup and review process can take a few days. <br />
        <br />
        Apple and Google need to review your app, and they might have questions.
        <br />
        <br />
        But once you're set up, future updates and publishing are lightning
        fast!
        <br />
        <br />
        I've included detailed guides (coming soon) to help you through the
        process.
      </>
    ),
  },
  {
    question: "When do I get the App Store / Play Store guides?",
    answer: (
      <>
        The App Store (iOS) guide is delivered immediately after purchase via
        email.
        <br />
        <br />
        The Play Store (Android) guide is coming in 3–7 days.
        <br />
        <br />
        It’s being finalized based on real launch experience to make sure it's
        battle-tested, accurate, and easy to follow.
      </>
    ),
  },

  {
    question: "Can I use Next.js server actions?",
    answer: "Nope, but you can use Next.js Serverless API endpoints instead.",
  },
  {
    question: "How long does it take to launch an app?",
    answer: (
      <>
        With NextNative, you can have a basic app running in 5 minutes!
        <br />
        <br />
        The real timeline depends on your app's complexity. <br />
        <br />
        Way faster than starting from scratch!
      </>
    ),
  },
  {
    question: "Do I need to know mobile development?",
    answer: (
      <>
        Nope! If you know React and Next.js, you're good to go.
        <br />
        <br />
        Capacitor handles all the mobile-specific stuff behind the scenes.
        <br />
        <br />
        You just write React code like you normally would!
      </>
    ),
  },
  {
    question: "How often is NextNative updated?",
    answer: (
      <>
        I ship a lot and use NextNative for my own apps (like Lasting Habits),
        so it gets regular update.
        <br />
        <br />
        <span className="text-primary">🔄 Last update: today</span>
      </>
    ),
  },

  {
    question: "Can I see some apps built with NextNative?",
    answer: (
      <>
        Yes, check out the Lasting Habits app built with NextNative.
        <br />
        <br />
        You can find it on the{" "}
        <Link
          href="https://apps.apple.com/ua/app/lasting-habits/id6736766976"
          target="_blank"
          rel="noopener noreferrer"
        >
          App Store
        </Link>
        . It's coming soon to the Play Store.
        <br />
        <br />
        Visit{" "}
        <Link className="text-primary" href="/showcase">
          Showcase
        </Link>{" "}
        to see all apps built, or in progress, with NextNative.
      </>
    ),
  },
  {
    question: "What if it's not what I expected?",
    answer: (
      <>
        I don't offer refunds because you get immediate access to all the code.
        <br />
        <br />
        Please review{" "}
        <a
          className="text-primary underline"
          href="https://docs.nextnative.dev"
        >
          the features and benefits
        </a>{" "}
        to ensure it meets your needs before purchasing.
        <br />
        <br /> NextNative gets better with every update, so you'll always have
        access to the latest features and improvements.
        <br />
        <br /> But in any case, I'm super responsive to questions and feedback.
        <br />
        <br />
        Just reach out via email{" "}
        <a
          className="text-primary underline"
          href="mailto:deniskatarasenko6@gmail.com"
        >
          deniskatarasenko6@gmail.com
        </a>
        , or via Twitter/X{" "}
        <a
          target="_blank"
          className="text-primary underline"
          href="https://x.com/shipwithdenis"
        >
          @shipwithdenis
        </a>{" "}
        if you need help! <br />
        <br />I want you to succeed with this.
      </>
    ),
  },
];

function FAQ() {
  return (
    <div className="flex flex-col gap-10 py-12 md:py-20 mx-auto">
      <Subheading heading1="Got a question?" heading2="I got an answer!" />

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
              <AccordionTrigger className="text-lg text-start md:py-7 cursor-pointer sm:text-xl md:text-2xl font-[500] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-base sm:text-lg text-gray-500 font-medium">
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
