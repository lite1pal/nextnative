import Testimonial from "./Testimonial";

function TerryTestimonial() {
  return (
    <Testimonial
      imgSrc={"/testimonials/terry.webp"}
      name="Terry Carson"
      description="Developer"
      showStars
      testimonial={
        <div>
          NextNative is a great tool for{" "}
          <span className="bg-primary rounded p-1 font-[500] text-white">
            rapidly developing
          </span>{" "}
          cross-platform mobile apps, especially if you are coming from a
          Next.js background.
          <br />
          <br />
          It provides a structured starting point with modern tooling to get
          your project{" "}
          <span className="bg-primary rounded p-1 font-[500] text-white">
            off the ground quickly.
          </span>
        </div>
      }
    />
  );
}

export default TerryTestimonial;
