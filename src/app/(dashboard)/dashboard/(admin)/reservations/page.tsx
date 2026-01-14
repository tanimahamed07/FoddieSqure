"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { 
  Trash2, 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Loader2, 
  MessageSquare, 
  CheckCircle2, 
  Timer 
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ReservationsPage = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch("/api/booking");
      const data = await res.json();
      setBookings(data);
    } catch (error) {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // --- স্ট্যাটাস পরিবর্তন হ্যান্ডলার (Pending to Confirmed) ---
  const updateStatus = async (id: string, currentStatus: string) => {
    if (currentStatus === "confirmed") return;

    Swal.fire({
      title: "Confirm Reservation?",
      text: "Do you want to mark this booking as confirmed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#a6adbb",
      confirmButtonText: "Yes, Confirm!",
      background: "#1d232a",
      color: "#ffffff",
      customClass: { popup: 'rounded-[2rem]' }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const tId = toast.loading("Updating status...");
        try {
          const res = await fetch(`/api/booking`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: "confirmed" }),
          });

          if (res.ok) {
            setBookings((prev) =>
              prev.map((b) => (b._id === id ? { ...b, status: "confirmed" } : b))
            );
            toast.success("Reservation Confirmed!", { id: tId });
          }
        } catch (error) {
          toast.error("Failed to update status", { id: tId });
        }
      }
    });
  };

  // ডিলিট হ্যান্ডলার
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This reservation will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87272",
      confirmButtonText: "Yes, delete!",
      background: "#1d232a",
      color: "#ffffff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/booking?id=${id}`, { method: "DELETE" });
          if (res.ok) {
            setBookings((prev) => prev.filter((b) => b._id !== id));
            toast.success("Deleted successfully");
          }
        } catch (error) {
          toast.error("Delete failed");
        }
      }
    });
  };

  if (loading) return (
    <div className="flex flex-col h-64 items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="font-black uppercase tracking-widest text-xs opacity-50">Loading Bookings...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-black tracking-tight">
          Manage <span className="text-primary">Reservations</span>
        </h1>
        <p className="text-sm text-neutral/50 font-bold uppercase tracking-widest">
          Review and confirm table bookings
        </p>
      </header>

      <div className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr className="text-neutral/70 uppercase text-[10px] tracking-[0.2em]">
                <th className="py-5 pl-8">Customer</th>
                <th>Schedule</th>
                <th>Guests & Area</th>
                <th>Status</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {bookings.map((item) => (
                <tr key={item._id} className="hover:bg-primary/5 transition-colors">
                  <td className="pl-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 border border-base-content/10">
                          <Image
                            src={item.userImage || `https://ui-avatars.com/api/?name=${item.userName}`}
                            alt="User" width={48} height={48} unoptimized
                          />
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-black">{item.userName}</div>
                        <div className="text-[10px] opacity-40 lowercase">{item.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <Calendar size={12} className="text-primary" /> {item.date}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] opacity-50">
                        <Clock size={10} /> {item.time}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-black">
                        <Users size={12} /> {item.guests} Persons
                      </div>
                      <div className="badge badge-ghost text-[9px] uppercase tracking-wider h-5 border-none">
                        <MapPin size={10} className="mr-1" /> {item.area}
                      </div>
                    </div>
                  </td>
                  <td>
                    <button 
                      onClick={() => updateStatus(item._id, item.status)}
                      className={`badge gap-2 transition-all active:scale-95 border-none font-bold text-[10px] uppercase h-7 px-4 ${
                        item.status === "confirmed" 
                        ? "badge-success text-white" 
                        : "badge-warning text-black"
                      }`}
                    >
                      {item.status === "confirmed" ? <CheckCircle2 size={12} /> : <Timer size={12} />}
                      {item.status}
                    </button>
                  </td>
                  <td className="text-right pr-8">
                    <div className="flex justify-end gap-2">
                      <div className="dropdown dropdown-left">
                        <label tabIndex={0} className="btn btn-ghost btn-sm btn-square">
                          <MessageSquare size={18} className="opacity-50" />
                        </label>
                        <div tabIndex={0} className="dropdown-content z-[1] card card-compact w-64 p-4 shadow bg-neutral text-neutral-content rounded-2xl mr-2">
                          <p className="text-xs italic font-medium">"{item.message || "No special request"}"</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="btn btn-ghost btn-sm btn-square hover:text-error transition-colors"
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

export default ReservationsPage;