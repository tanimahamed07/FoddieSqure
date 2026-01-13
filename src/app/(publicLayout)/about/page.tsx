"use client";
import React from "react";
import Image from "next/image";
import Container from "@/component/shared/Container";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-500 pb-20">
      {/* --- Section 1: Hero / Header (MenuPage এর সাথে হুবহু মিলানো) --- */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-base-300 border-b border-base-content/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[150%] bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>

        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
            <div className="text-center lg:text-left space-y-2">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Our Story
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-base-content tracking-tighter">
                Crafting Culinary{" "}
                <span className="text-primary italic font-serif">Legacies</span>
              </h1>
              <p className="max-w-md text-base-content/50 text-sm lg:text-base font-medium">
                A journey of passion, taste, and excellence since 2010.
              </p>
            </div>

            {/* Stats (Matches Menu Page style exactly) */}
            <div className="hidden lg:flex gap-10">
              <div className="text-center">
                <p className="text-3xl font-black text-primary">14+</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
                  Years
                </p>
              </div>
              <div className="w-px h-12 bg-base-content/10"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-primary">25+</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
                  Master Chefs
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Section 2: Core Philosophy --- */}
      <section className="py-16 lg:py-20 bg-base-100 overflow-hidden relative">
        {/* Background Decorative Blurs */}
        <div className="absolute top-1/4 left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-[-5%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10"></div>

        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* --- Left Side: Images Grid (Height reduced) --- */}
            <div className="relative grid grid-cols-2 gap-4 lg:gap-6 order-2 lg:order-1">
              <div className="space-y-4 lg:space-y-6 pt-8 lg:pt-12">
                {/* Top Image - Height Reduced to h-56/64 */}
                <div className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border-4 lg:border-8 border-base-200 shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-500 bg-base-300">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=500"
                    width={300}
                    height={350}
                    alt="Chef"
                    className="object-cover h-48 lg:h-64 w-full"
                  />
                </div>
                {/* Organic Card */}
                <div className="bg-secondary/10 p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] border border-secondary/20 text-neutral flex flex-col justify-center items-center text-center group hover:bg-secondary transition-all duration-500">
                  <span className="text-3xl lg:text-4xl mb-2 group-hover:scale-110 transition-transform">
                    🌿
                  </span>
                  <h4 className="font-black text-[10px] lg:text-xs uppercase tracking-widest group-hover:text-white">
                    100% Organic
                  </h4>
                  <p className="text-[9px] lg:text-[10px] opacity-60 group-hover:text-white/80">
                    Daily Fresh Source
                  </p>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {/* Experience Card - Updated to 14+ */}
                <div className="bg-primary p-6 lg:p-8 rounded-[2rem] lg:rounded-[2.5rem] text-neutral-content flex flex-col justify-center items-center text-center shadow-xl shadow-primary/30 group">
                  <h4 className="text-3xl lg:text-4xl font-black group-hover:scale-110 transition-transform">
                    14+
                  </h4>
                  <p className="text-[9px] lg:text-[10px] uppercase font-bold tracking-widest opacity-80">
                    Years Experience
                  </p>
                </div>
                {/* Bottom Image - New Kitchen/Dining Image & Reduced Height */}
                <div className="relative rounded-[2rem] lg:rounded-[2.5rem] overflow-hidden border-4 lg:border-8 border-base-200 shadow-2xl rotate-[3deg] hover:rotate-0 transition-transform duration-500 bg-base-300">
                  <Image
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000"
                    width={300}
                    height={350}
                    alt="Premium Dining"
                    className="object-cover h-48 lg:h-64 w-full"
                  />
                </div>
              </div>
            </div>

            {/* --- Right Side: Content --- */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2 text-center lg:text-left">
              <div className="space-y-3">
                <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs">
                  Our Values
                </span>
                <h2 className="text-4xl lg:text-5xl font-black text-neutral leading-tight">
                  What Drives Our <br />
                  <span className="text-primary italic">Passion</span>
                </h2>
                <div className="w-20 h-1 bg-primary mx-auto lg:mx-0 rounded-full"></div>
              </div>

              <p className="text-neutral/60 leading-relaxed text-sm lg:text-base max-w-lg mx-auto lg:mx-0">
                We believe that great food starts with great respect for the
                ingredients. Our chefs work closely with local farmers to ensure
                only the freshest produce reaches your plate.
              </p>

              {/* Feature List */}
              <div className="space-y-3 lg:space-y-4 max-w-md mx-auto lg:mx-0">
                {[
                  {
                    title: "Sustainably Sourced",
                    desc: "Supporting local farms and eco-producers.",
                    icon: "🌎",
                  },
                  {
                    title: "Culinary Innovation",
                    desc: "Merging tradition with modern flair.",
                    icon: "👨‍🍳",
                  },
                  {
                    title: "Community First",
                    desc: "A place where everyone feels at home.",
                    icon: "❤️",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 lg:p-4 rounded-[1.2rem] lg:rounded-[1.5rem] border border-base-300 hover:bg-base-200 transition-all group"
                  >
                    <span className="text-2xl lg:text-3xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </span>
                    <div className="text-left">
                      <h4 className="font-bold text-neutral text-xs lg:text-sm uppercase tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-[10px] lg:text-[11px] text-neutral/50 font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Section 3: Meet the Masterminds --- */}
      <section className="py-16 lg:py-20 relative overflow-hidden bg-base-100">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

        <Container>
          {/* Section Header - Exactly matches your Excellence header style */}
          <div className="text-center mb-12 relative z-10">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">
              Expert Team
            </span>
            <h2 className="text-4xl lg:text-5xl font-extrabold mt-2 text-neutral">
              The Hands Behind the{" "}
              <span className="text-primary italic">Magic</span>
            </h2>
            <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Team Grid - Compact & Dark-mode Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Marcus Rossi",
                role: "Executive Chef",
                img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=500",
              },
              {
                name: "Elena Sovrano",
                role: "Pastry Specialist",
                img: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?q=80&w=500",
              },
              {
                name: "Julian Thorne",
                role: "Sommelier",
                img: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=500",
              },
            ].map((chef, idx) => (
              <div key={idx} className="group relative">
                {/* Reduced Height for Minimal Look (h-[350px]) */}
                <div className="relative h-[350px] rounded-[2.5rem] overflow-hidden border-4 border-base-200 shadow-lg transition-all duration-500">
                  <Image
                    src={chef.img}
                    alt={chef.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Dark Mode Optimized Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                    <p className="text-primary font-black uppercase text-[10px] tracking-[0.2em] mb-1">
                      {chef.role}
                    </p>
                    <h3 className="text-white text-2xl font-black tracking-tight">
                      {chef.name}
                    </h3>

                    {/* Animated Accent Line */}
                    <div className="w-0 group-hover:w-12 h-1 bg-primary mt-3 transition-all duration-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* --- Section 4: Final Call to Action (Consistent with Menu Details) --- */}
      <section className="py-16 lg:py-20">
        <Container>
          {/* কার্ডের ব্যাকগ্রাউন্ড হিসেবে 'neutral' ব্যবহার করা হয়েছে যা আপনার থিম অনুযায়ী ডার্ক চকোলেট/ক্রিমি টেক্সট কম্বিনেশন দিবে */}
          <div className="bg-neutral rounded-[2.5rem] lg:rounded-[3.5rem] p-10 lg:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl group border border-base-content/5">
            {/* Background Decorative Blurs - Opacity adjusted for readability */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full -mr-20 -mt-20 blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-20 -mb-20 blur-[80px] pointer-events-none"></div>

            <div className="relative z-10 space-y-6">
              {/* Header - Sizes adjusted for a more minimal look */}
              <h2 className="text-4xl lg:text-5xl font-black text-neutral-content leading-tight tracking-tighter">
                Ready to Taste <br />
                <span className="text-primary italic font-serif">
                  Perfection?
                </span>
              </h2>

              {/* Paragraph - max-width optimized */}
              <p className="text-neutral-content/70 max-w-lg mx-auto font-medium text-sm lg:text-base leading-relaxed">
                Join us for an evening of exquisite dining and discover why
                we've been a local favorite for over a decade.
              </p>

              {/* Buttons - Sizes matched and hover transitions improved */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/menu">
                  <button className="btn btn-primary btn-md lg:btn-lg rounded-full px-10 border-none shadow-lg shadow-primary/20 text-white hover:scale-105 active:scale-95 transition-all duration-300">
                    Explore Menu
                  </button>
                </Link>
                <Link href="/reservation">
                  <button className="btn btn-outline btn-md lg:btn-lg rounded-full px-10 border-neutral-content text-neutral-content hover:bg-neutral-content hover:text-neutral transition-all duration-300">
                    Book a Table
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
};

export default AboutPage;
