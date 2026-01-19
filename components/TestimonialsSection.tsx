import Subheading from "./Subheading";
import VideoTestimonial from "./VideoTestimonial";
import Testimonial from "./Testimonial";

export const testimonials = [
  {
    type: "text",
    imgSrc: "/testimonials/preetam.webp",
    name: "Preetam Nath",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        Love this product.
        <br />
        <br />I was searching for a way to turn my existing Nextjs projects into
        mobile apps without rebuilding them using React Native/Expo.
        <br />
        <br />
        That's how I found NextNative and felt really blessed that{" "}
        <span className="bg-primary rounded p-1 font-[500] text-white">
          a product like this exists!
        </span>
      </div>
    ),
    showStars: true,
  },

  {
    type: "text",
    name: "",
    letters: "Q",
    // description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        NextNative is{" "}
        <span className="bg-primary rounded p-1 font-[500] text-white">
          a simple and easy approach
        </span>{" "}
        to building your apps... a perfect app💪
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "/testimonials/terry.webp",
    name: "Terry Carson",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        NextNative is a great tool for{" "}
        <span className="bg-primary rounded p-1 font-[500] text-white">
          rapidly developing
        </span>{" "}
        cross-platform mobile apps, especially if you are coming from a Next.js
        background.
        <br />
        <br />
        It provides a structured starting point with modern tooling to get your
        project{" "}
        <span className="bg-primary rounded p-1 font-[500] text-white">
          off the ground quickly.
        </span>
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "",
    name: "Happy Customer",
    letters: "S",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        Insane product & a great founder behind it - I've been trying to mess
        around creating mobile apps &{" "}
        <span className="bg-primary rounded p-1 font-[500] text-white">
          I'm getting there bit by bit w/ this helping me hugely!!
        </span>
      </div>
    ),
    showStars: true,
  },
  {
    type: "video",
    name: "Leo",
    description: "Developer",
    videoSrc:
      "https://cdn.nextnative.dev/Product%20Review%20for%20Next%20Native.mp4",
    testimonial: (
      <div>
        "Thank you so much. I bought your product and I freaking loved it!{" "}
        <br /> <br />
        I'm finally free as I'm no longer relying for a frontend developer to
        hook up my backend.
        <br />
        <br />I can do this myself!"
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "/testimonials/sergey.webp",
    name: "Sergey Nazarov",
    description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        <span className="bg-primary rounded p-1 font-[500] text-white">
          the best boilerplate
        </span>{" "}
        for mobile apps
      </div>
    ),
    showStars: true,
  },
  {
    type: "text",
    imgSrc: "/testimonials/vitaliy.webp",
    name: "Vitalii Zabrodskyi",
    description: "Senior .NET Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        The setup seems super easy, and I{" "}
        <span className="bg-primary rounded p-1 font-[500] text-white">
          can’t wait to finally build my app!
        </span>
        <br /> <br />{" "}
        <a
          target="_blank"
          href="https://x.com/nextnative"
          className="text-blue-600"
        >
          @nextnative
        </a>{" "}
        by{" "}
        <a
          target="_blank"
          href="https://x.com/shipwithdenis"
          className="text-blue-600"
        >
          @shipwithdenis
        </a>{" "}
        is such a phenomenal tool!
        <br /> <br /> Wow, just wow!
      </div>
    ),
    showStars: true,
  },

  {
    type: "text",
    imgSrc: "/testimonials/unnamed-2.webp",
    name: "",
    // description: "Developer",
    url: "https://microlaunch.net/p/nextnative",
    testimonial: (
      <div>
        The integration with Next.js is smooth, letting you spin up mobile-ready
        experiences incredibly fast.
        <br />
        <br />
        <span className="bg-primary rounded p-1 font-[500] text-white">
          Perfect for devs who want speed
        </span>{" "}
        without sacrificing flexibility.
      </div>
    ),
    showStars: true,
  },
];

function TestimonialsSection() {
  return (
    <div id="reviews" className="relative overflow-hidden py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <Subheading
            heading1="Loved by"
            heading2="developers"
            className="text-start md:items-center md:text-center"
          />
        </div>

        {/* Masonry Grid Layout */}
        <div className="columns-1 gap-6 space-y-6 md:columns-2">
          {testimonials.map((testimonial, index) => {
            if (testimonial.type === "video") {
              return (
                <div key={index} className="break-inside-avoid">
                  <VideoTestimonial
                    name={testimonial.name}
                    videoSrc={testimonial.videoSrc!}
                    testimonial={testimonial.testimonial}
                    showStars={testimonial.showStars}
                    className="my-0 max-w-none"
                  />
                </div>
              );
            }

            return (
              <div key={index} className="break-inside-avoid">
                <Testimonial
                  imgSrc={testimonial.imgSrc}
                  name={testimonial.name}
                  description={testimonial.description}
                  url={testimonial.url}
                  letters={testimonial.letters}
                  testimonial={testimonial.testimonial}
                  showStars={testimonial.showStars}
                  className="my-0 max-w-none px-8 py-8 sm:py-8"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TestimonialsSection;
