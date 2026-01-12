"use client";

import { TMenu } from "@/types/menu";
import { useEffect, useState } from "react";
import React from "react";
import Container from "@/component/shared/Container";
import ItemsCard from "@/component/shared/ItemsCard";

const Specialties = () => {
  const [menus, setMenus] = useState<TMenu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("/api/menu");
        const data: TMenu[] = await res.json();
        const specialDishes = data.filter((item) => item.isSpecial);
        setMenus(specialDishes);
      } catch (error) {
        console.error("Error fetching special menus:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMenus();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (menus.length === 0) return null;

  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-500 pb-20">
      {/* --- Menu Page Style Banner --- */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-base-300 border-b border-base-content/5">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-secondary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[150%] bg-primary/10 rounded-full blur-[100px]"></div>
        </div>
        
        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
            <div className="text-center lg:text-left space-y-2">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Chef's Choice
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-base-content tracking-tighter">
                Signature <span className="text-primary italic font-serif">Specialties</span>
              </h1>
              <p className="max-w-md text-base-content/50 text-sm lg:text-base font-medium">
                A curated selection of our most exquisite dishes, prepared with passion and secret family recipes.
              </p>
            </div>

            {/* Stats/Badge Area */}
            <div className="hidden lg:flex gap-10">
              <div className="text-center">
                <p className="text-3xl font-black text-primary">{menus.length}</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Special Items</p>
              </div>
              <div className="w-px h-12 bg-base-content/10"></div>
              <div className="bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
                 <p className="text-xs font-bold text-primary uppercase tracking-tighter">Limited Availability</p>
                 <p className="text-[10px] text-base-content/40">Freshly prepared daily</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Content Section --- */}
      <Container>
        {/* Section Heading matching Menu Page style */}
        <div className="mt-12 mb-8 flex items-center justify-between border-b border-base-content/5 pb-4">
          <h2 className="text-xl font-black text-base-content uppercase tracking-tight">
            Must <span className="text-primary">Try Dishes</span>
          </h2>
          <span className="text-[10px] font-bold px-2 py-1 bg-base-200 rounded text-base-content/40 uppercase tracking-widest">
            {menus.length} Recommendations
          </span>
        </div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {menus.map((item) => (
            <div key={item.id} className="group hover:-translate-y-2 transition-transform duration-500">
              <ItemsCard item={item} />
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
};

export default Specialties;