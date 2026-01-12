import React from "react";
import Image from "next/image";
import Container from "../shared/Container";

const Banner = () => {
  return (
    <div className="relative min-h-[85vh] flex items-center overflow-hidden bg-base-100 transition-colors duration-300">
      {/* Background Decorative Elements - Using your theme colors */}
      <div className="absolute top-[-10%] left-[-5%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10 py-12 lg:py-0">
          {/* --- Left Content --- */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            {/* Badge with Secondary color from your theme */}
            <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-2 rounded-full mb-6 border border-secondary/20">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary"></span>
              </span>
              <span className="text-sm font-bold tracking-wide uppercase">
                Best Steak in Town
              </span>
            </div>

            {/* Title with Primary color from your theme */}
            <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 text-neutral">
              Savor the Taste of <br />
              <span className="text-primary italic">Exquisite</span> Dining
            </h1>

            <p className="text-lg text-neutral/70 mb-8 max-w-lg mx-auto lg:mx-0">
              Experience a culinary journey where every dish tells a story of
              passion, fresh ingredients, and unforgettable flavors.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="btn btn-primary btn-lg rounded-full px-8 shadow-xl shadow-primary/30 text-neutral-content">
                Explore Menu
              </button>
              <button className="btn btn-outline btn-lg rounded-full px-8 border-2 hover:bg-secondary hover:border-secondary hover:text-neutral">
                Our Story
              </button>
            </div>

            {/* Stats - Using Base-300 and Primary from your theme */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-base-300">
              <div>
                <p className="text-2xl font-bold text-primary">50+</p>
                <p className="text-sm opacity-60 text-neutral">Dishes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">12+</p>
                <p className="text-sm opacity-60 text-neutral">Awards</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">4.9/5</p>
                <p className="text-sm opacity-60 text-neutral">Ratings</p>
              </div>
            </div>
          </div>

          {/* --- Right Content (Image) --- */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative z-10 w-full max-w-[500px] mx-auto">
              {/* Main Image Frame - Border using Base-200 */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-8 border-base-200 rotate-3 hover:rotate-0 transition-transform duration-500 bg-base-300">
                <Image
                  width={500}
                  height={500}
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Delicious Steak"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Card 1 - Success from your theme */}
              <div className="absolute -bottom-6 -left-8 bg-base-100 p-4 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce duration-3000 border border-base-300">
                <div className="bg-success/20 p-2 rounded-full text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-sm text-neutral">
                    Fresh Ingredients
                  </p>
                  <p className="text-xs opacity-60 text-neutral">
                    100% Organic
                  </p>
                </div>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -top-6 -right-4 bg-base-100 p-4 rounded-2xl shadow-xl hidden sm:flex items-center gap-3 rotate-[-5deg] border border-base-300">
                <span className="text-2xl">🔥</span>
                <p className="font-bold text-sm text-neutral">Popular Choice</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
