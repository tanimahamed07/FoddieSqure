import { mongoConnect } from "@/lib/mongoConnect";
import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// GET all menu items
import { getMenus } from "@/services/menuService";

export async function GET() {
  try {
    const items = await getMenus();
    return NextResponse.json(items);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST new menu item
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { db } = await mongoConnect();
    const data = await req.json();

    if (!data.name || !data.price || !data.category || !data.image) {
      return NextResponse.json(
        { error: "Name, Price, Category and Image are required" },
        { status: 400 }
      );
    }

    const result = await db.collection("menu").insertOne({
      ...data,
      createdAt: new Date(),
    });


    revalidatePath("/menu");
    revalidatePath('/specialties')

    return NextResponse.json(
      { message: "Dish added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}