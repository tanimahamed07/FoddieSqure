import { NextResponse } from "next/server";
import { getSpecialMenus } from "@/services/specialtiesService";

export async function GET() {
  try {
    const items = await getSpecialMenus();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}