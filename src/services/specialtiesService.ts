import { mongoConnect } from "@/lib/mongoConnect";
import { TMenu } from "@/types/menu";

export async function getSpecialMenus(): Promise<TMenu[]> {
  try {
    const { db } = await mongoConnect();
    const items = await db.collection("menu").find({ isSpecial: true }).toArray();

    const formattedItems = items.map((item) => ({
      _id: item._id.toString(), // TMenu likely uses _id or id, let's check TMenu definition or infer from usage. But wait, in route.ts it was mapping to 'id'. Let's check usage in page.tsx 'key={item.id}'. But wait, ItemsCard might expect _id or id.
      // Let's check route.ts again.
      // route.ts: id: item._id.toString()
      // let's stick to what route.ts was doing.
      id: item._id.toString(),
      name: item.name,
      slug: item.slug,
      description: item.description,
      price: item.price,
      category: item.category,
      tags: item.tags,
      image: item.image,
      rating: item.rating,
      reviewCount: item.reviewCount,
      isAvailable: item.isAvailable,
      isSpecial: item.isSpecial,
      preparationTime: item.preparationTime,
    })) as unknown as TMenu[]; // Casting because TMenu might differ slightly, but this matches what was being sent over wire.

    return formattedItems;
  } catch (error) {
    console.error("Failed to fetch special menus:", error);
    return [];
  }
}



