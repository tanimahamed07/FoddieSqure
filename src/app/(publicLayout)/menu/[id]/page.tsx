import React from "react";
import { getMenuDetails } from "@/services/menuService";
import Container from "@/component/shared/Container";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, Flame, Utensils, Info, Star, Heart, ChevronLeft } from "lucide-react";
import Link from "next/link";

type TParams = Promise<{ id: string }>;

const MenuDetailsPage = async ({ params }: { params: TParams }) => {
  const { id } = await params;
  const item = await getMenuDetails(id);
  console.log(item)

  if (!item) notFound();

  return (
    <main className="relative min-h-screen bg-base-100 overflow-hidden transition-colors duration-300">
      {/* Background Decorative Elements - Banner এর সাথে মিল রেখে */}
      <div className="absolute top-[-5%] left-[-5%] w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-0"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-secondary/10 rounded-full blur-3xl -z-0"></div>

      <Container>
        <div className="relative z-10 py-10 lg:py-20">
          {/* Back Button */}
          <Link 
            href="/menu" 
            className="inline-flex items-center gap-2 text-sm font-bold text-primary mb-8 hover:translate-x-[-4px] transition-transform"
          >
            <ChevronLeft size={18} /> Back to Menu
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            
            {/* --- Left: Image Section --- */}
            <div className="lg:sticky lg:top-24">
              <div className="relative group">
                {/* Main Image Frame - ItemsCard এর মত বর্ডার এবং শ্যাডো */}
                <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-base-200 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 bg-base-300 aspect-square">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    priority
                    className={`object-cover transition-transform duration-700 group-hover:scale-110 ${
                      !item.isAvailable ? "grayscale" : ""
                    }`}
                  />
                  
                  {!item.isAvailable && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-error text-white px-6 py-2 rounded-full text-xl font-black uppercase tracking-widest -rotate-12">
                        Sold Out
                      </span>
                    </div>
                  )}
                </div>

                {/* Floating Special Badge */}
                {item.isSpecial && (
                  <div className="absolute -top-6 -right-4 bg-secondary text-neutral-content p-4 rounded-2xl shadow-xl flex items-center gap-2 rotate-12 border border-secondary/20">
                    <Star size={20} fill="currentColor" className="animate-pulse" />
                    <span className="font-black uppercase text-xs tracking-tighter">Chef's Selection</span>
                  </div>
                )}
              </div>

              {/* Tags Under Image */}
              <div className="mt-8 flex flex-wrap gap-2">
                {item.tags.map((tag: string) => (
                  <span key={tag} className="bg-base-200 px-4 py-2 rounded-xl text-sm font-bold text-neutral/60 border border-base-300">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* --- Right: Content Section --- */}
            <div className="flex flex-col">
              {/* Header Info */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                  {item.category}
                </span>
                <div className="flex items-center gap-2 text-secondary bg-secondary/5 px-3 py-1 rounded-lg">
                  <Star size={18} fill="currentColor" />
                  <span className="font-bold text-neutral">{item.rating}</span>
                  <span className="text-xs opacity-50 font-medium">({item.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="text-4xl lg:text-6xl font-extrabold text-neutral leading-tight mb-6">
                {item.name} <span className="text-primary italic">.</span>
              </h1>

              <p className="text-lg text-neutral/60 mb-8 leading-relaxed italic border-l-4 border-primary/20 pl-6">
                "{item.description}"
              </p>

              {/* Price & Prep Time Grid */}
              <div className="grid grid-cols-2 gap-8 py-8 border-y border-base-300 mb-8">
                <div>
                  <p className="text-xs font-black uppercase text-neutral/40 tracking-widest mb-1">Price</p>
                  <p className="text-4xl font-black text-primary">${item.price}</p>
                </div>
                <div className="border-l border-base-300 pl-8">
                  <p className="text-xs font-black uppercase text-neutral/40 tracking-widest mb-1">Preparation</p>
                  <div className="flex items-center gap-2 text-neutral">
                    <Clock size={20} className="text-secondary" />
                    <span className="text-xl font-bold">{item.preparationTime}</span>
                  </div>
                </div>
              </div>

              {/* Ingredients */}
              <div className="mb-10">
                <h3 className="text-sm font-black uppercase text-neutral/40 tracking-widest mb-4 flex items-center gap-2">
                  <Utensils size={16} className="text-primary" /> Ingredients
                </h3>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing: string) => (
                    <span key={ing} className="bg-base-200 px-4 py-2 rounded-2xl text-sm font-semibold border border-base-300 hover:border-primary/50 transition-colors">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition Card - Banner style dark contrast */}
              <div className="bg-neutral text-neutral-content p-6 md:p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden mb-10 group">
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary/20 blur-3xl rounded-full transition-all group-hover:bg-primary/40"></div>
                
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2 relative z-10">
                  <Flame className="text-orange-500" size={22} /> Nutritional Value
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10">
                  {[
                    { label: "Calories", val: `${item.nutrition.calories}kcal` },
                    { label: "Protein", val: item.nutrition.protein },
                    { label: "Fat", val: item.nutrition.fat },
                    { label: "Carbs", val: item.nutrition.carbs },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-sm p-4 rounded-3xl border border-white/10 text-center hover:border-white/30 transition-all">
                      <p className="text-[10px] uppercase font-black opacity-50 tracking-tighter mb-1">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.val}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  disabled={!item.isAvailable} 
                  className="btn btn-primary btn-lg flex-[3] rounded-2xl text-lg font-black shadow-xl shadow-primary/30 text-neutral-content disabled:grayscale"
                >
                  Add to Cart
                </button>
                <button className="btn btn-outline btn-lg flex-1 rounded-2xl border-2 hover:bg-secondary hover:border-secondary hover:text-neutral">
                  <Heart size={24} />
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold opacity-30 mt-6 uppercase tracking-widest">
                <Info size={14} /> 
                <span>Freshly prepared on every order</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default MenuDetailsPage;