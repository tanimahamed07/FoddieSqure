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

    if (!details)
      return NextResponse.json({ error: "Dish not found" }, { status: 404 });

    // ফিক্স: এখানে nutrition এবং ingredients অবশ্যই যোগ করতে হবে
    const formattedDetails = {
      id: details._id.toString(),
      name: details.name,
      slug: details.slug,
      description: details.description,
      price: details.price,
      category: details.category,
      tags: details.tags || [],
      image: details.image,
      rating: details.rating,
      reviewCount: details.reviewCount,
      isAvailable: details.isAvailable,
      isSpecial: details.isSpecial,
      preparationTime: details.preparationTime,
      // --- এই ফিল্ডগুলো আপনি আগে যোগ করেননি, তাই ডাটা আসছিল না ---
      ingredients: details.ingredients || [],
      nutrition: details.nutrition || {
        calories: 0,
        protein: "",
        fat: "",
        carbs: "",
      },
    };

    return NextResponse.json(formattedDetails);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch dish" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const { db } = await mongoConnect();

    const result = await db
      .collection("menu")
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;
    const data = await req.json();
    const { db } = await mongoConnect();

    // ডাটাবেস আপডেট করার আগে id সরিয়ে ফেলা (mongoDB তে id সরাসরি আপডেট করা যায় না)
    const { id: _, ...updateData } = data;

    const result = await db
      .collection("menu")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
