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
      className={`group relative bg-base-200 rounded-[2rem] overflow-hidden border border-base-300 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
        !item.isAvailable ? "opacity-75" : ""
      }`}
    >
      {/* Image Container - Reduced Height for Compact look */}
      <div className="relative h-56 overflow-hidden">
        <Image
          width={400}
          height={400}
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
            !item.isAvailable ? "grayscale" : ""
          }`}
        />

        {/* Price Tag - Smaller Padding */}
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-md shadow-lg">
          ${item.price}
        </div>

        {/* Badge */}
        {item.isSpecial && (
          <div className="absolute top-3 left-3 bg-secondary text-neutral-content px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter -rotate-6 shadow-md">
            Special
          </div>
        )}

        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-error/90 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Content - Compact Padding */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-primary font-bold text-[10px] uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full">
            {item.category}
          </span>
          <div className="flex items-center gap-1 text-secondary">
            <span className="text-xs font-bold">{item.rating}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <h3 className="text-lg font-bold text-neutral group-hover:text-primary transition-colors mb-1 truncate">
          {item.name}
        </h3>

        <p className="text-neutral/60 text-xs leading-relaxed mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Info Footer - Thinner border */}
        <div className="flex items-center justify-between border-t border-base-300/50 pt-4">
          <div className="flex items-center gap-1.5 text-[11px] text-neutral/50 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {item.preparationTime}
          </div>
          <Link
            href={`/menu/${item.slug}`}
            className="text-xs font-bold text-primary hover:underline transition-all"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ItemsCard;
