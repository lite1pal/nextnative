import { testimonials } from "./TestimonialsSection";
import VideoTestimonial from "./VideoTestimonial";

function LeoVideoTestimonial() {
  const videoTestimonial = testimonials.find(
    (testimonial) => testimonial.type === "video" && testimonial.name === "Leo",
  );

  return (
    <div className="mx-auto mt-16 mb-16 max-w-2xl">
      <VideoTestimonial
        name={videoTestimonial?.name as string}
        videoSrc={videoTestimonial?.videoSrc!}
        testimonial={videoTestimonial?.testimonial}
        showStars={videoTestimonial?.showStars}
        className="my-0 max-w-none"
      />
    </div>
  );
}

export default LeoVideoTestimonial;
