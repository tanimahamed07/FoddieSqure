import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container"; // Aponar existing container

const OurStory = () => {
  return (
    <section className="relative py-24 bg-base-100 overflow-hidden">
      {/* Background Decorative Blurs - Same as Banner style */}
      <div className="absolute top-1/4 right-[-5%] w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* --- Left Side: Image Concept --- */}
          <div className="w-full lg:w-1/2 relative">
            {/* Main Image Frame - Matches Banner's tilted frame style */}
            <div className="relative z-10 h-[450px] rounded-[3.5rem] overflow-hidden border-8 border-base-200 shadow-2xl rotate-[-3deg] hover:rotate-0 transition-all duration-700 bg-base-300">
              <Image 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000" 
                alt="Our Culinary Journey" 
                width={600} 
                height={700}
                className="w-full h-[500px] object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Achievement Card - Matches Banner's Floating Cards */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 z-20 bg-base-100 p-6 rounded-3xl shadow-2xl border border-base-300 flex items-center gap-4 animate-bounce duration-[3000ms]">
               <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                  <span className="text-3xl font-black">15+</span>
               </div>
               <div>
                  <p className="font-bold text-sm text-neutral uppercase tracking-tight">Years Of</p>
                  <p className="text-xs opacity-60 text-neutral font-medium">Culinary Excellence</p>
               </div>
            </div>

            {/* Accent Badge */}
            <div className="absolute -top-6 left-10 bg-secondary text-neutral-content px-4 py-2 rounded-2xl shadow-lg rotate-[-15deg] z-20 font-bold text-sm">
               Established 2010
            </div>
          </div>

          {/* --- Right Side: Content --- */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-[0.3em] uppercase text-sm inline-block">
                Our Heritage
              </span>
              <h2 className="text-4xl lg:text-6xl font-extrabold text-neutral leading-tight">
                Tradition Meets <br /> 
                <span className="text-primary italic">Innovation</span>
              </h2>
              <div className="w-20 h-1.5 bg-primary rounded-full mx-auto lg:mx-0"></div>
            </div>

            <p className="text-neutral/70 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
              It all started in a small kitchen with a big dream: to redefine the art of fine dining. 
              Our journey is rooted in a deep respect for local ingredients and a passion for 
              timeless recipes passed down through generations.
            </p>

            {/* Feature Icons - Using same icon style as your other sections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4 justify-center lg:justify-start group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-neutral">Fresh Source</h4>
                  <p className="text-xs text-neutral/50">Daily Local Pickups</p>
                </div>
              </div>

              <div className="flex items-center gap-4 justify-center lg:justify-start group">
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-neutral transition-colors duration-300">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-neutral">Master Chefs</h4>
                  <p className="text-xs text-neutral/50">Top Global Talent</p>
                </div>
              </div>
            </div>

            {/* CTA Button - Matches Banner buttons */}
            <div className="pt-6">
              <Link href="/about">
                <button className="btn btn-primary btn-lg rounded-full px-10 shadow-xl shadow-primary/20 hover:scale-105 transition-all text-neutral-content">
                  Read Full Story
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </button>
              </Link>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default OurStory;