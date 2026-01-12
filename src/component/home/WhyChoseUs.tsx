"use client";
import React from "react";
import Container from "../shared/Container";
import {
  HiOutlineBadgeCheck,
  HiOutlineUserGroup,
  HiOutlineSparkles,
  HiOutlineStar,
} from "react-icons/hi";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Premium Quality",
      description: "Fine ingredients from organic local farms for every bite.",
      icon: <HiOutlineBadgeCheck size={28} />,
      color: "bg-primary/10 text-primary",
      hoverStyle: "group-hover:bg-primary group-hover:text-white",
    },
    {
      id: 2,
      title: "Master Chefs",
      description: "World-class culinary team with global kitchen experience.",
      icon: <HiOutlineUserGroup size={28} />,
      color: "bg-secondary/15 text-secondary",
      hoverStyle: "group-hover:bg-secondary group-hover:text-neutral",
    },
    {
      id: 3,
      title: "Great Ambiance",
      description: "Sophisticated environment designed for your relaxation.",
      icon: <HiOutlineSparkles size={28} />,
      color: "bg-primary/10 text-primary",
      hoverStyle: "group-hover:bg-primary group-hover:text-white",
    },
    {
      id: 4,
      title: "Flawless Service",
      description: "Dedicated staff providing attentive personalized service.",
      icon: <HiOutlineStar size={28} />,
      color: "bg-secondary/15 text-secondary",
      hoverStyle: "group-hover:bg-secondary group-hover:text-neutral",
    },
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-base-100 overflow-hidden">
      {/* Background Decorative Blurs - Same as Banner & OurStory */}
      <div className="absolute top-[-5%] right-[-5%] w-72 h-72 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>

      <Container>
        {/* Section Header - Matches Specialties Style */}
        <div className="text-center mb-12 relative z-10">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">
            Our Excellence
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mt-2 text-neutral">
            Why Choose <span className="text-primary italic">Us</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-base-200 p-8 rounded-[2.5rem] border border-base-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Subtle Decorative Circle on Hover */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/5 rounded-full group-hover:scale-[3] transition-transform duration-700 -z-0"></div>

              <div className="relative z-10">
                {/* Icon Box - Matches OurStory feature icons */}
                <div
                  className={`w-14 h-14 rounded-2xl ${feature.color} ${feature.hoverStyle} flex items-center justify-center mb-6 transition-all duration-300 shadow-sm`}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl font-bold text-neutral mb-3 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-neutral/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Accent - Consistency with Banner/Story elements */}
              <div className="absolute top-4 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                 <span className="text-4xl font-black italic">0{feature.id}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;