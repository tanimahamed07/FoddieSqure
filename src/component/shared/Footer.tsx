import React from "react";
import Container from "../shared/Container";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-neutral-content pt-10 pb-10 transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* --- Brand Section --- */}
          <div className="flex flex-col gap-6">
            <a className="flex items-center gap-2 group cursor-pointer">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl italic">R</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-neutral">
                FOODIE<span className="text-primary">SQUARE</span>
              </span>
            </a>
            <p className="text-neutral/70 text-sm leading-relaxed">
              Crafting unforgettable culinary experiences with passion and fresh, locally sourced ingredients. Join us for a journey of flavors.
            </p>
            <div className="flex gap-4">
              {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full border border-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* --- Quick Links --- */}
          <div>
            <h4 className="text-lg font-bold text-neutral mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-[-8px] left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-neutral/70 text-sm font-medium">
              <li><a href="#" className="hover:text-primary transition-colors">Our Menu</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Table Reservation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Special Offers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Private Events</a></li>
            </ul>
          </div>

          {/* --- Opening Hours --- */}
          <div>
            <h4 className="text-lg font-bold text-neutral mb-6 relative inline-block">
              Opening Hours
              <span className="absolute bottom-[-8px] left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-neutral/70 text-sm">
              <li className="flex justify-between">
                <span>Mon - Thu:</span>
                <span className="text-neutral font-bold">11 AM - 10 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat:</span>
                <span className="text-primary font-bold">11 AM - 11 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span className="text-neutral font-bold">Closed</span>
              </li>
            </ul>
          </div>

          {/* --- Contact Info --- */}
          <div>
            <h4 className="text-lg font-bold text-neutral mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-[-8px] left-0 w-8 h-1 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-neutral/70 text-sm">
              <li className="flex gap-3 items-start">
                <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
                <span>123 Gourmet Avenue, Food City, FC 4567</span>
              </li>
              <li className="flex gap-3 items-center">
                <FaPhoneAlt className="text-primary shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex gap-3 items-center">
                <FaEnvelope className="text-primary shrink-0" />
                <span>hello@foodiesquare.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* --- Bottom Bar --- */}
        <div className="pt-8 border-t border-base-300 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral/50 font-medium uppercase tracking-widest">
          <p>© 2026 Foodie Square. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;