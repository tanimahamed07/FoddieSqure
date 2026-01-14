"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/component/shared/Container";

// React Icons Imports
import {
  HiOutlineViewGrid,
  HiOutlineMenuAlt2,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineLogout,
  HiOutlineCog,
  HiOutlineHome,
  HiOutlineCreditCard,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { useSession } from "next-auth/react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { data: session } = useSession();
  console.log(session?.user?.role);

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    // চেক করা হচ্ছে থিমটি 'dark' কি না
    if (storedTheme === "dark") {
      setTheme("dark");
      document.querySelector("html")?.setAttribute("data-theme", "dark");
    }
  }, []);

  const handleTheme = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);

    const html = document.querySelector("html");
    if (newTheme === "dark") {
      html?.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); // dark হলে সেভ হবে
    } else {
      html?.removeAttribute("data-theme");
      localStorage.removeItem("theme"); // light হলে বা দরকার না হলে রিমুভ করে দিতে পারেন
    }
  };
  // রোল অনুযায়ী লিঙ্ক সেট করা
  const isAdmin = session?.user?.role === "admin";

  const adminLinks = [
    { name: "Overview", href: "/admin/dashboard", icon: <HiOutlineViewGrid /> },
    {
      name: "Manage Menu",
      href: "/dashboard/manage-menu",
      icon: <MdOutlineRestaurantMenu />,
    },
    {
      name: "Reservations",
      href: "/dashboard/reservations",
      icon: <HiOutlineCalendar />,
    },
    {
      name: "User Management",
      href: "/dashboard/users",
      icon: <HiOutlineUserGroup />,
    },
    {
      name: "Profile Settings",
      href: "dashboard/profile",
      icon: <HiOutlineCog />,
    },
  ];

  const userLinks = [
    { name: "Overview", href: "/dashboard", icon: <HiOutlineHome /> },
    {
      name: "My Bookings",
      href: "/dashboard/my-bookings",
      icon: <HiOutlineCalendar />,
    },
    {
      name: "Payment History",
      href: "/dashboard/payments",
      icon: <HiOutlineCreditCard />,
    },
    {
      name: "Profile Settings",
      href: "/dashboard/profile",
      icon: <HiOutlineUserCircle />,
    },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <main className="min-h-screen bg-base-100 flex flex-col lg:flex-row">
    {/* --- Sidebar --- */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-base-200 border-r border-base-content/5 transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 lg:h-screen ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          {/* Dashboard Header - Logo Replaced Here */}
          <div className="mb-10">
            <Link
              href="/"
              className="flex items-center gap-2 group transition-transform active:scale-95"
            >
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                <span className="text-white font-bold text-xl italic">R</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tighter uppercase leading-none">
                  Foodie<span className="text-primary">Square</span>
                </span>
                <span className="text-[10px] text-neutral/40 font-bold tracking-[0.3em] uppercase mt-1">
                  {isAdmin ? "Admin Panel" : "User Portal"}
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-2xl font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-primary text-primary-content shadow-lg shadow-primary/20 scale-105"
                      : "text-base-content/60 hover:bg-base-300 hover:text-primary"
                  }`}
                >
                  <span className="text-2xl">{link.icon}</span>
                  <span className="text-sm tracking-tight">{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Bottom Logout Button */}
          <div className="mt-auto pt-6 border-t border-base-content/5">
            <button className="flex items-center gap-4 px-4 py-3 w-full rounded-2xl font-bold text-error hover:bg-error/10 transition-all group">
              <HiOutlineLogout className="text-2xl group-hover:translate-x-1 transition-transform" />
              <span className="text-sm uppercase tracking-widest">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-base-200 border-b border-base-content/5">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="btn btn-ghost btn-circle text-2xl text-primary"
          >
            <HiOutlineMenuAlt2 />
          </button>
          <span className="font-black text-xl tracking-tighter uppercase">
            Foodie<span className="text-primary">Square</span>
          </span>
          <div className="w-10"></div>
        </header>

        {/* Content Section */}
        <section className="p-4 lg:p-10 bg-base-100 relative overflow-hidden flex-1">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

          <Container>
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
            </div>
          </Container>
        </section>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </main>
  );
};

export default DashboardLayout;
