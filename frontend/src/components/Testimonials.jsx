import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function Testimonials() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "Frontend Developer",
      review:
        "This platform helped me crack my React interview with confidence.",
    },
    {
      name: "Aman Hossain",
      role: "Java Developer",
      review:
        "The AI feedback system is incredibly useful for improving answers.",
    },
    {
      name: "Priya Singh",
      role: "Software Engineer",
      review:
        "Best interview preparation platform I have used so far.",
    },
    {
      name: "Arjun Das",
      role: "Full Stack Developer",
      review:
        "Mock interviews felt very close to real company interviews.",
    },
  ];

  return (
    <section className="bg-slate-950 py-28">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white">
            Success Stories
          </h2>

          <p className="text-slate-400 mt-4">
            Thousands of candidates improved their interview performance.
          </p>
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
          }}
          loop={true}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 h-[250px]">

                <div className="flex mb-6">
                  ⭐⭐⭐⭐⭐
                </div>

                <p className="text-slate-300">
                  "{item.review}"
                </p>

                <div className="mt-8">
                  <h3 className="text-white font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-slate-500 text-sm">
                    {item.role}
                  </p>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
}

export default Testimonials;