"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { 
  Trash2, 
  Loader2, 
  Heart, 
  ShoppingCart,
  DollarSign,
  ExternalLink,
  Utensils
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";

const MyFavoritesPage = () => {
  const { data: session, status } = useSession();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/favorites"); 
      const data = await res.json();
      if (res.ok && Array.isArray(data)) {
        setFavorites(data);
      }
    } catch (error) {
      toast.error("Failed to load favorites");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchFavorites();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, fetchFavorites]);

  const handleRemoveFavorite = (menuItemId: string, name: string) => {
    Swal.fire({
      title: "Remove from Favorites?",
      text: `${name} will be removed from your list.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87272", // Error Color
      cancelButtonColor: "#a6adbb",
      confirmButtonText: "Yes, remove!",
      background: "#1d232a",
      color: "#ffffff",
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-6'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const loadingToast = toast.loading("Updating...");
        try {
          const res = await fetch("/api/favorites", { 
            method: "POST", 
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ menuItemId }) 
          });
          
          if (res.ok) {
            setFavorites((prev) => prev.filter((item) => item.menuItemId !== menuItemId));
            toast.success("Removed from favorites", { id: loadingToast });
          }
        } catch (error) {
          toast.error("Error updating favorites", { id: loadingToast });
        }
      }
    });
  };

  if (loading || status === "loading") return (
    <div className="flex flex-col h-64 items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="font-black uppercase tracking-widest text-xs opacity-50">Loading Favorites...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header - My Bookings এর স্টাইল অনুযায়ী */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            My <span className="text-primary italic">Favorites</span>
          </h1>
          <p className="text-sm text-neutral/50 font-bold uppercase tracking-widest">
            Your most loved dishes
          </p>
        </div>
        
        {session?.user && (
          <div className="flex items-center gap-3 bg-base-200/50 px-4 py-2 rounded-2xl border border-base-content/5">
            <div className="avatar">
               <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                  <Image src={session.user.image || "https://placehold.co/32x32"} alt="user" width={32} height={32} />
               </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider opacity-60">
                Saved Items: {favorites.length}
            </div>
          </div>
        )}
      </header>

      {/* Table Section */}
      <div className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr className="text-neutral/70 uppercase text-[10px] tracking-[0.2em]">
                <th className="py-5 pl-8">Menu Item</th>
                <th>Price Details</th>
                <th>Added Date</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {favorites.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-24">
                    <div className="opacity-20 flex flex-col items-center gap-3">
                      <Heart size={60} strokeWidth={1} />
                      <p className="uppercase tracking-[0.3em] text-xs font-black">No Favorite Items</p>
                    </div>
                  </td>
                </tr>
              ) : (
                favorites.map((item) => (
                  <tr key={item._id} className="hover:bg-primary/5 transition-colors group">
                    {/* Item Details */}
                    <td className="pl-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-lg border-2 border-base-200 group-hover:border-primary/30 transition-all">
                          <Image 
                            src={item.image || "https://placehold.co/100x100"} 
                            alt={item.name} 
                            fill 
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-black">{item.name}</div>
                          <Link 
                            href={`/menu/${item.menuItemId}`}
                            className="text-[9px] text-primary flex items-center gap-1 uppercase tracking-widest hover:underline"
                          >
                            View Dish <ExternalLink size={8} />
                          </Link>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td>
                      <div className="flex items-center gap-1 text-primary">
                        <DollarSign size={14} className="opacity-50" />
                        <span className="text-lg font-black">{item.price}</span>
                      </div>
                    </td>

                    {/* Created Date */}
                    <td>
                      <div className="flex items-center gap-2 text-[11px] opacity-60 font-medium italic">
                         {new Date(item.createdAt).toLocaleDateString('en-GB', {
                           day: 'numeric',
                           month: 'short',
                           year: 'numeric'
                         })}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="text-right pr-8">
                      <div className="flex justify-end gap-2">
                        {/* Add to Cart Quick Action */}
                        <button 
                          onClick={() => toast.success("Added to cart!")}
                          className="btn btn-ghost btn-sm btn-square hover:bg-primary/10 hover:text-primary transition-all"
                        >
                          <ShoppingCart size={18} />
                        </button>
                        
                        {/* Remove Action */}
                        <button
                          onClick={() => handleRemoveFavorite(item.menuItemId, item.name)}
                          className="btn btn-ghost btn-sm btn-square hover:bg-error/10 hover:text-error transition-all"
                          title="Remove Favorite"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyFavoritesPage;