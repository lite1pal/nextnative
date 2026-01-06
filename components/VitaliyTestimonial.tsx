import Testimonial from "./Testimonial";

function VitaliyTestimonial() {
  return (
    <Testimonial
      imgSrc={"/testimonials/vitaliy.webp"}
      name="Vitalii Zabrodskyi"
      description="Senior .NET Developer"
      showStars
      testimonial={
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
      }
    />
  );
}

export default VitaliyTestimonial;
