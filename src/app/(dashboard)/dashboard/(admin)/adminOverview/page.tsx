"use client";
import React, { useEffect, useState } from "react";
import { 
  Users, 
  Utensils, 
  CalendarCheck, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Loader2,
  ChefHat,
  Timer,
  Star
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMenu: 0,
    totalBookings: 0,
    pendingBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [userRes, menuRes, bookingRes] = await Promise.all([
          fetch("/api/register"),
          fetch("/api/menu"),
          fetch("/api/booking"),
        ]);

        const users = await userRes.json();
        const menu = await menuRes.json();
        const bookings = await bookingRes.json();

        // Safe checks: Ensure the data is an array before processing
        const safeUsers = Array.isArray(users) ? users : [];
        const safeMenu = Array.isArray(menu) ? menu : [];
        const safeBookings = Array.isArray(bookings) ? bookings : [];

        setStats({
          totalUsers: safeUsers.length,
          totalMenu: safeMenu.length,
          totalBookings: safeBookings.length,
          pendingBookings: safeBookings.filter((b) => b.status === "pending").length,
        });

        setRecentBookings(safeBookings.slice(0, 5)); 
      } catch (error) {
        console.error("Error loading admin stats:", error);
        // Reset to empty states on error to prevent UI crash
        setRecentBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={40} />
    </div>
  );

  return (
    <div className="space-y-10 pb-10">
      {/* --- Admin Header --- */}
      <header>
        <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          System Analytics
        </div>
        <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
          Admin <span className="text-primary italic">Overview</span>
        </h1>
        <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest mt-1">
          Monitor your restaurant operations in real-time
        </p>
      </header>

      {/* --- Key Metrics Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Users", val: stats.totalUsers, icon: Users, color: "bg-blue-500/10 text-blue-500" },
          { label: "Menu Items", val: stats.totalMenu, icon: Utensils, color: "bg-primary/10 text-primary" },
          { label: "Total Reservations", val: stats.totalBookings, icon: CalendarCheck, color: "bg-secondary/10 text-secondary" },
          { label: "Pending Requests", val: stats.pendingBookings, icon: Timer, color: "bg-warning/10 text-warning" },
        ].map((item, idx) => (
          <div key={idx} className="bg-base-200/50 p-6 rounded-[2rem] border border-base-content/5 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                <item.icon size={20} />
              </div>
              <div>
                <h3 className="text-3xl font-black">{item.val}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mt-1">{item.label}</p>
              </div>
            </div>
            <TrendingUp className="absolute right-[-10px] bottom-[-10px] w-20 h-20 opacity-5 group-hover:scale-110 transition-transform" />
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* --- Recent Reservation Activity (Left 3 cols) --- */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight">Recent <span className="text-primary italic">Requests</span></h2>
            <Link href="/dashboard/reservations" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              Manage All <ArrowUpRight size={14} />
            </Link>
          </div>

          <div className="bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200/50">
                  <tr className="text-neutral/70 uppercase text-[9px] tracking-widest border-none">
                    <th className="py-5 pl-8">Customer</th>
                    <th>Status</th>
                    <th className="text-right pr-8">Date</th>
                  </tr>
                </thead>
                <tbody className="font-bold text-xs">
                  {recentBookings.map((book) => (
                    <tr key={book._id} className="border-none">
                      <td className="pl-8 py-4 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20">
                            <Image 
                                src={book.userImage || `https://ui-avatars.com/api/?name=${book.userName}`} 
                                alt="u" width={32} height={32} unoptimized
                            />
                         </div>
                         <span>{book.userName}</span>
                      </td>
                      <td>
                        <div className={`badge badge-sm border-none font-black text-[8px] uppercase tracking-tighter ${
                            book.status === 'confirmed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                            {book.status}
                        </div>
                      </td>
                      <td className="text-right pr-8 opacity-50">{book.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- Management Quick Links (Right 2 cols) --- */}
        <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-black uppercase tracking-tight">Quick <span className="text-secondary italic">Actions</span></h2>
            
            <div className="grid gap-4">
                <Link href="/dashboard/add-menu" className="group bg-primary p-6 rounded-[2rem] flex items-center justify-between hover:scale-[1.02] transition-all shadow-xl shadow-primary/20">
                    <div className="flex items-center gap-4 text-primary-content">
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Utensils />
                        </div>
                        <div>
                            <p className="font-black leading-none tracking-tight">Add New Dish</p>
                            <p className="text-[10px] opacity-70 mt-1 uppercase font-bold tracking-widest">Update Menu</p>
                        </div>
                    </div>
                    <ArrowUpRight className="text-primary-content opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>

                <div className="bg-base-200/50 p-6 rounded-[2.5rem] border border-base-content/5 relative overflow-hidden group">
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                            <ChefHat />
                        </div>
                        <div>
                            <p className="font-black tracking-tight leading-none text-base-content">Top Specialty</p>
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Ribeye Steak</p>
                        </div>
                    </div>
                    <Star className="absolute right-[-10px] top-[-10px] w-20 h-20 text-secondary/5" />
                </div>

                <div className="bg-base-300/40 p-5 rounded-[2rem] border border-base-content/5 flex items-center justify-between px-8">
                    <div className="flex items-center gap-3">
                        <Clock size={18} className="text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Peak Hours</span>
                    </div>
                    <span className="text-xs font-black">07:00 PM - 09:00 PM</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;