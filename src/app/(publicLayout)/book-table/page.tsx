"use client";
import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  MessageSquare,
  Utensils,
  ChevronRight,
  Info,
} from "lucide-react";
import Swal from "sweetalert2"; // SweetAlert2 ইমপোর্ট করা হয়েছে
import Container from "@/component/shared/Container";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const BookTablePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session?.user);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.email) {
      return Swal.fire("Error", "Please login to book a table", "error");
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const formDataObj = Object.fromEntries(formData.entries());

    const bookingData = {
      ...formDataObj,
      userName: session?.user?.name,
      email: session?.user?.email,
      userImage: session?.user?.image, // চাইলে ইমেজও রাখতে পারেন
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (response.ok) {

        Swal.fire({
          title: "Reservation Success!",
          text: `Thank you ${session?.user?.name}, your request is sent.`,
          icon: "success",
          confirmButtonColor: "oklch(55% 0.18 35)",
          customClass: { popup: "rounded-[2rem]" },
        });
        router.push("/dashboard/my-bookings");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(result.error || "Failed to book");
      }
    } catch (error: any) {
      Swal.fire("Error!", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-base-100 transition-colors duration-500 pb-20">
      {/* Header Section */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-base-300 border-b border-base-content/5 mb-12">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[150%] bg-secondary/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-[-50%] right-[-10%] w-[50%] h-[150%] bg-primary/10 rounded-full blur-[100px]"></div>
        </div>

        <Container>
          <div className="flex flex-col lg:flex-row items-center justify-between relative z-10 gap-8">
            <div className="text-center lg:text-left space-y-2">
              <div className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-secondary/10 border border-secondary/20 text-secondary text-[10px] font-black uppercase tracking-[0.3em]">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                Reservation
              </div>
              <h1 className="text-4xl lg:text-6xl font-black text-base-content tracking-tighter">
                Book A{" "}
                <span className="text-primary italic font-serif">Table</span>
              </h1>
              <p className="max-w-md text-base-content/50 text-sm lg:text-base font-medium">
                Secure your spot for an unforgettable culinary journey and
                exquisite dining experience.
              </p>
            </div>

            <div className="hidden lg:flex gap-10">
              <div className="text-center">
                <p className="text-3xl font-black text-primary">24/7</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
                  Booking Open
                </p>
              </div>
              <div className="w-px h-12 bg-base-content/10"></div>
              <div className="bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10">
                <p className="text-xs font-bold text-primary uppercase tracking-tighter">
                  Instant Confirmation
                </p>
                <p className="text-[10px] text-base-content/40">
                  Via email & SMS
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Info Card */}
            <div className="lg:col-span-4 space-y-6 hidden lg:block">
              <div className="bg-neutral text-neutral-content p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <h3 className="text-2xl font-black mb-6 leading-tight">
                  Dining <br /> Policy
                </h3>
                <ul className="space-y-6 text-sm opacity-80 font-medium">
                  <li className="flex gap-4">
                    <div className="p-2 bg-white/10 rounded-xl h-fit">
                      <Clock size={18} />
                    </div>
                    <p>
                      Reservations are held for up to 20 minutes past the
                      scheduled time.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="p-2 bg-white/10 rounded-xl h-fit">
                      <Users size={18} />
                    </div>
                    <p>
                      For groups larger than 10, please contact us directly via
                      phone.
                    </p>
                  </li>
                  <li className="flex gap-4">
                    <div className="p-2 bg-white/10 rounded-xl h-fit">
                      <Info size={18} />
                    </div>
                    <p>
                      Special requests are subject to availability on the day of
                      dining.
                    </p>
                  </li>
                </ul>
                <div className="mt-10 pt-8 border-t border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-2">
                    Need Help?
                  </p>
                  <p className="text-xl font-black">+880 1234 567 890</p>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-8">
              <div className="bg-base-100 p-8 md:p-12 rounded-[3.5rem] border border-base-200 shadow-sm relative overflow-hidden">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8 relative z-10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Date */}
                    <div className="form-control w-full">
                      <label className="label text-[10px] font-black uppercase tracking-widest opacity-50 px-2">
                        <span className="flex items-center gap-2">
                          <Calendar size={12} className="text-primary" /> Date
                          of Arrival
                        </span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        required
                        className="input input-bordered rounded-2xl font-bold focus:outline-primary/30"
                      />
                    </div>

                    {/* Time Slot */}
                    <div className="form-control w-full">
                      <label className="label text-[10px] font-black uppercase tracking-widest opacity-50 px-2">
                        <span className="flex items-center gap-2">
                          <Clock size={12} className="text-primary" /> Preferred
                          Time
                        </span>
                      </label>
                      <select
                        name="time"
                        required
                        className="select select-bordered rounded-2xl font-bold focus:outline-primary/30"
                      >
                        <option value="12:00 PM">12:00 PM (Lunch)</option>
                        <option value="01:30 PM">01:30 PM (Lunch)</option>
                        <option value="07:00 PM">07:00 PM (Dinner)</option>
                        <option value="08:30 PM">08:30 PM (Dinner)</option>
                        <option value="10:00 PM">10:00 PM (Dinner)</option>
                      </select>
                    </div>

                    {/* Guests */}
                    <div className="form-control w-full">
                      <label className="label text-[10px] font-black uppercase tracking-widest opacity-50 px-2">
                        <span className="flex items-center gap-2">
                          <Users size={12} className="text-primary" /> Number of
                          Guests
                        </span>
                      </label>
                      <input
                        type="number"
                        name="guests"
                        min="1"
                        max="10"
                        placeholder="Ex: 4"
                        required
                        className="input input-bordered rounded-2xl font-bold focus:outline-primary/30"
                      />
                    </div>

                    {/* Table Preference */}
                    <div className="form-control w-full">
                      <label className="label text-[10px] font-black uppercase tracking-widest opacity-50 px-2">
                        <span className="flex items-center gap-2">
                          <Utensils size={12} className="text-primary" /> Table
                          Area
                        </span>
                      </label>
                      <select
                        name="area"
                        className="select select-bordered rounded-2xl font-bold focus:outline-primary/30"
                      >
                        <option value="indoor">Indoor (Main Hall)</option>
                        <option value="window">Window Side</option>
                        <option value="rooftop">Rooftop Garden</option>
                        <option value="private">Private Room</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-control w-full">
                    <label className="label text-[10px] font-black uppercase tracking-widest opacity-50 px-2">
                      <span className="flex items-center gap-2">
                        <MessageSquare size={12} className="text-primary" />{" "}
                        Special Requests
                      </span>
                    </label>
                    <textarea
                      name="message"
                      className="textarea textarea-bordered rounded-2xl font-medium h-32 focus:outline-primary/30"
                      placeholder="Birthday celebration, baby chair, or food allergies..."
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn btn-primary w-full md:w-auto px-10 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 h-14 group"
                    >
                      {loading ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Confirm Reservation{" "}
                          <ChevronRight
                            size={18}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default BookTablePage;
