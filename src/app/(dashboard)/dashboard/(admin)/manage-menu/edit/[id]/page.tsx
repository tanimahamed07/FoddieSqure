"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Save, ImagePlus, Loader2, Zap } from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const EditMenuPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  // ১. আগের ডাটা লোড করা
  useEffect(() => {
    fetch(`/api/menu/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setPreviewUrl(data.image);
        setFetching(false);
      })
      .catch(() => {
        Swal.fire("Error", "Failed to load dish data", "error");
        setFetching(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const fData = new FormData(e.currentTarget);
    const rawData = Object.fromEntries(fData.entries());

    const finalData = {
      name: rawData.name,
      description: rawData.description,
      price: Number(rawData.price),
      category: rawData.category,
      image: rawData.image,
      preparationTime: rawData.preparationTime,
      isSpecial: rawData.isSpecial === "true",
      tags: rawData.tags.toString().split(",").map((t) => t.trim()),
      ingredients: rawData.ingredients.toString().split(",").map((i) => i.trim()),
      nutrition: {
        calories: Number(rawData.calories),
        protein: rawData.protein,
        fat: rawData.fat,
        carbs: rawData.carbs,
      },
    };

    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      if (res.ok) {
        // সাকসেস সুইট অ্যালার্ট
        Swal.fire({
          title: "Success!",
          text: "Dish updated successfully.",
          icon: "success",
          confirmButtonColor: "#FB923C",
          confirmButtonText: "Great",
          customClass: {
            popup: 'rounded-[2.5rem]',
            confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-8'
          }
        }).then(() => {
          router.push("/dashboard/manage-menu");
          router.refresh();
        });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong while updating.",
        icon: "error",
        confirmButtonColor: "#ef4444"
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching)
    return (
      <div className="flex flex-col h-screen items-center justify-center gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="font-black uppercase tracking-widest text-xs opacity-50">
          Fetching Dish Data...
        </p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/dashboard/manage-menu" className="btn btn-ghost btn-circle">
          <ChevronLeft size={24} />
        </Link>
        <h2 className="text-2xl font-black uppercase tracking-tight">
          Edit <span className="text-primary italic">Dish</span>
        </h2>
        <div className="w-12"></div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Photo & Nutrition */}
        <div className="lg:col-span-1 space-y-6">
          <div className="aspect-square bg-base-200 rounded-[2.5rem] border-2 border-dashed border-base-content/10 overflow-hidden flex flex-col items-center justify-center gap-4 text-neutral/40 hover:border-primary transition-all group relative">
            {previewUrl ? (
              <Image src={previewUrl} alt="Preview" fill className="object-cover" />
            ) : (
              <>
                <ImagePlus size={48} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest text-center px-4">
                  Invalid or No Image URL
                </span>
              </>
            )}
          </div>

          <div className="bg-neutral text-neutral-content p-6 rounded-[2.5rem] shadow-xl space-y-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2">
              <Zap size={14} className="text-warning" /> Nutrition Facts
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {['calories', 'protein', 'fat', 'carbs'].map((field) => (
                <div key={field} className="space-y-1">
                  <span className="text-[8px] uppercase font-bold opacity-40 ml-2">{field}</span>
                  <input
                    name={field}
                    defaultValue={formData?.nutrition?.[field]}
                    type={field === 'calories' ? 'number' : 'text'}
                    placeholder={field}
                    className="input input-sm bg-white/10 rounded-xl font-bold border-none w-full"
                    required
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Fields */}
        <div className="lg:col-span-2 bg-base-100 p-8 rounded-[3rem] border border-base-content/5 shadow-sm space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Dish Name</label>
              <input name="name" defaultValue={formData?.name} type="text" className="input input-bordered rounded-2xl font-bold" required />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Prep Time</label>
              <input name="preparationTime" defaultValue={formData?.preparationTime} type="text" className="input input-bordered rounded-2xl font-bold" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Price ($)</label>
              <input name="price" defaultValue={formData?.price} type="number" step="0.01" className="input input-bordered rounded-2xl font-bold" required />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Category</label>
              <select name="category" defaultValue={formData?.category} className="select select-bordered rounded-2xl font-bold">
                <option>Pizza</option>
                <option>Burger</option>
                <option>Pasta</option>
                <option>Dessert</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label text-[10px] font-black uppercase opacity-50">Image URL</label>
            <input name="image" defaultValue={formData?.image} type="text" onChange={(e) => setPreviewUrl(e.target.value)} className="input input-bordered rounded-2xl font-bold text-xs" required />
          </div>

          <div className="form-control">
            <label className="label text-[10px] font-black uppercase opacity-50">Ingredients (Comma Separated)</label>
            <input name="ingredients" defaultValue={formData?.ingredients?.join(", ")} type="text" className="input input-bordered rounded-2xl font-bold" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Tags (Comma Separated)</label>
              <input name="tags" defaultValue={formData?.tags?.join(", ")} type="text" className="input input-bordered rounded-2xl font-bold" required />
            </div>
            <div className="form-control">
              <label className="label text-[10px] font-black uppercase opacity-50">Chef Special?</label>
              <select name="isSpecial" defaultValue={formData?.isSpecial?.toString()} className="select select-bordered rounded-2xl font-bold">
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label text-[10px] font-black uppercase opacity-50">Description</label>
            <textarea name="description" defaultValue={formData?.description} className="textarea textarea-bordered rounded-2xl font-bold h-24" required></textarea>
          </div>

          <button disabled={loading} className="btn btn-primary w-full rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/30 mt-4 h-14">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Update Dish Details</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditMenuPage;