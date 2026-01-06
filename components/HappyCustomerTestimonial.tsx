import Testimonial from "./Testimonial";

function HappyCustomerTestimonial() {
  return (
    <Testimonial
      imgSrc={""}
      letters="S"
      name="Happy customer"
      showStars
      url="https://microlaunch.net/p/nextnative"
      testimonial={
        <div>
          Insane product & a great founder behind it - I've been trying to mess
          around creating mobile apps &{" "}
          <span className="bg-primary rounded p-1 font-[500] text-white">
            I'm getting there bit by bit w/ this helping me hugely!!
          </span>
        </div>
      }
    />
  );
}

export default HappyCustomerTestimonial;
