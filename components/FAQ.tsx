import * as React from "react";
import Subheading from "./Subheading";
import Link from "next/link";
import TrackEventWrapper from "./TrackEventWrapper";

const faqItems = [
  {
    question: "What exactly am I getting here?",
    answer: (
      <>
        You're getting a production-ready Next.js + Capacitor boilerplate that
        lets you ship real iOS & Android apps using your existing web stack.
        <br />
        <br />
        Inside the kit you’ll find:
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>Next.js + Capacitor setup wired together and tested</li>
          <li>
            7 production-ready template apps (Messenger, Pomodoro, Sproutly AI,
            etc.)
          </li>
          <li>Secure backend + database</li>
          <li>Payments, in-app purchases & subscriptions already integrated</li>
          <li>Push notifications, onboarding flows</li>
          <li>App Store / Google Play launch guides + 3 months dev support</li>
        </ul>
      </>
    ),
  },
  {
    question: "Who is NextNative for (and not for)?",
    answer: (
      <>
        NextNative is for:
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>
            Web devs comfortable with React / Next.js who want to ship on mobile
            fast
          </li>
          <li>
            Indie hackers and small teams who don’t want to learn a whole new
            stack
          </li>
          <li>
            Agencies who need to deliver production apps for clients quickly
          </li>
        </ul>
        <br />
        It’s probably <span className="font-semibold">not</span> for you if:
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>You're looking for pure native Swift/Kotlin code</li>
          <li>You're a complete beginner who has never built a React app</li>
          <li>You need a very custom 3D / game-engine style app</li>
        </ul>
        <br />
        If you can ship a basic app with React/Next.js today, you’ll feel at
        home here.
      </>
    ),
  },
  {
    question: "Can I use this for multiple apps or client projects?",
    answer: (
      <>
        Yes. Both plans let you use NextNative for unlimited projects.
        <br />
        <br />
        The difference is:
        <ul className="mt-2 ml-5 list-disc space-y-1">
          <li>
            <span className="font-semibold">Starter</span> – one developer can
            use the kit commercially across unlimited apps and clients.
          </li>
          <li>
            <span className="font-semibold">All-in</span> – team license, so
            your whole team can use it on unlimited projects.
          </li>
        </ul>
        <br />
        You don’t pay per app or per install – just a one-time license.
      </>
    ),
  },
  {
    question: "What if I already have a Next.js web app?",
    answer: (
      <>
        That’s a great starting point.
        <br />
        <br />
        You can reuse most of your existing pages, components and logic inside
        the NextNative structure, then plug into the mobile-specific pieces:
        navigation, auth, native APIs, payments, and store builds.
        <br />
        <br />
        Many devs start by dropping in their existing Next.js project and wiring
        up mobile-only features step by step.
      </>
    ),
  },
  {
    question: "Do I need to know mobile development?",
    answer: (
      <>
        No. If you know React and Next.js, you’re good.
        <br />
        <br />
        Capacitor handles the mobile-specific bridge behind the scenes.
        <br />
        <br />
        You just write React code like you normally would.
      </>
    ),
  },
  {
    question:
      "How long until I can publish, and when do I get the App Store / Play Store guides?",
    answer: (
      <>
        The initial store account setup and first review usually takes a few
        days (Apple and Google need to review your app and might have
        questions).
        <br />
        <br />
        After that, updates are much faster – often hours.
        <br />
        <br />
        All App Store (iOS) and Google Play (Android) launch guides are
        delivered immediately after purchase, so you can follow them step by
        step from day one.
        <br />
        <br />
        And if you get stuck, you can email me and I’ll help.
      </>
    ),
  },
  {
    question: "What if it's not what I expected?",
    answer: (
      <>
        I want you to feel confident about your purchase. If you join and feel
        that NextNative isn’t the right fit, just reach out within 14 days and
        I’ll refund you in full, no questions asked.
        <br />
        <br />
        You’ll get immediate access to all the source code, mobile-related
        logic, and templates, so you can evaluate everything properly before
        making your final decision.
        <br />
        <br />
        If you have any questions or need guidance, I'm always here to help.
        <br />
        <br />
        Just email{" "}
        <a
          className="text-primary underline"
          href="mailto:denistarasenko@nextnative.dev"
        >
          denistarasenko@nextnative.dev
        </a>{" "}
        or message me on Twitter/X{" "}
        <a
          target="_blank"
          className="text-primary underline"
          href="https://x.com/shipwithdenis"
        >
          @shipwithdenis
        </a>
        .
        <br />
        <br />I genuinely want you to succeed and ship great apps faster 💚
      </>
    ),
  },
  {
    question: "Can I see some apps built with NextNative?",
    answer: (
      <>
        Yes! <br /> <br /> Visit{" "}
        <Link className="text-primary" href="/showcase">
          Showcase
        </Link>{" "}
        to see all apps built, or in progress, with NextNative.
        <br />
        <br />
        Some of them are included in the package, like{" "}
        <a
          className="text-primary"
          href="https://apps.apple.com/ua/app/sproutly-ai-plant-identifier/id6748902696"
          target="_blank"
        >
          Sproutly: AI Plant Identifier.
        </a>
        <br />
        <br /> Soon more to come!
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
        React Native uses its own component system and bridge, so you’re
        learning a parallel mobile ecosystem instead of building on your web
        skills.
        <br />
        <br />
        Capacitor lets you keep using your existing stack (Next.js, React,
        Tailwind) and wraps it in a native shell with access to device APIs.
        <br />
        <br />
        If you're a web dev who wants to ship real apps quickly, Capacitor is
        simpler and more familiar. If you need pixel-perfect native UI for a
        huge consumer app and have a dedicated mobile team, React Native or pure
        native might fit better.
      </>
    ),
  },

  {
    question: "Can I use Next.js Server Actions?",
    answer: (
      <>
        Not in the mobile shell itself.
        <br />
        <br />
        For mobile, NextNative uses Next.js API routes instead of Server
        Actions. You still get type-safe server code, but with a simpler, proven
        deployment model that works great with Capacitor builds.
        <br />
        <br />
        If you already use Server Actions on the web side, you can keep them
        there and expose the same logic through API endpoints for the mobile
        app.
      </>
    ),
  },
  {
    question: "Do I need to deal with Xcode and Android Studio?",
    answer: (
      <>
        Yes – you’ll need both to test on real devices and create store builds.
        <br />
        <br />
        But don’t stress: I’ve got{" "}
        <a
          className="text-primary underline"
          href="https://nextnative.dev/docs"
        >
          clear step-by-step guides
        </a>{" "}
        for Xcode and Android Studio, with the exact commands and screenshots I
        use.
        <br />
        <br />
        Day to day, you can still do 99% of development in your browser and
        editor. You only open the native tools when you’re ready to ship.
      </>
    ),
  },

  {
    question: "Can I use my favorite UI libraries?",
    answer: (
      <>
        Absolutely.
        <br />
        <br />
        NextNative comes with Tailwind CSS pre-configured, but you can use any
        UI library you want – DaisyUI, shadcn/ui, your own design system, etc.
        <br />
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
        It’s all TypeScript.
        <br />
        <br />
        That gives you better DX and fewer runtime bugs. The code is written in
        a clear, easy-to-follow way, so even if you’re new to TS you can still
        understand and modify it.
        <br />
        <br />
        Prefer JavaScript? You can convert pieces gradually – change file
        extensions and strip types. The core logic stays the same.
      </>
    ),
  },
  // {
  //   question: "How often is NextNative updated?",
  //   answer: (
  //     <>
  //       I use NextNative for my own apps (like Lasting Habits and Sproutly AI),
  //       so it gets regular updates whenever there’s a real-world need.
  //       <br />
  //       <br />
  //       You get all new features, improvements and fixes as part of your
  //       one-time purchase.
  //       <br />
  //       <br />
  //       <span className="text-primary">🔄 Last update: Dec 8, 2025</span>
  //       <br />
  //       <br />
  //       <span className="text-lg font-semibold">🛠 Currently working on:</span>
  //       <ul className="mt-2 ml-4 space-y-1">
  //         <li>1. Supabase / JWT Authentication option</li>
  //         <li>2. Biometrics / Face ID / Touch ID</li>
  //       </ul>
  //     </>
  //   ),
  // },
];

function FAQ() {
  return (
    <div id="faq" className="mx-auto flex flex-col gap-10 py-12 md:py-20">
      <Subheading heading1="Got a question?" heading2="I got an answer!" />

      <div className="ml-auto w-full xl:max-w-1/2">
        <Accordion type="single" collapsible>
          {faqItems.map((item, index) => (
            <TrackEventWrapper
              key={index}
              eventName={`FAQ_${item.question}_clicked`}
            >
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="cursor-pointer text-start text-lg font-[500] hover:no-underline sm:text-xl md:py-7 md:text-2xl">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base font-medium text-gray-500 sm:text-lg">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </TrackEventWrapper>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default FAQ;

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "data-[state=open]:text-primary flex flex-1 items-center justify-between py-4 font-medium hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
    {...props}
  >
    <div className={cn("pt-0 pb-4", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;
