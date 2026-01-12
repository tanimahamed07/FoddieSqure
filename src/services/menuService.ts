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

