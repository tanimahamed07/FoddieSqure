import { mongoConnect } from "@/lib/mongoConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

// ১. ফেভারিট টগল করা (Add/Remove)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { menuItemId, name, image, price } = await req.json();
    const { db } = await mongoConnect();
    
    // ইমেইল এবং আইটেম আইডি দিয়ে কুয়েরি
    const query = { email: session.user.email, menuItemId: menuItemId.toString() };
    const existing = await db.collection("favorites").findOne(query);

    if (existing) {
      await db.collection("favorites").deleteOne(query);
      return NextResponse.json({ message: "Removed from favorites", isFavorite: false });
    } else {
      await db.collection("favorites").insertOne({
        email: session.user.email,
        menuItemId: menuItemId.toString(),
        name,
        image,
        price,
        createdAt: new Date(),
      });
      return NextResponse.json({ message: "Added to favorites", isFavorite: true });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ২. ইউজারের নির্দিষ্ট ফেভারিট লিস্ট গেট করা
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { db } = await mongoConnect();
    // শুধুমাত্র বর্তমান ইউজারের ফেভারিটগুলোই আসবে
    const favorites = await db.collection("favorites")
      .find({ email: session.user.email })
      .sort({ createdAt: -1 }) // নতুনগুলো আগে দেখাবে
      .toArray();

    return NextResponse.json(favorites);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}