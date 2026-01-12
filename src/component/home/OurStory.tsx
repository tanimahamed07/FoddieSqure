"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../shared/Container";

const OurStory = () => {
  return (
    <section className="relative py-16 lg:py-20 bg-base-100 overflow-hidden">
      {/* Background Decorative Blurs - Consistency with Banner */}
      <div className="absolute top-1/4 right-[-5%] w-72 h-72 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-[-5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Left Side: Image Section --- */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10 w-full max-w-[480px] mx-auto lg:mx-0">
              {/* Image Frame - Matches Banner's border and rotation style */}
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-base-200 rotate-[-3deg] hover:rotate-0 transition-transform duration-500 bg-base-300">
                <Image 
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000" 
                  alt="Our Culinary Journey" 
                  width={500} 
                  height={500}
                  className="w-full h-[400px] lg:h-[450px] object-cover"
                />
              </div>
              
              {/* Floating Achievement Card - Matches Banner style */}
              <div className="absolute -bottom-4 -right-4 bg-base-100 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce duration-[3000ms] border border-base-300">
                <div className="bg-primary/20 p-2 rounded-xl text-primary font-bold text-xl">
                  15+
                </div>
                <div>
                  <p className="font-bold text-xs text-neutral uppercase">Years of</p>
                  <p className="text-[10px] opacity-60 text-neutral">Excellence</p>
                </div>
              </div>

              {/* Establishment Badge */}
              <div className="absolute -top-4 left-6 bg-secondary text-neutral px-4 py-1.5 rounded-full shadow-lg rotate-[-10deg] z-20 font-bold text-xs">
                 Since 2010
              </div>
            </div>
          </div>

          {/* --- Right Side: Content --- */}
          <div className="order-1 lg:order-2 text-center lg:text-left space-y-6">
            <div className="space-y-3">
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">
                Our Heritage
              </span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-neutral leading-tight">
                Tradition Meets <br /> 
                <span className="text-primary italic">Innovation</span>
              </h2>
              <div className="w-20 h-1 bg-primary mx-auto lg:mx-0 rounded-full"></div>
            </div>

            <p className="text-neutral/70 text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
              It all started in a small kitchen with a big dream: to redefine the art of fine dining. 
              Our journey is rooted in a deep respect for local ingredients and timeless recipes.
            </p>

            {/* Feature Grid - Compact and Consistent */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-neutral leading-none">Fresh Source</h4>
                  <p className="text-[11px] opacity-50">Local Daily</p>
                </div>
              </div>

              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-sm text-neutral leading-none">Master Chefs</h4>
                  <p className="text-[11px] opacity-50">Global Talent</p>
                </div>
              </div>
            </div>

            {/* CTA - Matches Banner Button style */}
            <div className="pt-4">
              <Link href="/about">
                <button className="btn btn-primary btn-md lg:btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all text-neutral-content">
                  Read Full Story
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