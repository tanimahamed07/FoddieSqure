import React from "react";
import Image from "next/image";
import Container from "@/component/shared/Container";
import Link from "next/link";

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-500 pb-20">
      
      {/* --- Header Section (Matches Menu/Specialties Style) --- */}
      <section className="relative py-12 lg:py-20 overflow-hidden bg-base-300 border-b border-base-content/5">
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
                Crafting Culinary <span className="text-primary italic font-serif">Legacies</span>
              </h1>
              <p className="max-w-md text-base-content/50 text-sm lg:text-base font-medium">
                A journey of passion, taste, and excellence since 2010.
              </p>
            </div>

            {/* Stats (Matches Menu Page style) */}
            <div className="hidden lg:flex gap-10">
              <div className="text-center">
                <p className="text-3xl font-black text-primary">14+</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Years</p>
              </div>
              <div className="w-px h-12 bg-base-content/10"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-primary">25+</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Master Chefs</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Main Content Section --- */}
      <Container>
        {/* Section Heading Label */}
        <div className="mt-12 mb-8 flex items-center justify-between border-b border-base-content/5 pb-4">
          <h2 className="text-xl font-black text-base-content uppercase tracking-tight">
            The <span className="text-primary">Philosophy</span>
          </h2>
          <span className="text-[10px] font-bold px-2 py-1 bg-base-200 rounded text-base-content/40 uppercase tracking-widest">
            Since 2010
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: Story Content */}
          <div className="space-y-6 order-2 lg:order-1">
            <h3 className="text-3xl font-black text-base-content leading-tight">
              Where Every Ingredient <br /> Tells a <span className="text-secondary">Story</span>
            </h3>
            <p className="text-base-content/60 leading-relaxed text-sm lg:text-base">
              Founded with a vision to redefine the dining experience, our restaurant combines 
              traditional recipes with modern culinary techniques. We believe that great food 
              starts with respect for the soil and the sea.
            </p>
            <p className="text-base-content/60 leading-relaxed text-sm lg:text-base">
              Every dish we serve is a testament to our commitment to quality. From locally sourced 
              organic vegetables to premium cuts of meat, we ensure that only the best reaches your table.
            </p>

            {/* Feature List (Specialties inspired style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-base-200 border border-base-content/5 flex items-center gap-4 transition-all hover:bg-base-300">
                <span className="text-2xl">🌱</span>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-tighter">100% Organic</h4>
                  <p className="text-[10px] opacity-50 font-medium">Daily Fresh Source</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-base-200 border border-base-content/5 flex items-center gap-4 transition-all hover:bg-base-300">
                <span className="text-2xl">⭐</span>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-tighter">Top Rated</h4>
                  <p className="text-[10px] opacity-50 font-medium">4.9/5 Guest Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Image Grid/Frame (Consistent with your Banner/Story Style) */}
          <div className="relative order-1 lg:order-2">
             <div className="relative z-10 w-full max-w-[500px] mx-auto">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-base-300 rotate-2 hover:rotate-0 transition-transform duration-500 bg-base-300">
                  <Image
                    width={600}
                    height={600}
                    src="https://images.unsplash.com/photo-1550966842-3037d63b282f?q=80&w=1000"
                    alt="Our Restaurant Interior"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Floating Card - Similar to Specialties badge */}
                <div className="absolute -bottom-6 -left-6 bg-base-100 p-4 rounded-2xl shadow-xl border border-base-content/5 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold italic">S</div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-base-content/70">Signature Excellence</p>
                </div>
             </div>
          </div>
        </div>

        {/* --- Call to Action Section --- */}
        <div className="mt-24 relative rounded-[3rem] overflow-hidden bg-neutral p-10 lg:p-16 text-center text-neutral-content shadow-2xl">
           <div className="absolute inset-0 opacity-10">
              <Image 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000" 
                fill 
                alt="bg" 
                className="object-cover"
              />
           </div>
           <div className="relative z-10 space-y-6">
              <h2 className="text-3xl lg:text-5xl font-black tracking-tighter">Ready to Experience It?</h2>
              <p className="max-w-xl mx-auto opacity-70 text-sm lg:text-base font-medium">
                Don't just take our word for it. Book a table today and discover the magic yourself.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                 <Link href="/menu" className="btn btn-primary btn-lg rounded-full px-10 shadow-lg shadow-primary/20">
                    Explore Menu
                 </Link>
                 <Link href="/reservation" className="btn btn-outline btn-lg rounded-full px-10 border-white text-white hover:bg-white hover:text-neutral">
                    Book a Table
                 </Link>
              </div>
           </div>
        </div>
      </Container>
    </main>
  );
};

export default AboutPage;