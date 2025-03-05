import Image from "next/image";

function Testimonial() {
  return (
    <div className="flex flex-col text-lg md:text-[24px] gap-8 mx-auto max-w-[759.07px] py-16">
      <div className="flex items-center gap-4">
        <div className="relative w-[80px] h-[80px]">
          <Image
            src="https://pbs.twimg.com/profile_images/1799370892855660544/sd7E-_7S_400x400.jpg"
            alt="Profile picture"
            fill
            className="rounded-full object-cover w-[80px] h-[80px]"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-[500]">Denis Tarasenko</p>
          <p className="text-gray">Lasting Habits</p>
        </div>
      </div>

      <blockquote>
        {
          '"So much value in this! I was impressed that building a mobile app is so easy! Amazing work 🙌"'
        }
      </blockquote>
    </div>
  );
}

export default Testimonial;
