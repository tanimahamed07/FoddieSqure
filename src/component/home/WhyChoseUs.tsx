"use client";
import React from "react";
import Container from "../shared/Container";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Premium Quality",
      description: "We source the finest ingredients from organic local farms to ensure every bite is perfection.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      color: "bg-primary/10 text-primary",
      hoverIcon: "group-hover:bg-primary group-hover:text-white",
    },
    {
      id: 2,
      title: "Master Chefs",
      description: "Our world-class culinary team brings decades of experience from top-rated global restaurants.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "bg-secondary/20 text-secondary",
      hoverIcon: "group-hover:bg-secondary group-hover:text-neutral",
    },
    {
      id: 3,
      title: "Exquisite Ambiance",
      description: "Enjoy your meal in a sophisticated environment designed for relaxation and conversation.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: "bg-primary/10 text-primary",
      hoverIcon: "group-hover:bg-primary group-hover:text-white",
    },
    {
      id: 4,
      title: "Flawless Service",
      description: "Our dedicated staff provides attentive and personalized service to make you feel like royalty.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "bg-secondary/20 text-secondary",
      hoverIcon: "group-hover:bg-secondary group-hover:text-neutral",
    },
  ];

  return (
    <section className="relative py-24 bg-base-100 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Blurs - Banner এর সাথে মিল রেখে */}
      <div className="absolute top-1/4 left-[-5%] w-80 h-80 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-[-5%] w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10"></div>

      <Container>
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6 border border-secondary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-extrabold text-neutral mb-6 leading-tight">
            The Secrets of Our <br />
            <span className="text-primary italic font-serif">Culinary Excellence</span>
          </h2>
          <div className="w-24 h-1.5 bg-primary rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-base-200 p-10 rounded-[2.5rem] border border-base-300 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:bg-base-100 relative overflow-hidden"
            >
              {/* Decorative Subtle Tilted Background on Hover */}
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0"></div>

              <div className="relative z-10">
                {/* Icon Box - Matches OurStory feature icons */}
                <div className={`w-16 h-16 rounded-2xl ${feature.color} ${feature.hoverIcon} flex items-center justify-center mb-8 transition-all duration-500 group-hover:rotate-[10deg] shadow-sm`}>
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-bold text-neutral mb-4 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-neutral/70 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="w-0 group-hover:w-full h-0.5 bg-primary/30 mt-6 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;