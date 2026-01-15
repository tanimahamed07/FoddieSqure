"use client";
import React, { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ActionProps {
  item: any;
  session: any;
  initialIsFavorite: boolean;
}

const MenuActionButtons = ({
  item,
  session,
  initialIsFavorite,
}: ActionProps) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [favLoading, setFavLoading] = useState(false);

  const isAdmin = session?.user?.role === "admin";
  const isLoggedIn = !!session?.user;

  // ফেভারিট টগল লজিক
  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      toast.error("Please login first!");
      return router.push("/login");
    }
    setFavLoading(true);
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        body: JSON.stringify({
          menuItemId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsFavorite(data.isFavorite);
        toast.success(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Favorite Button */}
      <button
        disabled={isAdmin || favLoading}
        onClick={toggleFavorite}
        className={`btn btn-outline btn-lg flex-1 rounded-2xl border-2 transition-all duration-300
        ${
          isFavorite
            ? "bg-secondary border-secondary text-neutral"
            : "hover:bg-secondary hover:text-neutral"
        }
        ${isAdmin ? "opacity-30 cursor-not-allowed" : ""}`}
      >
        <Heart size={24} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>
  );
};

export default MenuActionButtons;
