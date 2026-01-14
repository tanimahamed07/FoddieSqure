"use client";
import React, { useState } from "react";
import { 
  Calendar, 
  Clock, 
  Users, 
  MessageSquare, 
  Utensils, 
  ChevronRight,
  MapPin,
  Phone
} from "lucide-react";

import toast from "react-hot-toast";
import Image from "next/image";
import Container from "../shared/Container";

const BookTablePage = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      console.log("Booking Data:", data);
      setTimeout(() => {
        toast.success("Reservation request sent! We will contact you soon.");
        setLoading(false);
        (e.target as HTMLFormElement).reset();
      }, 1500);
    } catch (error) {
      toast.error("Failed to book table");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-100 pb-20 animate-in fade-in duration-700">
      
      {/* --- Section 1: Hero Banner --- */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Banner Image with Overlay */}
        <Image 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070" 
          alt="Restaurant Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-neutral/70 backdrop-blur-[2px]"></div>
        
        {/* Banner Content */}
        <div className="relative z-10 text-center space-y-4 px-6">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-sm">
            Experience Excellence
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            RESERVE A <span className="text-primary italic">TABLE</span>
          </h1>
          <div className="w-24 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>
      </section>

      {/* --- Section 2: Booking Form & Info --- */}
      <section className="relative -mt-16 z-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Side: Form Panel */}
            <div className="lg:col-span-8">
              <div className="bg-base-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-base-200 relative overflow-hidden">
                {/* Decorative Blur */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2 ml-2">
                        <Calendar size={14} className="text-primary" /> Select Date
                      </label>
                      <input 
                        type="date" 
                        name="date"
                        required
                        className="input input-bordered w-full rounded-2xl font-bold focus:outline-primary/30 h-14 bg-base-200/30 border-base-content/10" 
                      />
                    </div>

                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2 ml-2">
                        <Users size={14} className="text-primary" /> Number of Guests
                      </label>
                      <select name="guests" className="select select-bordered w-full rounded-2xl font-bold h-14 bg-base-200/30 border-base-content/10 focus:outline-primary/30">
                        {[1,2,3,4,5,6,7,8,9,10].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'People'}</option>
                        ))}
                        <option value="10+">More than 10</option>
                      </select>
                    </div>

                    {/* Time Slot */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2 ml-2">
                        <Clock size={14} className="text-primary" /> Preferred Time
                      </label>
                      <select name="time" className="select select-bordered w-full rounded-2xl font-bold h-14 bg-base-200/30 border-base-content/10 focus:outline-primary/30">
                        <option>12:30 PM</option>
                        <option>02:00 PM</option>
                        <option>07:00 PM</option>
                        <option>08:30 PM</option>
                        <option>10:00 PM</option>
                      </select>
                    </div>

                    {/* Table Area */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2 ml-2">
                        <Utensils size={14} className="text-primary" /> Dining Area
                      </label>
                      <select name="area" className="select select-bordered w-full rounded-2xl font-bold h-14 bg-base-200/30 border-base-content/10 focus:outline-primary/30">
                        <option value="main">Main Dining Hall</option>
                        <option value="window">Window Side</option>
                        <option value="rooftop">Rooftop Garden</option>
                        <option value="private">Private VIP Cabin</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest opacity-60 flex items-center gap-2 ml-2">
                      <MessageSquare size={14} className="text-primary" /> Special Requests
                    </label>
                    <textarea 
                      name="message"
                      placeholder="Birthdays, Allergies, or baby chairs..."
                      className="textarea textarea-bordered w-full rounded-2xl font-medium h-32 bg-base-200/30 border-base-content/10 focus:outline-primary/30"
                    ></textarea>
                  </div>

                  <button 
                    disabled={loading}
                    className="btn btn-primary w-full md:w-auto px-12 rounded-full font-black uppercase tracking-widest shadow-xl shadow-primary/20 h-14 transition-all hover:scale-105 active:scale-95"
                  >
                    {loading ? <span className="loading loading-spinner"></span> : "Confirm Booking"}
                    <ChevronRight size={18} />
                  </button>
                </form>
              </div>
            </div>

            {/* Right Side: Quick Info */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-neutral text-neutral-content p-10 rounded-[2.5rem] shadow-xl space-y-8 h-full">
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight">Visit Us</h3>
                  <p className="text-sm opacity-60 mt-2 font-medium">Join us for a unique dining experience crafted by master chefs.</p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Location</p>
                      <p className="font-bold text-sm">123 Foodie Street, Gulshan 2, Dhaka</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary rounded-2xl text-white shadow-lg shadow-primary/20">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase opacity-40 tracking-widest">Contact</p>
                      <p className="font-bold text-sm">+880 1789 456 123</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs font-bold leading-relaxed opacity-60">
                    * For immediate assistance or large events, please call our support line.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
};

export default BookTablePage;