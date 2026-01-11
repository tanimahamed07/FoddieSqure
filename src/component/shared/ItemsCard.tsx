import { TMenu } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  item: TMenu;
};

const ItemsCard = ({ item }: Props) => {
  return (
    <div
      key={item.slug}
      className={`group relative bg-base-200 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-base-300 ${
        !item.isAvailable ? "opacity-75" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <Image
          width={400}
          height={500}
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            !item.isAvailable ? "grayscale" : ""
          }`}
        />

        {/* Price Tag */}
        <div className="absolute top-4 right-4 bg-primary text-white px-4 py-1 rounded-full font-bold backdrop-blur-md shadow-lg">
          ${item.price}
        </div>

        {/* Availability Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-error text-white px-4 py-2 rounded-lg font-bold uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}

        {/* Badge (isSpecial হলে দেখাবে) */}
        {item.isSpecial && (
          <div className="absolute top-4 left-4 bg-secondary text-neutral-content px-3 py-1 rounded-md text-xs font-bold uppercase tracking-tighter rotate-[-5deg] shadow-md">
            Chef's Special
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Category & Rating */}
        <div className="flex justify-between items-center mb-2">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            {item.category}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5 text-secondary">
              <span className="text-sm font-bold">{item.rating}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span className="text-xs text-neutral/40">
              ({item.reviewCount})
            </span>
          </div>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-bold text-neutral group-hover:text-primary transition-colors mb-2">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-neutral/70 text-sm leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Tags (Possible Field) */}
        <div className="flex flex-wrap gap-2 mb-6">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="text-[10px] font-semibold border border-base-300 px-2 py-0.5 rounded-md text-neutral/60"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between border-t border-base-300 pt-5">
          <div className="flex items-center gap-2 text-xs text-neutral/50 font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {item.preparationTime}
          </div>
          <Link
            href={`/menu/${item.slug}`}
            className="btn btn-ghost btn-sm text-primary hover:bg-primary hover:text-white rounded-full transition-all"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
