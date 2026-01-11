"use client";
import { TMenu } from "@/types/menu";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
          .slice(0, 3);

        setMenus(specialDishes);
      } catch (error) {
        console.error("Error fetching special menus:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMenus();
  }, []);
  console.log(menus);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-secondary font-bold tracking-widest uppercase text-sm">
            Chef's Selection
          </span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mt-2 text-neutral">
            Our Seasonal{" "}
            <span className="text-primary italic">Specialties</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Specialties Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-8">
          {menus.map((item) => (
            <ItemsCard key={item.slug} item={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Link href="/menu">
            <button className="btn btn-outline btn-primary rounded-full px-10 border-2 hover:text-white">
              Explore Full Menu
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Specialties;
