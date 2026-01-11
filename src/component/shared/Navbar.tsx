"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Container from "./Container";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // sticky class টি এখানে বাইরের div-এ রাখা হয়েছে যাতে স্ক্রল করলেও কন্টেইনারসহ মেনু আটকে থাকে
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-base-100/80 backdrop-blur-md shadow-lg py-2"
          : "bg-transparent py-4"
      }`}
    >
      <Container>
        <div className="navbar p-0"> {/* Container-এর ভেতরে padding থাকে, তাই navbar p-0 করা হয়েছে */}
          
          {/* --- Mobile & Logo Section --- */}
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden p-0 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium"
              >
                <li><a>Home</a></li>
                <li><a>Menu</a></li>
                <li><a>About Us</a></li>
                <li><a>Contact</a></li>
              </ul>
            </div>

            <a className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
                <span className="text-white font-bold text-xl italic">R</span>
              </div>
              <span className="text-xl font-bold tracking-tighter hidden sm:block">
                FOODIE<span className="text-primary">SQUARE</span>
              </span>
            </a>
          </div>

          {/* --- Desktop Menu --- */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2 font-semibold">
              <li><a className="hover:text-primary transition-colors">Home</a></li>
              <li><a className="hover:text-primary transition-colors">Menu</a></li>
              <li><a className="hover:text-primary transition-colors">Specialties</a></li>
              <li><a className="hover:text-primary transition-colors">About</a></li>
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

            {/* Dashboard Access */}
            {isLoggedIn ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary/30">
                  <div className="w-10 rounded-full">
                    <Image width={50} height={50} alt="Profile" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-2xl bg-base-100 rounded-box w-52 border border-base-200">
                  <li className="menu-title font-bold text-primary">Dashboard</li>
                  <li><a href="/dashboard">My Bookings</a></li>
                  <li><a href="/profile">Profile Settings</a></li>
                  <div className="divider my-0"></div>
                  <li><a className="text-error" onClick={() => setIsLoggedIn(false)}>Logout</a></li>
                </ul>
              </div>
            ) : (
              <button onClick={() => setIsLoggedIn(true)} className="btn btn-ghost btn-sm font-semibold">Login</button>
            )}

            {/* Book Table Button */}
            <a className="btn btn-primary rounded-full px-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform hidden sm:flex">
              Book Table
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;