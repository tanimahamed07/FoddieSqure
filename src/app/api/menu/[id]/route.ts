import { mongoConnect } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    const { db } = await mongoConnect();
    const details = await db
      .collection("menu")
      .findOne({ _id: new ObjectId(id) });
    // client.close();

    if (!details)
      return NextResponse.json({ error: "Event not found" }, { status: 404 });

    const formattedDetails = {
      id: details._id.toString(),
      name: details.name,
      slug: details.slug,
      description: details.description,
      price: details.price,
      category: details.category,
      tags: details.tags,
      image: details.image,
      rating: details.rating,
      reviewCount: details.reviewCount,
      isAvailable: details.isAvailable,
      isSpecial: details.isSpecial,
      preparationTime: details.preparationTime,
    };

    return NextResponse.json(formattedDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch event" },
      { status: 500 }
    );
  }
}
