"use client";
import { TMenu } from "@/types/menu";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import ItemsCard from "../shared/ItemsCard";

const Specialties = () => {
  const [menus, setMenus] = useState<TMenu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMenus() {
      try {
        const res = await fetch("/api/menu");
        const data = await res.json();

        const specialDishes = data
          .filter((item: TMenu) => item.isSpecial)
          .slice(0, 4);

        setMenus(specialDishes);
      } catch (error) {
        console.error("Error fetching special menus:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, []);
  // console.log(menus);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
   <section className="py-16 lg:py-20 bg-base-100 overflow-hidden relative">
      {/* Background Decorative Blurs for Consistency */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">
            Chef's Selection
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mt-2 text-neutral">
            Our Seasonal <span className="text-primary italic">Specialties</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Specialties Grid - Updated to 4 cols on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {menus.map((item) => (
            <ItemsCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link href="/menu">
            <button className="btn btn-outline btn-primary rounded-full px-10 border-2 hover:text-white transition-all duration-300">
              Explore Full Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
