"use client";
import React from "react";
import Container from "../shared/Container";
import Image from "next/image";
import { FaQuoteRight, FaStar } from "react-icons/fa";
import { HiOutlineArrowNarrowRight, HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

// Swiper core styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Alexander Rossi",
    role: "Food Critic",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    review: "The Truffle Arancini was a revelation. The balance of flavors is something you only find in top-tier kitchens.",
    rating: 5
  },
  {
    id: 2,
    name: "Sophia Chen",
    role: "Regular Guest",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200",
    review: "The ambiance is just as exquisite as the steak. It's our go-to place for every anniversary. Impeccable service!",
    rating: 5
  },
  {
    id: 3,
    name: "Marcus Thorne",
    role: "Lifestyle Blogger",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200",
    review: "A masterpiece of culinary art. Truly the best dining in town. The seasonal specialties are always a surprise.",
    rating: 5
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Chef & Vlogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200",
    review: "The attention to detail in presentation and the freshness of organic ingredients is truly commendable.",
    rating: 5
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-16 lg:py-20 bg-base-100 overflow-hidden">
      {/* Background Decorative Blurs - Consistency with WhyChooseUs */}
      <div className="absolute top-[-10%] left-[-5%] w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

      <Container>
        {/* Section Header - Styled like WhyChooseUs */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 relative z-10">
          <div className="text-center md:text-left">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">
              Testimonials
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold mt-2 text-neutral">
              What They <span className="text-primary italic">Say</span>
            </h2>
            <div className="w-20 h-1 bg-primary mt-4 rounded-full mx-auto md:mx-0"></div>
          </div>
          
          {/* Navigation Buttons - Styled for modern look */}
          <div className="flex gap-4">
             <button className="testi-prev-btn w-12 h-12 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all duration-300 shadow-sm cursor-pointer active:scale-95">
                <HiOutlineArrowNarrowLeft size={24} />
             </button>
             <button className="testi-next-btn w-12 h-12 rounded-2xl bg-base-200 border border-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white transition-all duration-300 shadow-sm cursor-pointer active:scale-95">
                <HiOutlineArrowNarrowRight size={24} />
             </button>
          </div>
        </div>

        <div className="relative z-10">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            speed={800}
            autoplay={{ 
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true 
            }}
            navigation={{ 
                nextEl: ".testi-next-btn", 
                prevEl: ".testi-prev-btn" 
            }}
            pagination={{ 
                clickable: true,
                el: '.custom-dots'
            }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-16"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="group bg-base-200 h-full p-8 rounded-[2.5rem] border border-base-200 flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden">
                  
                  {/* Decorative Background Circle on Hover */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/5 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0"></div>

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Header: Rating & Quote */}
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex gap-1">
                          {[...Array(item.rating)].map((_, i) => (
                            <FaStar key={i} size={14} className="text-secondary" />
                          ))}
                      </div>
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                        <FaQuoteRight size={18} />
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-neutral/70 leading-relaxed text-base mb-8 flex-grow italic">
                      "{item.review}"
                    </p>

                    {/* User Profile */}
                    <div className="flex items-center gap-4 pt-6 border-t border-base-300/50">
                      <div className="relative w-14 h-14 overflow-hidden rounded-2xl border-2 border-white shadow-md">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover" 
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral text-lg group-hover:text-primary transition-colors leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination (Dots) */}
          <div className="custom-dots flex justify-center gap-3 mt-4"></div>
        </div>
      </Container>

      {/* Styled Global Pagination */}
      <style jsx global>{`
        .custom-dots .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #cbd5e1 !important; /* Neutral slate color */
          opacity: 1;
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .custom-dots .swiper-pagination-bullet-active {
          width: 35px;
          background: oklch(var(--p)) !important; /* Primary color */
        }
      `}</style>
    </section>
  );
};

export default Testimonials;