"use client";
import React, { useEffect, useState } from "react";
import { 
  Mail, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Camera, 
  Loader2, 
  User as UserIcon, 
  Fingerprint,
  Lock
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // এখানে আপনার সেশন থেকে লগইন করা ইউজারের ইমেইল অনুযায়ী ডেটা ফিল্টার করা উচিত
        const res = await fetch("/api/register"); 
        const data = await res.json();
        
        // উদাহরণ হিসেবে সবশেষ রেজিস্টার্ড ইউজার বা প্রথম ইউজার নেওয়া হচ্ছে
        // বাস্তব ক্ষেত্রে এটি সেশনের ইউজার হবে (e.g., data.find(u => u.email === session.user.email))
        setUserData(data[0]); 
      } catch (error) {
        toast.error("Failed to load profile info");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // ইমেজ হ্যান্ডলিং: গুগল ইমেজ বা ইউআই-অবতার
  const getSafeProfileImage = (url: string) => {
    if (!url || url.includes("googleusercontent.com/profile/picture/0")) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || "User")}&background=random&size=256`;
    }
    return url;
  };

  if (loading) return (
    <div className="flex h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="font-black uppercase tracking-widest text-[10px] opacity-50">Synchronizing Profile...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-4xl font-black tracking-tighter">
          ACCOUNT <span className="text-primary italic">HUB</span>
        </h1>
        <p className="text-[10px] text-neutral/40 font-black uppercase tracking-[0.3em] ml-1">
          Identity & Security Management
        </p>
      </header>

      {/* Hero Profile Card */}
      <div className="relative bg-base-100 rounded-[3.5rem] p-8 md:p-14 border border-base-200 shadow-2xl shadow-primary/5 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
          {/* Avatar Area */}
          <div className="relative group">
            <div className="w-44 h-44 rounded-[3.5rem] overflow-hidden border-8 border-base-200 shadow-inner bg-base-300 relative">
              <Image 
                src={getSafeProfileImage(userData?.image)} 
                alt="Profile Avatar" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
                unoptimized
              />
            </div>
            <button className="absolute -bottom-2 -right-2 p-4 bg-primary text-white rounded-[1.5rem] shadow-2xl hover:scale-110 active:scale-90 transition-all border-4 border-base-100">
              <Camera size={20} strokeWidth={3} />
            </button>
          </div>

          {/* User Status Info */}
          <div className="text-center md:text-left space-y-5">
            <div className="space-y-1">
              <h2 className="text-5xl font-black tracking-tighter text-neutral leading-none">
                {userData?.name}
              </h2>
              <div className="flex items-center justify-center md:justify-start gap-2 text-primary font-black uppercase text-[10px] tracking-widest opacity-80">
                <ShieldCheck size={14} strokeWidth={3} />
                {userData?.provider === "google" ? "Google Authenticated" : "Internal Database Member"}
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <div className={`flex items-center gap-2 py-3 px-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.15em] shadow-sm ${
                userData?.role === "admin" ? "bg-primary text-white" : "bg-neutral text-neutral-content"
              }`}>
                {userData?.role === "admin" ? <ShieldCheck size={14} /> : <UserIcon size={14} />}
                {userData?.role}
              </div>
              <div className="flex items-center gap-2 bg-base-200 text-neutral/60 py-3 px-6 rounded-2xl font-black uppercase text-[10px] tracking-[0.15em]">
                <Calendar size={14} />
                EST. {userData?.createdAt ? new Date(userData.createdAt).getFullYear() : "2026"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        
        {/* Data Panel */}
        <div className="lg:col-span-3 bg-base-100 p-10 md:p-12 rounded-[3.5rem] border border-base-200 space-y-10">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neutral/20">Profile Details</h3>
            <div className="h-[2px] flex-grow ml-4 bg-base-200"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase opacity-40 flex items-center gap-2 tracking-widest">
                <Mail size={12} className="text-primary" /> Primary Email
              </label>
              <p className="font-bold text-neutral text-lg break-all">{userData?.email}</p>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase opacity-40 flex items-center gap-2 tracking-widest">
                <Phone size={12} className="text-primary" /> Phone Line
              </label>
              <p className="font-bold text-neutral text-lg">
                {userData?.phone || "Not Verified"}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase opacity-40 flex items-center gap-2 tracking-widest">
                <Fingerprint size={12} className="text-primary" /> Unique Identifier
              </label>
              <p className="font-mono text-[10px] opacity-50 bg-base-200 p-2 rounded-lg truncate">
                {userData?._id}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase opacity-40 flex items-center gap-2 tracking-widest">
                <Calendar size={12} className="text-primary" /> Registration Date
              </label>
              <p className="font-bold text-neutral text-lg">
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-GB') : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Security Panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-neutral text-neutral-content p-10 rounded-[3.5rem] shadow-xl flex-grow flex flex-col justify-between gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center">
                <Lock size={24} className="text-primary" />
              </div>
              <h3 className="text-xl font-black tracking-tight">Access Control</h3>
              <p className="text-xs opacity-60 font-medium leading-relaxed">
                Your profile is protected with multi-layer encryption. You can update your contact details or change security credentials.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button className="btn btn-primary rounded-2xl font-black uppercase tracking-widest text-[11px] h-14 hover:shadow-lg hover:shadow-primary/30 transition-all">
                Modify Profile
              </button>
              <button className="btn btn-ghost bg-white/5 border-none rounded-2xl font-black uppercase tracking-widest text-[11px] h-14 hover:bg-white/10">
                Reset Password
              </button>
            </div>
          </div>

          {/* Mini Status Box */}
          <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-200 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase opacity-40 tracking-widest ml-2">Account Health</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase">Optimal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;