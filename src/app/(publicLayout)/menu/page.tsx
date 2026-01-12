"use client";
import Container from "@/component/shared/Container";
import ItemsCard from "@/component/shared/ItemsCard";
import { TMenu } from "@/types/menu";
import { useEffect, useState } from "react";
import React from "react";

const Menu = () => {
  const [menus, setMenus] = useState<TMenu[]>([]);
  const [filteredMenus, setFilteredMenus] = useState<TMenu[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();
        setMenus(data);
        setFilteredMenus(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);

  const categories = ["All", ...Array.from(new Set(menus.map((item) => item.category)))];

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter(
        (item) => item.category === activeCategory
      );
      setFilteredMenus(filtered);
    }
  }, [activeCategory, menus]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-500 pb-20">
      {/* --- Slim & Impactful Header --- */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-base-300 border-b border-base-content/5">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-primary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[150%] bg-secondary/10 rounded-full blur-[100px]"></div>
        </div>
        
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
            <div className="text-center lg:text-left space-y-2">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                Full Menu
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-base-content tracking-tighter">
                Discover <span className="text-primary italic font-serif">Flavors</span>
              </h1>
              <p className="max-w-md text-base-content/50 text-sm lg:text-base font-medium">
                Experience the perfect blend of seasonal ingredients and culinary expertise.
              </p>
            </div>

            {/* Stats or Decorative Info */}
            <div className="hidden lg:flex gap-10">
              <div className="text-center">
                <p className="text-3xl font-black text-primary">{menus.length}</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Items</p>
              </div>
              <div className="w-px h-12 bg-base-content/10"></div>
              <div className="text-center">
                <p className="text-3xl font-black text-primary">{categories.length - 1}</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Categories</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Sticky Filter Bar --- */}
      <div className="sticky top-[64px] lg:top-[72px] z-30 -mt-6">
        <Container>
          <div className="bg-base-100/80 backdrop-blur-xl border border-base-content/5 p-1.5 rounded-2xl lg:rounded-full shadow-xl flex flex-wrap justify-center gap-1 max-w-fit mx-auto transition-all hover:shadow-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl lg:rounded-full font-bold text-xs lg:text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-content shadow-md"
                    : "hover:bg-base-content/5 text-base-content/60"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      <Container>
        {/* --- Content Header --- */}
        <div className="mt-12 mb-8 flex items-center justify-between border-b border-base-content/5 pb-4">
          <h2 className="text-xl font-black text-base-content uppercase tracking-tight">
            {activeCategory} <span className="text-primary">Selection</span>
          </h2>
          <span className="text-[10px] font-bold px-2 py-1 bg-base-200 rounded text-base-content/40 uppercase tracking-widest">
            {filteredMenus.length} Results
          </span>
        </div>

        {/* --- Grid Implementation --- */}
        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredMenus.map((item) => (
              <ItemsCard key={item.id || item.slug} item={item} /> 
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="text-5xl mb-4 grayscale opacity-20">🍲</div>
            <h3 className="text-xl font-bold text-base-content/20 uppercase">No items found</h3>
          </div>
        )}
      </Container>
    </main>
  );
};

export default Menu;