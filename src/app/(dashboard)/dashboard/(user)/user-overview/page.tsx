"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { 
  Calendar, 
  Heart, 
  Clock, 
  Users, 
  ArrowRight, 
  Star, 
  CheckCircle2, 
  Loader2 
} from "lucide-react";
import Link from "next/link";

// ডাটার টাইপ ডিফাইন করা হয়েছে যাতে TypeScript এরর না দেয়
interface Booking {
  _id: string;
  status: string;
  date: string;
  time: string;
  guests: number;
  area: string;
  message?: string;
}

interface Favorite {
  _id: string;
  name: string;
  price: string | number;
  image: string;
}

const UserOverview = () => {
  const { data: session } = useSession();
  
  // এখানে টাইপ ডিফাইন করে দেওয়া হয়েছে <Booking[]> এবং <Favorite[]>
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (session?.user?.email) {
          const [bookingRes, favRes] = await Promise.all([
            fetch(`/api/booking?email=${session.user.email}`),
            fetch(`/api/favorites`)
          ]);

          const bookingData = await bookingRes.json();
          const favData = await favRes.json();

          // ডাটা অ্যারে কিনা তা চেক করে সেট করা হচ্ছে
          setBookings(Array.isArray(bookingData) ? bookingData : []);
          setFavorites(Array.isArray(favData) ? favData : []);
        }
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-10">
      {/* --- Welcome Header --- */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-base-content">
            Welcome back, <span className="text-primary italic">{session?.user?.name?.split(' ')[0]}!</span>
          </h1>
          <p className="text-sm font-bold text-base-content/40 uppercase tracking-widest mt-1">
            Here's what's happening with your account
          </p>
        </div>
        <div className="flex -space-x-3">
            {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-base-100 bg-base-300 flex items-center justify-center overflow-hidden">
                    <Image 
                      src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name || 'User'}`} 
                      alt="user" 
                      width={40} 
                      height={40} 
                    />
                </div>
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-base-100 bg-primary text-[10px] font-bold flex items-center justify-center text-primary-content">
                +12
            </div>
        </div>
      </header>

      {/* --- Stats Quick View --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-content/5 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Active Bookings</p>
            <h3 className="text-4xl font-black mt-1">
                {bookings.filter(b => b.status === 'confirmed').length}
            </h3>
          </div>
          <Calendar className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-primary/10 group-hover:rotate-12 transition-transform" />
        </div>
        
        <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-content/5 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Favorite Items</p>
            <h3 className="text-4xl font-black mt-1">{favorites.length}</h3>
          </div>
          <Heart className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-secondary/10 group-hover:scale-110 transition-transform" />
        </div>

        <div className="bg-primary p-6 rounded-[2rem] shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="relative z-10 text-primary-content">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Membership</p>
            <h3 className="text-2xl font-black mt-1 italic">Gold Member</h3>
            <p className="text-[10px] font-medium mt-2 opacity-70">Enjoy 10% off on all orders</p>
          </div>
          <Star className="absolute right-[-10px] bottom-[-10px] w-24 h-24 text-white/10" />
        </div>
      </div>

      <div className="grid lg:grid-cols-5 gap-10">
        {/* --- Recent Reservation (Left Side) --- */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black uppercase tracking-tight">Recent <span className="text-primary italic">Reservation</span></h2>
            <Link href="/dashboard/my-bookings" className="text-xs font-bold text-primary flex items-center gap-1 hover:underline">
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {bookings.length > 0 ? (
            <div className="bg-base-100 rounded-[2.5rem] border border-base-200 p-8 relative overflow-hidden shadow-sm group">
              <div className="absolute top-0 right-0 p-6">
                <div className={`badge badge-lg border-none font-black text-[10px] uppercase tracking-widest py-4 px-6 ${
                  bookings[0].status === 'confirmed' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                }`}>
                  {bookings[0].status}
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center text-primary group-hover:rotate-6 transition-transform">
                  <Calendar size={40} strokeWidth={2.5} />
                </div>
                <div className="text-center md:text-left space-y-2">
                  <h4 className="text-2xl font-black tracking-tight">{bookings[0].date}</h4>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-bold opacity-60">
                    <span className="flex items-center gap-1.5"><Clock size={16} className="text-primary"/> {bookings[0].time}</span>
                    <span className="flex items-center gap-1.5"><Users size={16} className="text-primary"/> {bookings[0].guests} Guests</span>
                    <span className="flex items-center gap-1.5 capitalize"><CheckCircle2 size={16} className="text-primary"/> {bookings[0].area} Area</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-base-200 flex items-center gap-3 italic text-sm opacity-50">
                " {bookings[0].message || "No special requests" } "
              </div>
            </div>
          ) : (
            <div className="h-48 border-2 border-dashed border-base-content/10 rounded-[2.5rem] flex flex-col items-center justify-center opacity-30">
              <p className="font-bold uppercase tracking-[0.2em] text-xs">No Recent Bookings</p>
            </div>
          )}
        </div>

        {/* --- Top Favorites (Right Side) --- */}
        <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-black uppercase tracking-tight">Your <span className="text-secondary italic">Favorites</span></h2>
                <Link href="/dashboard/my-favorites" className="text-xs font-bold text-secondary flex items-center gap-1 hover:underline">
                    Manage <ArrowRight size={14} />
                </Link>
            </div>

            <div className="space-y-4">
                {favorites.slice(0, 3).map((fav) => (
                    <div key={fav._id} className="group bg-base-200/30 hover:bg-base-200 p-3 rounded-3xl border border-base-content/5 transition-all flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                            <Image src={fav.image} alt={fav.name} width={64} height={64} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-sm tracking-tight leading-none mb-1">{fav.name}</h4>
                            <p className="text-xs font-bold text-primary">${fav.price}</p>
                        </div>
                        <button className="btn btn-circle btn-ghost btn-sm text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                            <Heart size={18} fill="currentColor" />
                        </button>
                    </div>
                ))}
                
                {favorites.length === 0 && (
                     <div className="h-48 bg-base-200/20 rounded-[2.5rem] flex flex-col items-center justify-center opacity-30 text-center p-6">
                        <Heart size={30} className="mb-2" />
                        <p className="font-bold uppercase tracking-tight text-[10px]">Your favorite list is empty</p>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;