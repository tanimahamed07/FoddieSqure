import { mongoConnect } from "@/lib/mongoConnect";
import { TMenu } from "@/types/menu";
// import { TEvent } from "@/types/event";
import { NextRequest, NextResponse } from "next/server";

// GET all events
export async function GET() {
  try {
    const { db } = await mongoConnect();
    const items = await db.collection("menu").find().toArray();

    const formattedItems = items.map((item) => ({
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
    }));

    return NextResponse.json(formattedItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST new event
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

    return NextResponse.json(
      { message: "Dish added successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create menu item" }, { status: 500 });
  }
}
