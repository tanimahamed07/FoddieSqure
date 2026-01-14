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
  User as UserIcon
} from "lucide-react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

const MyBookingsPage = () => {
  const { data: session } = useSession(); 
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      // সেশন থেকে ইমেইল নিয়ে API কল করা হচ্ছে
      const url = session?.user?.email 
        ? `/api/booking?email=${session.user.email}` 
        : "/api/booking";
        
      const res = await fetch(url);
      const data = await res.json();
      
      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (error) {
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchBookings();
    }
  }, [session]);

  const handleDeleteBooking = (id: string) => {
    Swal.fire({
      title: "Cancel Reservation?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f87272",
      cancelButtonColor: "#a6adbb",
      confirmButtonText: "Yes, cancel it!",
      background: "#1d232a",
      color: "#ffffff",
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl font-bold uppercase tracking-widest px-6'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        const loadingToast = toast.loading("Processing...");
        try {
          const res = await fetch(`/api/booking?id=${id}`, { method: "DELETE" });
          if (res.ok) {
            setBookings((prev) => prev.filter((item) => item._id !== id));
            toast.success("Booking cancelled", { id: loadingToast });
            Swal.fire({
              title: "Cancelled!",
              text: "Your reservation has been removed.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
              background: "#1d232a",
              color: "#ffffff",
            });
          }
        } catch (error) {
          toast.error("Error cancelling booking", { id: loadingToast });
        }
      }
    });
  };

  if (loading) return (
    <div className="flex flex-col h-64 items-center justify-center gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="font-black uppercase tracking-widest text-xs opacity-50">Loading Reservations...</p>
    </div>
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">
            My <span className="text-primary italic">Reservations</span>
          </h1>
          <p className="text-sm text-neutral/50 font-bold uppercase tracking-widest">
            Manage your dining schedule
          </p>
        </div>
        {session?.user && (
          <div className="flex items-center gap-3 bg-base-200/50 px-4 py-2 rounded-2xl border border-base-content/5">
            <div className="avatar">
               <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                  <Image src={session.user.image || ""} alt="user" width={32} height={32} />
               </div>
            </div>
            <div className="text-[10px] font-black uppercase tracking-wider opacity-60">
                {session.user.name}
            </div>
          </div>
        )}
      </header>

      <div className="bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr className="text-neutral/70 uppercase text-[10px] tracking-[0.2em]">
                <th className="py-5 pl-8">Booking Details</th>
                <th>Guest & Area</th>
                <th>Special Request</th>
                <th>Status</th>
                <th className="text-right pr-8">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-24">
                    <div className="opacity-20 flex flex-col items-center gap-3">
                      <Calendar size={60} strokeWidth={1} />
                      <p className="uppercase tracking-[0.3em] text-xs font-black">No Active Reservations</p>
                    </div>
                  </td>
                </tr>
              ) : (
                bookings.map((item) => (
                  <tr key={item._id} className="hover:bg-primary/5 transition-colors group">
                    {/* Booking Details */}
                    <td className="pl-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="hidden sm:flex p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <div className="text-sm font-black">{item.date}</div>
                          <div className="text-[10px] opacity-40 flex items-center gap-1 uppercase tracking-tighter">
                            <Clock size={10} /> {item.time}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Guest & Area */}
                    <td>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          <Users size={12} className="text-primary" />
                          <span>{item.guests} Guests</span>
                        </div>
                        <div className="badge badge-ghost font-bold text-[9px] uppercase h-5 px-2 opacity-60 gap-1 border-none">
                          <MapPin size={10} /> {item.area}
                        </div>
                      </div>
                    </td>

                    {/* Request */}
                    <td className="max-w-[180px]">
                      <div className="flex items-start gap-2 text-[11px] opacity-60 italic font-medium leading-relaxed">
                        <MessageSquare size={12} className="mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{item.message || "No special instructions"}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td>
                      <div className={`badge badge-outline text-[9px] font-black uppercase tracking-widest px-3 ${
                        item.status === 'pending' ? 'badge-warning' : 'badge-success'
                      }`}>
                        {item.status}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="text-right pr-8">
                      <button
                        onClick={() => handleDeleteBooking(item._id)}
                        className="btn btn-ghost btn-sm btn-square hover:bg-error/10 hover:text-error transition-all"
                        title="Cancel Reservation"
                      >
                        <Trash2 size={18} />
                      </button>
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

export default MyBookingsPage;