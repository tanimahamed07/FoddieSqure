// src/services/menuService.ts
import { TMenu } from "@/types/menu";

export const getSpecialMenus = async (): Promise<TMenu[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, {
      next: { revalidate: 3600 }, // ১ ঘণ্টা পর পর ডাটা আপডেট হবে
    });

    if (!res.ok) throw new Error("Failed to fetch menus");

    const data: TMenu[] = await res.json();
    return data.filter((item) => item.isSpecial);
  } catch (error) {
    console.error("Error fetching special menus:", error);
    return [];
  }
};