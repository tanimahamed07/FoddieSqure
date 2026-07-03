import { mongoConnect } from "@/lib/mongoConnect";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getMenus } from "@/services/menuService";

// Get all menu items
export async function GET() {
  try {
    const items = await getMenus();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 },
    );
  }
}

// Create new menu item
export async function POST(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const data = await req.json();

    if (!data.name || !data.price || !data.category || !data.image) {
      return NextResponse.json(
        { error: "Name, Price, Category and Image are required" },
        { status: 400 },
      );
    }

    const result = await db.collection("menu").insertOne({
      ...data,
      createdAt: new Date(),
    });

    revalidatePath("/menu");
    revalidatePath("/specialties");

    return NextResponse.json(
      { message: "Dish added successfully", id: result.insertedId },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add menu item" },
      { status: 500 },
    );
  }
}
