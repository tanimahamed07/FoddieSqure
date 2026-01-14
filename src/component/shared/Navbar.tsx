"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "./Container";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const isLoggedIn = !!session?.user; 
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState("light");
  const pathname = usePathname();

  // থিম এবং স্ক্রল কন্ট্রোল (আপনার আগের কোড অনুযায়ী)
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    const html = document.querySelector("html");
    storedTheme === "dark" ? html?.setAttribute("data-theme", "dark") : html?.removeAttribute("data-theme");

    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTheme = (checked) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    const html = document.querySelector("html");
    newTheme === "dark" ? html?.setAttribute("data-theme", "dark") : html?.removeAttribute("data-theme");
    localStorage.setItem("theme", newTheme);
  };

  // --- নবলিঙ্ক সেটআপ ---
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Specialties", href: "/specialties" },
    { name: "About", href: "/about" },
  ];

  // লগইন থাকলে ড্যাশবোর্ড লিঙ্ক যুক্ত হবে (সার্ভার সাইড রোল চেক করা ভালো, এখানে সিম্পল রাখা হয়েছে)
  if (isLoggedIn) {
    navLinks.push({ name: "Dashboard", href: "/dashboard" });
  }

  return (
    <div className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-base-100/80 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4"
      }`}>
      <Container>
        <div className="navbar p-0">
          <div className="navbar-start">
            {/* Mobile Menu */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-52 border border-base-200">
                {navLinks.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.name}</Link></li>
                ))}
              </ul>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl italic">R</span>
              </div>
              <span className="text-xl font-bold tracking-tighter hidden sm:block uppercase">Foodie<span className="text-primary">Square</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1 font-semibold">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={`px-4 py-2 hover:text-primary relative group ${pathname === link.href ? "text-primary" : ""}`}>
                    {link.name}
                    <span className={`absolute bottom-1 left-4 h-0.5 bg-primary transition-all duration-300 ${pathname === link.href ? "w-1/2" : "w-0 group-hover:w-1/2"}`}></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end gap-3">
            {/* Theme Toggle */}
            <button className="btn btn-ghost btn-circle bg-base-200/50">
              <label className="swap swap-rotate cursor-pointer">
                <input type="checkbox" checked={theme === "dark"} onChange={(e) => handleTheme(e.target.checked)} />
                <svg className="swap-on fill-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Z" /></svg>
                <svg className="swap-off fill-primary w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" /></svg>
              </label>
            </button>

            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary/30">
                  <div className="w-10 rounded-full">
                    <Image width={50} height={50} alt="Profile" src={session?.user?.image || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-200">
                  <li className="px-4 py-2 font-bold text-primary border-b border-base-200">{session?.user?.name}</li>
                  <li><Link href="/dashboard">Dashboard</Link></li>
                  <li><button className="text-error" onClick={() => signOut()}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <Link href="/login" className="btn btn-ghost btn-sm font-semibold">Login</Link>
            )}

            <Link href="/book-table" className="btn btn-primary rounded-full px-6 shadow-lg hidden sm:flex">Book Table</Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;