"use client";
import Image from "next/image";
import Link from "next/link"; // Link ইম্পোর্ট করুন
import { usePathname } from "next/navigation"; // একটিভ লিঙ্ক দেখানোর জন্য
import { useEffect, useState } from "react";
import Container from "./Container";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const pathname = usePathname(); // বর্তমান URL পাথ

  // মেনু ডাটা (সহজেই পরিবর্তনযোগ্য)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "Specialties", href: "/specialties" },
    { name: "About", href: "/about" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <Container>
        <div className="navbar p-0">
          {/* --- Mobile & Logo Section --- */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-2xl bg-base-100 rounded-2xl w-52 font-medium border border-base-200"
              >
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href} 
                      className={pathname === link.href ? "text-primary font-bold" : ""}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/" className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-bold text-xl italic">R</span>
              </div>
              <span className="text-xl font-bold tracking-tighter hidden sm:block">
                FOODIE<span className="text-primary">SQUARE</span>
              </span>
            </Link>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-1 font-semibold">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`px-4 py-2 hover:text-primary transition-colors relative group ${
                      pathname === link.href ? "text-primary" : "text-neutral"
                    }`}
                  >
                    {link.name}
                    {/* Active/Hover Indicator */}
                    <span className={`absolute bottom-1 left-4 h-0.5 bg-primary transition-all duration-300 ${
                      pathname === link.href ? "w-1/2" : "w-0 group-hover:w-1/2"
                    }`}></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* --- Action Buttons --- */}
          <div className="navbar-end gap-3">
            {/* Theme Controller */}
            <label className="swap swap-rotate btn btn-ghost btn-circle">
              <input type="checkbox" className="theme-controller" value="dark" />
              <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41L6.34,4.93a1,1,0,0,0-1.41,1.41ZM12,18a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V19A1,1,0,0,0,12,18ZM17.66,7.05a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71a1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0ZM12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Z" /></svg>
              <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Z" /></svg>
            </label>

            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary/30">
                  <div className="w-10 rounded-full">
                    <Image width={50} height={50} alt="Profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-200">
                  <li className="menu-title font-bold text-primary">Dashboard</li>
                  <li><Link href="/dashboard">My Bookings</Link></li>
                  <li><Link href="/profile">Profile Settings</Link></li>
                  <div className="divider my-0"></div>
                  <li><button className="text-error w-full text-left" onClick={() => setIsLoggedIn(false)}>Logout</button></li>
                </ul>
              </div>
            ) : (
              <button onClick={() => setIsLoggedIn(true)} className="btn btn-ghost btn-sm font-semibold">Login</button>
            )}

            <Link href="/book-table" className="btn btn-primary rounded-full px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform hidden sm:flex">
              Book Table
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;