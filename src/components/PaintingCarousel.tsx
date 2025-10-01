"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import { PaintingCarouselProps } from "@/types/types";

export function PaintingCarousel({ paintings }: PaintingCarouselProps) {
  return (
    <Swiper
      effect="coverflow"
      grabCursor
      centeredSlides
      loop
      autoplay={{ delay: 2500, disableOnInteraction: false }}
      speed={1200}
      slidesPerView={2}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      modules={[EffectCoverflow, Autoplay]}
      className="w-full max-w-lg md:max-w-7xl my-5 mask-x-from-90% mask-x-to-99% z-40"
    >
      {paintings.map((painting, i) => (
        <SwiperSlide key={i} className="flex justify-center items-center">
          <Image
            src={painting.src}
            alt={painting.alt ?? `Obra de arte ${i + 1}`}
            width={400}
            height={300}
            sizes="(max-width: 768px) 50vw, 33vw"
            className="w-full h-32 md:h-80 object-cover rounded-lg"
            priority={i < 2}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
