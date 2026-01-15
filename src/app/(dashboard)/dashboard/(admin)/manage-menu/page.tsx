"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { TMenu } from "@/types/menu";

const ManageMenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSafeImageUrl = (url: string) => {
    if (!url) return "https://placehold.co/400x400?text=No+Image";
    try {
      new URL(url); // এটি চেক করে URL-এ http:// বা https:// আছে কি না
      return url;
    } catch (e) {
      // যদি URL ভুল হয় (যেমন: শুধু "image.jpg" লেখা), তবে এই প্লেসহোল্ডারটি দেখাবে
      return "https://placehold.co/400x400?text=Invalid+URL";
    }
  };
  // ডাটা ফেচ করা
  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        setMenuItems(data);
        setLoading(false);
      });
  }, []);

  // ডিলিট হ্যান্ডলার
 const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this dish!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87272", 
      cancelButtonColor: "#a6adbb", 
      confirmButtonText: "Yes, delete it!",
      background: "#1d232a", 
      color: "#ffffff",
      // ✅ borderRadius সরিয়ে customClass ব্যবহার করা হয়েছে
      customClass: {
        popup: "rounded-[2rem]",
        confirmButton: "rounded-xl",
        cancelButton: "rounded-xl"
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/menu/${id}`, { method: "DELETE" });
          if (res.ok) {
            setMenuItems(menuItems.filter((item: any) => item.id !== id));
            
            Swal.fire({
              title: "Deleted!",
              text: "The dish has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: "#1d232a",
              color: "#ffffff",
              // ✅ এখানেও customClass ব্যবহার করা হয়েছে
              customClass: {
                popup: "rounded-[2rem]"
              }
            });
          }
        } catch (error) {
          toast.error("Failed to delete item");
        }
      }
    });
  };

  console.log(menuItems)

  if (loading) return <div className="p-10 text-center">Loading Menu...</div>;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            Manage <span className="text-primary">Menu</span>
          </h1>
          <p className="text-sm text-neutral/50 font-bold uppercase tracking-widest">
            Update your restaurant offerings
          </p>
        </div>
        <Link
          href="/dashboard/add-menu"
          className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Add New Item
        </Link>
      </div>

      {/* Table Section */}
      <div className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead className="bg-base-200/50">
              <tr className="text-neutral/70 uppercase text-[10px] tracking-[0.2em]">
                <th className="py-5 pl-8">Item</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {menuItems.map((item: TMenu) => (
                <tr
                  key={item.id}
                  className="hover:bg-primary/5 transition-colors"
                >
                  <td className="pl-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <Image
                            src={getSafeImageUrl(item.image)} // এখানে ফাংশনটি কল করা হয়েছে
                            alt={item.name}
                            width={48}
                            height={48}
                            unoptimized // এটি যোগ করা হয়েছে যাতে এক্সটার্নাল ইমেজের জন্য ডোমেইন এরর না দেয়
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-black">{item.name}</div>
                        <div className="text-[10px] opacity-40 uppercase">
                          {item.preparationTime}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-ghost font-bold text-[10px] uppercase border-base-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="text-primary">${item.price}</td>
                  <td>
                    {item.isAvailable ? (
                      <span className="text-success text-[10px] uppercase tracking-widest">
                        Available
                      </span>
                    ) : (
                      <span className="text-error text-[10px] uppercase tracking-widest">
                        Sold Out
                      </span>
                    )}
                  </td>
                  <td className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/dashboard/manage-menu/edit/${item.id}`}
                        className="btn btn-ghost btn-sm btn-square hover:text-primary"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id!)}
                        className="btn btn-ghost btn-sm btn-square hover:text-error"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageMenuPage;
