import Image from "next/image";

function Testimonial() {
  return (
    <div className="flex flex-col items-center gap-8 py-16">
      <div className="flex items-center gap-4">
        <Image
          src="/marc-lou.jpg"
          alt="Profile picture"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="font-[500] text-lg">Marc Lou</p>
          <p className="text-gray">Codefast</p>
        </div>
      </div>

      <blockquote className="text-xl text-center max-w-[600px]">
        "So much value in this! I was impressed you can just copy and paste!
        Amazing work 🙌"
      </blockquote>
    </div>
  );
}

export default Testimonial;
