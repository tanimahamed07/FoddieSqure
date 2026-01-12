"use client";

import { useState, useMemo } from "react";
import Container from "@/component/shared/Container";
import ItemsCard from "@/component/shared/ItemsCard";
import { TMenu } from "@/types/menu";

interface MenuFilterProps {
  menus: TMenu[];
  categories: string[];
}

const MenuFilter = ({ menus, categories }: MenuFilterProps) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMenus = useMemo(() => {
    if (activeCategory === "All") return menus;
    return menus.filter((item) => item.category === activeCategory);
  }, [activeCategory, menus]);

  return (
    <>
      {/* Sticky Filter Bar */}
      <div className="sticky top-[64px] lg:top-[72px] z-30 -mt-6">
        <Container>
          <div className="bg-base-100/80 backdrop-blur-xl border border-base-content/5 p-1.5 rounded-2xl lg:rounded-full shadow-xl flex flex-wrap justify-center gap-1 max-w-fit mx-auto transition-all hover:shadow-2xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-xl lg:rounded-full font-bold text-xs lg:text-sm transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-content shadow-md"
                    : "text-base-content/60 hover:bg-base-content/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </div>

      {/* Content */}
      <Container>
        <div className="mt-12 mb-8 flex items-center justify-between border-b border-base-content/5 pb-4">
          <h2 className="text-xl font-black text-base-content uppercase tracking-tight">
            {activeCategory} <span className="text-primary">Selection</span>
          </h2>
          <span className="text-[10px] font-bold px-2 py-1 bg-base-200 rounded text-base-content/40 uppercase tracking-widest">
            {filteredMenus.length} Results
          </span>
        </div>

        {filteredMenus.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {filteredMenus.map((item) => (
              <ItemsCard key={item.id || item.slug} item={item} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="text-5xl mb-4 grayscale opacity-20">🍲</div>
            <h3 className="text-xl font-bold text-base-content/20 uppercase">
              No items found
            </h3>
          </div>
        )}
      </Container>
    </>
  );
};

export default MenuFilter;
