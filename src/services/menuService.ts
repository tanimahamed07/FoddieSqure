import { TMenu } from "@/types/menu";



export async function getMenus(): Promise<TMenu[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`, {
    cache: "no-store", // always fetch fresh data
  });

  if (!res.ok) {
    throw new Error("Failed to fetch menus");
  }

  return res.json();
}


import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";

// ১. আইডি দিয়ে নির্দিষ্ট মেনু ডিটেইলস ফেচ করা
export const getMenuDetails = async (id: string) => {
  try {
    const { db } = await mongoConnect();
    const details = await db.collection("menu").findOne({ _id: new ObjectId(id) });

    if (!details) return null;

    // ডাটাকে ফরম্যাট করা (ObjectId কে স্ট্রিং এ রূপান্তর)
    return {
      ...details,
      _id: details._id.toString(),
    } as unknown as TMenu;
  } catch (error) {
    console.error("Error fetching menu details:", error);
    return null;
  }
};

// ২. সব স্পেশাল মেনু ফেচ করা
export const getSpecialMenus = async (): Promise<TMenu[]> => {
  try {
    const { db } = await mongoConnect();
    const specialties = await db
      .collection("menu")
      .find({ isSpecial: true })
      .toArray();

    return specialties.map((item) => ({
      ...item,
      _id: item._id.toString(),
    })) as unknown as TMenu[];
  } catch (error) {
    console.error("Error fetching specialties:", error);
    return [];
  }
};

