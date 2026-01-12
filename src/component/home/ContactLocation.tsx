"use client";
import React from "react";
import Container from "../shared/Container";
import { HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const ContactLocation = () => {
  return (
    <section className="relative py-16 bg-base-100 overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 left-0 w-full h-1/3 bg-base-200 -z-10" />

      <Container>
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          
          {/* Contact Information Card */}
          <div className="lg:col-span-5 bg-base-100 p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-base-200 relative z-10 flex flex-col justify-between">
            <div>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-3 block">Visit Us</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-neutral mb-6 leading-tight">
                Let's Start a <br /> <span className="text-primary italic font-serif">Conversation</span>
              </h2>

              <div className="space-y-6">
                {/* Location */}
                <div className="flex gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shrink-0">
                    <HiOutlineLocationMarker size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral text-base">Our Location</h4>
                    <p className="text-neutral/60 text-sm leading-relaxed">123 Culinary Ave, Foodie District, Dhaka</p>
                  </div>
                </div>

                {/* Contact */}
                <div className="flex gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300 shrink-0">
                    <HiOutlinePhone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral text-base">Phone & Email</h4>
                    <p className="text-neutral/60 text-sm">+880 1234 567 890</p>
                    <p className="text-neutral/60 text-sm italic">hello@foodiesquare.com</p>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex gap-4 group">
                  <div className="w-11 h-11 rounded-xl bg-neutral/10 flex items-center justify-center text-neutral group-hover:bg-neutral group-hover:text-white transition-all duration-300 shrink-0">
                    <HiOutlineClock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral text-base">Opening Hours</h4>
                    <p className="text-neutral/60 text-sm">Mon-Fri: 10AM - 11PM</p>
                    <p className="text-neutral/60 text-sm">Weekend: 09AM - 12AM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 flex gap-3">
              {[FaFacebookF, FaInstagram, FaTwitter].map((Icon, index) => (
                <a key={index} href="#" className="w-9 h-9 rounded-full border border-base-300 flex items-center justify-center text-neutral hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 shadow-sm">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Map Integration */}
          <div className="lg:col-span-7 rounded-[2.5rem] overflow-hidden shadow-lg border-4 border-base-100 min-h-[400px] relative group">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301!2d90.3910801!3d23.7508666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8bd55555555%3A0x196e818059039361!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 contrast-110"
            ></iframe>
            
            {/* Direct Direction Button */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-auto md:right-6">
                <button className="btn btn-primary btn-sm rounded-full px-6 shadow-xl uppercase tracking-widest text-[10px] hover:scale-105 transition-transform">
                    Get Directions
                </button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
};

export default ContactLocation;