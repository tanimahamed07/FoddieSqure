"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  Save,
  ImagePlus,
  Loader2,
  Utensils,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AddMenuPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ... অন্য ইমপোর্ট

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // ১. সাবমিট করার সময় একটি ছোট লোডিং ইন্ডিকেটর (ঐচ্ছিক)
    // toast.loading ব্যবহার করতে পারেন অথবা সরাসরি API কল করতে পারেন।

    const formData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(formData.entries());

    const finalData = {
      // ... আপনার আগের ডাটা স্ট্রাকচার
      name: rawData.name,
      slug: rawData.name.toString().toLowerCase().replace(/\s+/g, "-"),
      description: rawData.description,
      price: Number(rawData.price),
      category: rawData.category,
      image: rawData.image,
      preparationTime: rawData.preparationTime,
      isAvailable: true,
      isSpecial: rawData.isSpecial === "true",
      rating: 5.0,
      reviewCount: 0,
      tags: rawData.tags
        .toString()
        .split(",")
        .map((t) => t.trim()),
      ingredients: rawData.ingredients
        .toString()
        .split(",")
        .map((i) => i.trim()),
      nutrition: {
        calories: Number(rawData.calories),
        protein: rawData.protein,
        fat: rawData.fat,
        carbs: rawData.carbs,
      },
    };

    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        // ২. সাকসেস হলে SweetAlert দেখানো
        Swal.fire({
          title: "Success!",
          text: "New dish has been added to your menu.",
          icon: "success",
          confirmButtonColor: "#FB923C", // আপনার প্রাইমারি কালার কোড এখানে দিতে পারেন
          confirmButtonText: "Great!",
          background: "#ffffff",
          customClass: {
            popup: "rounded-[2rem]",
            confirmButton:
              "rounded-xl font-bold uppercase tracking-widest px-8",
          },
        }).then(() => {
          // অ্যালার্ট ক্লোজ করার পর রিডাইরেক্ট
          router.push("/dashboard/manage-menu");
          router.refresh();
        });
      } else {
        throw new Error("Failed to add");
      }
    } catch (error) {
      // এরর হলে টোস্ট বা অ্যালার্ট
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while saving.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/admin/manage-menu" className="btn btn-ghost btn-circle">
          <ChevronLeft size={24} />
        </Link>
        <h2 className="text-2xl font-black uppercase tracking-tight">
          Add New <span className="text-primary">Item</span>
        </h2>
        <div className="w-12"></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Col: Photo & Extra Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="aspect-square bg-base-200 rounded-[2.5rem] border-2 border-dashed border-base-content/10 flex flex-col items-center justify-center gap-4 text-neutral/40 hover:border-primary transition-all cursor-pointer group">
            <ImagePlus
              size={48}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">
              Paste Image URL in the form
            </span>
          </div>

          {/* Nutrition Section */}
          <div className="bg-neutral text-neutral-content p-6 rounded-[2.5rem] shadow-xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap size={14} className="text-warning" /> Nutrition Facts
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                name="calories"
                type="number"
                placeholder="Cals"
                className="input input-sm bg-white/10 rounded-xl font-bold border-none"
                required
              />
              <input
                name="protein"
                type="text"
                placeholder="Protein (g)"
                className="input input-sm bg-white/10 rounded-xl font-bold border-none"
                required
              />
              <input
                name="fat"
                type="text"
                placeholder="Fat (g)"
                className="input input-sm bg-white/10 rounded-xl font-bold border-none"
                required
              />
              <input
                name="carbs"
                type="text"
                placeholder="Carbs (g)"
                className="input input-sm bg-white/10 rounded-xl font-bold border-none"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Col: Fields */}
        <div className="lg:col-span-2 bg-base-100 p-8 rounded-[3rem] border border-base-content/5 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">
                Dish Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="Spicy Pepperoni Pizza"
                className="input input-bordered rounded-2xl font-bold"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">
                Prep Time
              </label>
              <input
                name="preparationTime"
                type="text"
                placeholder="15 mins"
                className="input input-bordered rounded-2xl font-bold"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">
                Price ($)
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                className="input input-bordered rounded-2xl font-bold"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">
                Category
              </label>
              <select
                name="category"
                className="select select-bordered rounded-2xl font-bold"
              >
                <option>Pizza</option>
                <option>Burger</option>
                <option>Pasta</option>
                <option>Dessert</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label text-[10px] font-black uppercase opacity-50">
              Image URL
            </label>
            <input
              name="image"
              type="text"
              className="input input-bordered rounded-2xl font-bold text-xs"
              placeholder="https://unsplash.com/..."
              required
            />
          </div>

          <div className="form-control">
            <label className="label text-[10px] font-black uppercase opacity-50">
              Ingredients (Comma Separated)
            </label>
            <input
              name="ingredients"
              type="text"
              placeholder="Pepperoni, Mozzarella, Chilli Flakes"
              className="input input-bordered rounded-2xl font-bold"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">
                Tags (Comma Separated)
              </label>
              <input
                name="tags"
                type="text"
                placeholder="Spicy, Meat Lover"
                className="input input-bordered rounded-2xl font-bold"
                required
              />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">
                Chef Special?
              </label>
              <select
                name="isSpecial"
                className="select select-bordered rounded-2xl font-bold"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label text-[10px] font-black uppercase opacity-50">
              Description
            </label>
            <textarea
              name="description"
              className="textarea textarea-bordered rounded-2xl font-bold h-24"
              placeholder="Loaded with spicy Italian pepperoni..."
              required
            ></textarea>
          </div>

          <button
            disabled={loading}
            className="btn btn-primary w-full rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 mt-4"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Save size={20} />
            )}
            Confirm & Save Dish
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMenuPage;
